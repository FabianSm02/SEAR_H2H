using Plantilla.core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Plantilla.core.Manager
{
    public class H2HManager : Manager
    {
        public static List<PROC_OBT_TRANSFERENCIASResult> ObtenerPagos(
        string fechaInicio, string fechaFin, string cuenta, string transferencia, string proveedor, string cia
    )
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_TRANSFERENCIASResult> result = new List<PROC_OBT_TRANSFERENCIASResult>();
                try
                {
                    result = context.PROC_OBT_TRANSFERENCIAS(
                          fechaInicio, fechaFin, cuenta, transferencia, proveedor, cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_TRANSFERENCIAS", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_TRANSFERENCIAS_LINEASResult> ObtenerPagosLineas(
      string transferencia, string cia
  )
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_TRANSFERENCIAS_LINEASResult> result = new List<PROC_OBT_TRANSFERENCIAS_LINEASResult>();
                try
                {
                    result = context.PROC_OBT_TRANSFERENCIAS_LINEAS(
                          transferencia, cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_TRANSFERENCIAS_LINEAS", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_TRANSFERENCIAS_FILTROResult> ObtenerTransferenciasFiltro(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_TRANSFERENCIAS_FILTROResult> result = new List<PROC_OBT_TRANSFERENCIAS_FILTROResult>();
                try
                {
                    result = context.PROC_OBT_TRANSFERENCIAS_FILTRO(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_TRANSFERENCIAS_FILTRO", e);
                    return null;
                }
            }
        }

        public static List<PROC_OBT_CUENTAS_BANCARIAS_TODAS_FILTROResult> ObtenerCuentasTodasFiltro(string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                List<PROC_OBT_CUENTAS_BANCARIAS_TODAS_FILTROResult> result = new List<PROC_OBT_CUENTAS_BANCARIAS_TODAS_FILTROResult>();
                try
                {
                    result = context.PROC_OBT_CUENTAS_BANCARIAS_TODAS_FILTRO(
                         cia
                    ).ToList();
                    return result;
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_CUENTAS_BANCARIAS_TODAS_FILTRO", e);
                    return null;
                }
            }
        }

        public static string EnviarCorreoPago(string proveedor, string transferencia, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_ENVIAR_CORREO_PAGO_H2H(proveedor, transferencia, cia).ToString();

                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_ENVIAR_CORREO_PAGO_H2H", e);
                    result = null;
                }
                return result;
            }
        }

        public static string EnviarCorreoPagoMasivo(string transferencia, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext(Connection))
            {
                string result;
                try
                {
                    result = context.PROC_ENVIAR_CORREO_PAGO_H2H_MASIVO(transferencia, cia).ToString();

                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_ENVIAR_CORREO_PAGO_H2H_MASIVO", e);
                    result = null;
                }
                return result;
            }
        }

        public static List<PROC_OBT_PROVEEDORES_PARA_REPORTEResult> ObtenerProveedoresReporte(string numero, string cia)
        {
            using (PlantillaDataContext context = new PlantillaDataContext())
            {
                List<PROC_OBT_PROVEEDORES_PARA_REPORTEResult> result = new List<PROC_OBT_PROVEEDORES_PARA_REPORTEResult>();
                try
                {
                    result = context.PROC_OBT_PROVEEDORES_PARA_REPORTE(numero, cia).ToList();
                }
                catch (Exception ex)
                {
                    string e = ex.Message;
                    e = e.Replace(Environment.NewLine, " ");
                    e = e.Replace('"', ' ');
                    e = e.Replace("'", " ");
                    WriteLog("PROC_OBT_PROVEEDORES_PARA_REPORTE", e);
                }
                return result;
            }
        }
    }
}
