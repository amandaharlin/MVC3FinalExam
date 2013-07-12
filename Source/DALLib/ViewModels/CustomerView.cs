using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DALLib.ViewModels
{
    public class CustomerView
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
}
