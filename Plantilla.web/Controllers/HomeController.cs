using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Plantilla.web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Session["H2H"].ToString() != "3")
            {
                return Redirect("~/H2H");
            }
            else if (Session["TRANSFERENCIAS"].ToString() != "3")
            {
                return Redirect("~/TRANSFERENCIAS");
            }
            else if (Session["USUARIOS"].ToString() != "3")
            {
                return Redirect("~/Usuario");
            }
            else
            {
                Session["Usuario"] = null;
                return Redirect("~/Login");
            }
        }
    }
}
