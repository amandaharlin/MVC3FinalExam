using System.Web.Mvc;
using DALLib.ViewModels;
using Mvc3App.GridModels;
using System.Linq;
using DALLib;

namespace Mvc3App.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            CountryModel model = new CountryModel();

            return View(model);
        }

        public ActionResult ShowInTable()
        {
            return View(DatabaseDAL.GetAllCustomerViews());
        }


       [HttpPost]
       public ActionResult GetCustomers(JqGridSettings gridSettings)
       {
           int totalPages;
           int totalRecords;

           var allCustomers = DALLib.DatabaseDAL.GetAllCustomerViews();

           if(gridSettings.Where.groupOp != ""){
               allCustomers = allCustomers.Where(x => x.Country == gridSettings.Where.groupOp);
           }

           var results =
               jqGridDataManager.GetGridData<CustomerView>(gridSettings,
                                                           allCustomers,
                                                           out totalPages,
                                                           out totalRecords);
           JqGridResult result = new JqGridResult()
           {
               Page = gridSettings.PageIndex,
               Records = totalRecords,
               Total = totalPages,
               Rows = results.ToList()
           };

           return Json(result, JsonRequestBehavior.AllowGet);
       }
    }
}

