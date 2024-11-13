using Plantilla.core.Manager;
using Plantilla.web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Plantilla.web.Controllers
{
    public class TransferenciasController : Controller
    {
        // GET: Transferencias
        public ActionResult Index()
        {
            string cia = Session["CIA"].ToString();

            //Si el usuario no tiene permiso para ver el index no puede accerde por link
            if (Session["TRANSFERENCIAS"].ToString() == "3")
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.ListaClientes = TransferenciasManager.ObtenerClientesFiltro(cia);
            ViewBag.ListaProveedores = TransferenciasManager.ObtenerProveedoresFiltro(cia);
            ViewBag.ListaCuentas = TransferenciasManager.ObtenerCuentasFiltro(cia);
            ViewBag.ListaDocumentos = TransferenciasManager.ObtenerDocumentosFiltro(cia);
            ViewBag.ListaProveedores = TransferenciasManager.ObtenerProveedoresFiltro(cia);
            ViewBag.ListaSubtiposCC = TransferenciasManager.ObtenerSubtiposCC_Filtro(cia);
            ViewBag.ListaSubtiposCP = TransferenciasManager.ObtenerSubtiposCP_Filtro(cia);
            ViewBag.ListaSubtiposTODOS = TransferenciasManager.ObtenerSubtiposTODOS_Filtro(cia);
            ViewBag.ListaSubtiposControlBancario = TransferenciasManager.ObtenerSubtiposControlBancario_Filtro(cia);
            ViewBag.ListaConciliaciones = TransferenciasManager.ObtenerConciliacionesFiltro(null, cia);

            return View();
        }

        [HttpGet]
        public JsonResult ObtenerTransferencias(
          string fechaInicio, string fechaFin, string cuenta, string tipo, string subtipo, string documento,
          string proveedor, string cliente, string debitoXcredito, string cxc_cxp, string cargadoBancos
     )
        {
            cuenta = string.IsNullOrEmpty(cuenta) || cuenta == "0" ? null : cuenta;
            tipo = string.IsNullOrEmpty(tipo) || tipo == "0" ? null : tipo;
            subtipo = string.IsNullOrEmpty(subtipo) || subtipo == "00" ? null : subtipo;
            documento = string.IsNullOrEmpty(documento) || documento == "0" ? null : documento;
            proveedor = string.IsNullOrEmpty(proveedor) || proveedor == "0" ? null : proveedor;
            cliente = string.IsNullOrEmpty(cliente) || cliente == "0" ? null : cliente;
            debitoXcredito = string.IsNullOrEmpty(debitoXcredito) || debitoXcredito == "0" ? null : debitoXcredito;
            cxc_cxp = string.IsNullOrEmpty(cxc_cxp) || cxc_cxp == "0" ? null : cxc_cxp;
            cargadoBancos = string.IsNullOrEmpty(cargadoBancos) || cargadoBancos == "0" ? null : cargadoBancos;

            string cia = Session["CIA"].ToString();

            var result = TransferenciasManager.ObtenerTransferencias(
                 fechaInicio, fechaFin, cuenta, tipo, subtipo, documento,
                          proveedor, cliente, debitoXcredito, cxc_cxp, cargadoBancos, cia
            );
            JsonResult json = new JsonResult();
            json.Data = result;
            json.MaxJsonLength = int.MaxValue;
            json.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            return json;
        }

        public JsonResult ObtenerConciliacion(string cuenta, string fecha)
        {

            string cia = Session["CIA"].ToString();

            var result = TransferenciasManager.ObtenerConciliaciones(cuenta, fecha, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult InsertarDocumentoCC(string cuenta, string documento, string tipo, int subtipo, string fecha, string concepto, 
            string monto, string moneda, string idLinea, string cliente)
        {
            string cia = Session["CIA"].ToString();

            string usuario = Session["Usuario"].ToString();

            var result = TransferenciasManager.InsertarDocumentoCC(cuenta, usuario, documento, tipo, subtipo, fecha, concepto,
            monto, moneda, idLinea, cliente, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult InsertarDocumentoCP(string cuenta, string documento, string tipo, int subtipo, string fecha, string concepto,
           string monto, string moneda, string idLinea, string proveedor)
        {
            string cia = Session["CIA"].ToString();

            string usuario = Session["Usuario"].ToString();

            var result = TransferenciasManager.InsertarDocumentoCP(cuenta, usuario, documento, tipo, subtipo, fecha, concepto,
            monto, moneda, idLinea, proveedor, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult InsertarMovBancos(string cuenta, string documento, string monto, string moneda, string tipo, int subtipo, string fecha, string concepto, string idLinea)
        {
            string cia = Session["CIA"].ToString();

            string usuario = Session["Usuario"].ToString();

            var result = TransferenciasManager.InsertarMovBancos(cuenta, usuario, documento, monto, moneda, tipo, subtipo, fecha, concepto, idLinea, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;
        }

        public JsonResult InsertarDocumentoCB(string cuenta, string conciliacion, string documento, string fecha, string concepto, string monto, string tipo, string idLinea)
        {
            // Extraer el primer valor de la cadena conciliacion
            if (!string.IsNullOrEmpty(conciliacion) && conciliacion.Contains("//"))
            {
                conciliacion = conciliacion.Split(new[] { "//" }, StringSplitOptions.None)[0];
            }
            else
            {
                conciliacion = string.IsNullOrEmpty(conciliacion) || conciliacion == "N" ? null : conciliacion;
            }

            string cia = Session["CIA"].ToString();
            string usuario = Session["Usuario"].ToString();

            var result = TransferenciasManager.InsertarDocumentoCB(cuenta, conciliacion, usuario, documento, fecha, concepto,
                monto, tipo, idLinea, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }


        public JsonResult ObtenerSubtiposCC_XTipoFiltro(string tipo)
        {
            tipo = string.IsNullOrEmpty(tipo) || tipo == "" ? null : tipo;

            string cia = Session["CIA"].ToString();

            var result = TransferenciasManager.ObtenerSubtiposCC_XTipoFiltro(tipo, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerConciliacionXBanco(string cuenta)
        {
            cuenta = string.IsNullOrEmpty(cuenta) || cuenta == "" ? null : cuenta;

            string cia = Session["CIA"].ToString();

            var result = TransferenciasManager.ObtenerConciliacionesFiltro(cuenta, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerSubtiposCP_XTipoFiltro(string tipo)
        {
            tipo = string.IsNullOrEmpty(tipo) || tipo == "" ? null : tipo;

            string cia = Session["CIA"].ToString();

            var result = TransferenciasManager.ObtenerSubtiposCP_XTipoFiltro(tipo, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        public JsonResult ObtenerSubtiposControlBancario_XTipoFiltro(string tipo)
        {
            tipo = string.IsNullOrEmpty(tipo) || tipo == "" ? null : tipo;

            string cia = Session["CIA"].ToString();

            var result = TransferenciasManager.ObtenerSubtiposControlBancario_X_TIPO_Filtro(tipo, cia);

            var JsonResult = Json(result, JsonRequestBehavior.AllowGet); JsonResult.MaxJsonLength = int.MaxValue; return JsonResult;

        }

        [HttpPost]
        public JsonResult ConciliarBatch(
      List<ModelParaBatch> documentosParaBatch,
      string conciliacion
  )
        {
            if (documentosParaBatch.Count == 0)
            {
                return Json(2);
            }


            // Dividir conciliacion y tomar la primera parte
            string conciliacionParte = string.IsNullOrEmpty(conciliacion) || conciliacion == "N"
                ? null
                : conciliacion.Split(new[] { "//" }, StringSplitOptions.None)[0];

            string cia = Session["CIA"].ToString();
            string usuario = Session["Usuario"].ToString();
            string result;

            foreach (var item in documentosParaBatch)
            {
                var datosList = TransferenciasManager.ObtenerTransferenciasParaAcciones(item.linea, cia);

                foreach (var datos in datosList)
                {
                    // Validar y ajustar el tipo de documento basado en DEBITO y CREDITO
                    string tipoDocumento;
                    if (datos.DEBITO > 0 && datos.CREDITO == 0)
                    {
                        tipoDocumento = "T/D";
                    }
                    else if (datos.DEBITO == 0 && datos.CREDITO > 0)
                    {
                        tipoDocumento = "T/C";
                    }
                    else
                    {
                        tipoDocumento = datos.TIPO; // Mantener el valor original si no se cumple ninguna de las condiciones anteriores
                    }

                    // Seleccionar el valor adecuado para DOCUMENTO
                    string documento = datos.DOCUMENTO ?? datos.REFERENCIA;

                    result = TransferenciasManager.InsertarDocumentoCB(
                        datos.CUENTA_BANCO,
                        conciliacionParte,
                        usuario,
                        documento,
                        datos.FECHA_TEF_STR,
                        datos.PS_86_REFERENCIA,
                        datos.MONTO,
                        tipoDocumento,
                        datos.ID_LINEA,
                        cia
                    );
                }
            }
            return Json(1);
        }


        [HttpPost]
        public JsonResult ProveedorBatch(
          List<ModelParaBatch> documentosParaBatch, string tipo, int subtipo, string proveedor
          )
        {
            if (documentosParaBatch.Count == 0)
            {
                return Json(2);
            }
            string cia = Session["CIA"].ToString();
            string usuario = Session["Usuario"].ToString();
            string result;
            foreach (var item in documentosParaBatch)
            {
                var datosList = TransferenciasManager.ObtenerTransferenciasParaAcciones(item.linea, cia);

                foreach (var datos in datosList)
                {
                    // Seleccionar el valor adecuado para DOCUMENTO
                    string documento = datos.DOCUMENTO ?? datos.REFERENCIA;

                    result = TransferenciasManager.InsertarDocumentoCP(
                        datos.CUENTA_BANCO,
                        usuario,
                        documento,
                        tipo,
                        subtipo,
                        datos.FECHA_TEF_STR,
                        datos.PS_86_REFERENCIA,
                        datos.MONTO,
                        datos.MONEDA,
                        datos.ID_LINEA,
                        proveedor,
                        cia
                    );
                }
            }
            return Json(1);
        }


        [HttpPost]
        public JsonResult ClienteBatch(
          List<ModelParaBatch> documentosParaBatch, string tipo, int subtipo, string cliente
          )
        {
            if (documentosParaBatch.Count == 0)
            {
                return Json(2);
            }
            string cia = Session["CIA"].ToString();
            string usuario = Session["Usuario"].ToString();
            string result;
            foreach (var item in documentosParaBatch)
            {
                var datosList = TransferenciasManager.ObtenerTransferenciasParaAcciones(item.linea, cia);

                foreach (var datos in datosList)
                {
                    // Seleccionar el valor adecuado para DOCUMENTO
                    string documento = datos.DOCUMENTO ?? datos.REFERENCIA;

                    result = TransferenciasManager.InsertarDocumentoCC(
                        datos.CUENTA_BANCO,
                        usuario,
                        documento,
                        tipo,
                        subtipo,
                        datos.FECHA_TEF_STR,
                        datos.PS_86_REFERENCIA,
                        datos.MONTO,
                        datos.MONEDA,
                        datos.ID_LINEA,
                        cliente,
                        cia
                    );
                }
            }
            return Json(1);
        }

        [HttpPost]
        public JsonResult BancoBatch(
         List<ModelParaBatch> documentosParaBatch, string tipo, int subtipo
         )
        {
            if (documentosParaBatch.Count == 0)
            {
                return Json(2);
            }
            string cia = Session["CIA"].ToString();
            string usuario = Session["Usuario"].ToString();
            string result;
            foreach (var item in documentosParaBatch)
            {
                var datosList = TransferenciasManager.ObtenerTransferenciasParaAcciones(item.linea, cia);

                foreach (var datos in datosList)
                {
                    // Seleccionar el valor adecuado para DOCUMENTO
                    string documento = datos.DOCUMENTO ?? datos.REFERENCIA;

                    result = TransferenciasManager.InsertarMovBancos(
                        datos.CUENTA_BANCO,
                        usuario,
                        documento,
                        datos.MONTO,
                        datos.MONEDA,
                        tipo,
                        subtipo,
                        datos.FECHA_TEF_STR,
                        datos.PS_86_REFERENCIA,
                        datos.ID_LINEA,
                        cia
                    );
                }
            }
            return Json(1);
        }
    }
}