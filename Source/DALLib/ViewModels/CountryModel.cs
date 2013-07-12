using System.Collections.Generic;
using System.Web.Mvc;
using MvcContrib.EnumerableExtensions;
using System.ComponentModel;

namespace DALLib.ViewModels
{
    public class CountryModel
    {
        [DisplayName("Select a Country")]

        public string Country { get; set; }
        public IEnumerable<SelectListItem> CountryModelList { get; set; }

        public CountryModel()
        {
            var countryModels = DatabaseDAL.GetDistinctCountries();

            CountryModelList = countryModels.ToSelectList(c => c.Country, c => c.Country);
        }
    }
}