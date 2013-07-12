using System;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web.Mvc;
using System.Collections.Generic;

namespace Mvc3App.GridModels
{
    [ModelBinder(typeof(JqGridSettingsBinder))]
    public class JqGridSettings
    {
        public bool IsSearch { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public string SortColumn { get; set; }
        public string SortOrder { get; set; }
        public Filter Where { get; set; }

    }

    [DataContract]
    public class Filter
    {
        [DataMember]
        public string groupOp { get; set; }
        [DataMember]
        public Rule[] rules { get; set; }

        public static Filter Create(string jsonData)
        {
            try
            {
                var serializer = new DataContractJsonSerializer(typeof(Filter));
                StringReader reader = new StringReader(jsonData);
                MemoryStream ms = new MemoryStream(Encoding.Default.GetBytes(jsonData));
                return serializer.ReadObject(ms) as Filter;
            }
            catch
            {
                return null;
            }
        }

        #region [ Added to handle JqGrid-style where clause ]
        public string ToDynamicStatement(out object[] parameters)
        {
            List<object> parms = new List<object>();

            StringBuilder linq = new StringBuilder();
            for (int i = 0; i < rules.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(rules[i].data))
                    continue;

                if (i != 0)
                    linq.Append(" ").Append(groupOp).Append(" ");

                var rule = rules[i];
                object param = null;
                linq.Append(GetDynamicLinq(rule.op, rule.field, rule.data, parms.Count, out param));
                if (param != null) { parms.Add(param); }
            }

            parameters = parms.ToArray();
            return linq.ToString();
        }

        private string GetDynamicLinq(string op, string field, string parameter, int paramIndex, out object param)
        {
            param = null;
            switch (op)
            {
                case "eq": return string.Format("{0}.Equals(\"{1}\")", field, parameter);
                case "ne": return string.Format("!{0}.Equals(\"{1}\")", field, parameter);
                case "bw": return string.Format("{0}.StartsWith(\"{1}\")", field, parameter);
                case "bn": return string.Format("!{0}.StartsWith(\"{1}\")", field, parameter);
                case "ew": return string.Format("{0}.EndsWith(\"{1}\")", field, parameter);
                case "en": return string.Format("!{0}.EndsWith(\"{1}\")", field, parameter);
                case "cn": return string.Format("{0}.Contains(\"{1}\")", field, parameter);
                case "nc": return string.Format("!{0}.Contains(\"{1}\")", field, parameter);
                case "lt":
                    {
                        param = DateTime.Parse(parameter).Date;
                        return string.Format("{0} < @{1}", field, paramIndex);
                    }
                case "le":
                    {
                        param = DateTime.Parse(parameter).Date.AddDays(1);
                        return string.Format("{0} <= @{1}", field, paramIndex);
                    }
                case "gt":
                    {
                        param = DateTime.Parse(parameter).Date.AddDays(1);
                        return string.Format("{0} > @{1}", field, paramIndex);
                    }
                case "ge":
                    {
                        param = DateTime.Parse(parameter).Date;
                        return string.Format("{0} >= @{1}", field, paramIndex);
                    }
                default: return string.Empty;
            }
        }
        #endregion
    }

    [DataContract]
    public class Rule
    {
        [DataMember]
        public string field { get; set; }
        [DataMember]
        public string op { get; set; }
        [DataMember]
        public string data { get; set; }
    }

}