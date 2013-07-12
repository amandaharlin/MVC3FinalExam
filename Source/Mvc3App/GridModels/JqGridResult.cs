using System.Collections;

namespace Mvc3App.GridModels
{
    public class JqGridResult
    {
        public int Total { get; set; }
        public int Page { get; set; }
        public int Records { get; set; }
        public IEnumerable Rows { get; set; }
        public object UserData { get; set; }
    }
}