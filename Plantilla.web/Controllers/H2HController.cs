using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using Plantilla.core.Manager;
using Plantilla.web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Plantilla.web.Controllers
{
    public class H2HController : Controller
    {
        // GET: H2H
        public ActionResult Index()
        {
            string cia = Session["CIA"].ToString();

            //Si el usuario no tiene permiso para ver el index no puede accerde por link
            if (Session["H2H"].ToString() == "3")
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.ListaTransferencias = H2HManager.ObtenerTransferenciasFiltro(cia);
            ViewBag.ListaCuentas = H2HManager.ObtenerCuentasTodasFiltro(cia);
            ViewBag.ListaProveedores = TransferenciasManager.ObtenerProveedoresFiltro(cia);

            return View();
        }


        [HttpGet]
        public JsonResult ObtenerPagos(
          string fechaInicio, string fechaFin, string cuenta, string transferencia, string proveedor
     )
        {
            cuenta = string.IsNullOrEmpty(cuenta) || cuenta == "0" ? null : cuenta;
            transferencia = string.IsNullOrEmpty(transferencia) || transferencia == "0" ? null : transferencia;
            proveedor = string.IsNullOrEmpty(proveedor) || proveedor == "0" ? null : proveedor;

            string cia = Session["CIA"].ToString();

            var result = H2HManager.ObtenerPagos(
                 fechaInicio, fechaFin, cuenta, transferencia, proveedor, cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        [HttpGet]
        public JsonResult ObtenerPagosLineas(
          string transferencia
          )
        {
            string cia = Session["CIA"].ToString();
            var result = H2HManager.ObtenerPagosLineas(
               transferencia, cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        [HttpPost]
        public JsonResult EnviarCorreoXDebito(string transferencia)
        {
            string cia = Session["CIA"].ToString();

            var proveedores = H2HManager.ObtenerProveedoresReporte(transferencia, cia);

            string result = "";

            foreach (var p in proveedores)
            {
                result = GenerarReportePdfXDebito(p.PROVEEDOR_CRYSTAL, p.NUMERO);
            }

            if (result == "OK")
            {
                H2HManager.EnviarCorreoPagoMasivo(transferencia, cia);
                return Json(1);
            }
            else
            {
                return Json(0);
            }
        }

        [HttpPost]
        public JsonResult CorreoBatch(
            List<CorreoBatch> documentosParaBatch
            )
        {
            if (documentosParaBatch.Count == 0)
            {
                return Json(2);
            }
            string cia = Session["CIA"].ToString();
            string result;
            foreach (var item in documentosParaBatch)
            {
                var proveedores = H2HManager.ObtenerProveedoresReporte(item.transferencia, cia);

                foreach (var p in proveedores)
                {
                    string result2 = GenerarReportePdfXDebito(p.PROVEEDOR_CRYSTAL, p.NUMERO);
                }

                result = H2HManager.EnviarCorreoPagoMasivo(
                    item.transferencia,
                    cia
                );
            }
            return Json(1);
        }

        [HttpPost]
        public JsonResult EnviarCorreoXDebitoLineas(string proveedor, string proveedorCrystal, string transferencia)
        {
            string cia = Session["CIA"].ToString();

            // generar pdf
            string result = GenerarReportePdfXDebito(proveedorCrystal, transferencia);
            // enviar correo
            if (result == "OK")
            {
                H2HManager.EnviarCorreoPago(proveedorCrystal, transferencia, cia);
                return Json(1);
            }
            else
            {
                return Json(0);
            }
        }

        private string GenerarReportePdfXDebito(string proveedor, string transferencia)
        {
            //rutas
            //string directorio = Server.MapPath(string.Format(@"\\SRVDB-PRODUSOFT\ProdusoftPDFs"));
            //string directorio = @"C:\ProdusoftPDFS";
            //string comprobante = string.Format("{0}/{1}.pdf", directorio, proveedor);
            string reporte = Server.MapPath(string.Format("~/Reports/{0}.{1}", "AplicacionesXDebito", "rpt"));
            // credenciales sql
            string user = "SA";
            string pass = "$Grup0S3ar$";

            try
            {
                //if (!Directory.Exists(directorio))
                //{
                //    Directory.CreateDirectory(directorio);
                //}

                using (ReportClass rptH = new ReportClass())
                {
                    Response.Buffer = false;
                    Response.ClearContent();
                    Response.ClearHeaders();
                    rptH.FileName = reporte;
                    rptH.Load();
                    rptH.Refresh();
                    rptH.SetDatabaseLogon(user, pass);
                    rptH.SetParameterValue("proveedor", proveedor);
                    rptH.SetParameterValue("debito", transferencia);
                    rptH.ExportToDisk(ExportFormatType.PortableDocFormat, Server.MapPath("~/") + "PDFAdjuntos/Detalle de facturas " + proveedor + "_" + transferencia + ".pdf");//esto genera el pdf en la ruta
                    rptH.Close();
                    rptH.Dispose();
                    return "OK";
                }
            }
            catch (Exception ex)
            {
                Manager.WriteLog("GenerarReportePdf", ex.Message);
                return null;
            }
        }

        public string ImpirmirReporteXDebito(string proveedor, string transferencia)
        {
            //rutas
            string reporte = Server.MapPath(string.Format("~/Reports/{0}.{1}", "AplicacionesXDebito", "rpt"));
            // credenciales sql
            string user = "SA";
            string pass = "$Grup0S3ar$";
            try
            {
                using (ReportClass rptH = new ReportClass())
                {
                    Response.Buffer = false;
                    Response.ClearContent();
                    Response.ClearHeaders();
                    rptH.FileName = reporte;
                    rptH.Load();
                    rptH.Refresh();
                    rptH.SetDatabaseLogon(user, pass);
                    rptH.SetParameterValue("proveedor", proveedor);
                    rptH.SetParameterValue("debito", transferencia);
                    rptH.ExportToHttpResponse(ExportFormatType.PortableDocFormat, System.Web.HttpContext.Current.Response, false, "Detalle de facturas " + proveedor + "_" + transferencia);
                    rptH.Close();
                    rptH.Dispose();
                    return "OK";
                }
            }
            catch (Exception ex)
            {
                Manager.WriteLog("ImpirmirReporteXDebito", ex.Message);
                return null;
            }
        }
    }
}