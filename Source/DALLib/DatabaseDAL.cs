using System.Linq;
using DALLib.ViewModels;

namespace DALLib
{
    public class DatabaseDAL
    {
        private static NorthwindDataContext db = new NorthwindDataContext();

        public static IQueryable<CustomerView> GetAllCustomerViews()
        {
            var query = from c in db.Customers orderby c.ContactName
                        select new CustomerView
                        {
                            Name = c.ContactName,
                            Address = c.Address,
                            City = c.City,
                            Zip = c.PostalCode,
                            State = c.Region,
                            Country = c.Country
                        };

            return query;
        }

        
        public static IQueryable<CountryModel> GetDistinctCountries()
        {
            return db.Customers
                        .OrderBy(c => c.Country)
                        .Where(c => c.Country != null)
                        .Select(c => new CountryModel()
                        {
                            Country = c.Country
                        }).Distinct();
        }
    }
}

       