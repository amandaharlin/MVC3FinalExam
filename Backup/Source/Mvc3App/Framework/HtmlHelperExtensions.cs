using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

using MvcContrib.FluentHtml;

namespace Mvc3App.Framework
{
    public static class HtmlHelperExtensions
    {
        public static string JavaScript(this HtmlHelper html, string source)
        {
            TagBuilder tagBuilder = new TagBuilder("script");
            tagBuilder.Attributes.Add("type", "text/javascript");

            if (HttpContext.Current.IsDebuggingEnabled)
            {
                source = GetDebugVersion(source, html.ViewContext.HttpContext.Server);
            }
            else
            {
                source = GetMinimizedVersion(source, html.ViewContext.HttpContext.Server);
            }

            tagBuilder.Attributes.Add("src", VirtualPathUtility.ToAbsolute(source));
            return tagBuilder.ToString(TagRenderMode.Normal);
        }

        public static string AssemblyVersion(this HtmlHelper html, Type type = null)
        {
            if (type == null)
                type = typeof(HtmlHelperExtensions);

            return Assembly.GetAssembly(type)
                    .GetCustomAttributes(true)
                    .OfType<AssemblyFileVersionAttribute>()
                    .Select(attr => attr.Version).FirstOrDefault();
        }

        private static string GetMinimizedVersion(string source, HttpServerUtilityBase server)
        {
            string file = Path.ChangeExtension(source, ".min.js");
            if (System.IO.File.Exists(server.MapPath(file)))
                return file;

            return source;
        }

        private static string GetDebugVersion(string source, HttpServerUtilityBase server)
        {
            string file = Path.ChangeExtension(source, ".debug.js");
            if (System.IO.File.Exists(server.MapPath(file)))
                return file;

            return source;
        }

        public static MvcHtmlString DropDownListWithSelected(this HtmlHelper html, string name, IEnumerable items, object selectedValue)
        {
            List<string> itemsList = (from object item in items select item.ToString()).ToList();

            if (!itemsList.Contains(selectedValue.ToString()))
            {
                selectedValue = selectedValue + "*";
                itemsList.Insert(0, selectedValue.ToString());
            }

            SelectList list = new SelectList(itemsList, selectedValue);

            return html.DropDownList(name, list);
        }

        public static string IdFor<T>(this HtmlHelper html, Expression<Func<T, object>> expression) where T : class, new()
        {
            var fluentHelper = new ModelViewPage<T>();
            return fluentHelper.IdFor(expression);
        }

        public static MvcHtmlString LabelFor<TModel, TValue>(this HtmlHelper<TModel> html, Expression<Func<TModel, TValue>> expression, object htmlAttributes)
        {
            return LabelFor(html, expression, new System.Web.Routing.RouteValueDictionary(htmlAttributes));
        }

        public static MvcHtmlString LabelFor<TModel, TValue>(this HtmlHelper<TModel> html, Expression<Func<TModel, TValue>> expression, IDictionary<string, object> htmlAttributes)
        {
            ModelMetadata metadata = ModelMetadata.FromLambdaExpression(expression, html.ViewData);
            string htmlFieldName = ExpressionHelper.GetExpressionText(expression);
            string labelText = metadata.DisplayName ?? metadata.PropertyName ?? htmlFieldName.Split('.').Last();
            if (String.IsNullOrEmpty(labelText))
            {
                return MvcHtmlString.Empty;
            }

            TagBuilder tag = new TagBuilder("label");
            tag.MergeAttributes(htmlAttributes);
            tag.Attributes.Add("for", html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldId(htmlFieldName));
            tag.SetInnerText(labelText);
            return MvcHtmlString.Create(tag.ToString(TagRenderMode.Normal));
        }

        #region [ RenderPartialToString ]

        // Adapted from http://www.klopfenstein.net/lorenz.aspx/render-partial-view-to-string-in-asp-net-mvc

        /// <summary>Renders a view to string.</summary> 
        public static string RenderPartialToString(this HtmlHelper html, string viewName, object model, ViewDataDictionary viewData)
        {
            return RenderViewToString(html.ViewContext.Controller.ControllerContext, viewName, model, viewData);
        }
        /// <summary>Renders a view to string.</summary> 
        public static string RenderViewToString(this Controller controller, string viewName, object model, ViewDataDictionary viewData)
        {
            return RenderViewToString(controller.ControllerContext, viewName, model, viewData);
        }

        #region [ Private Methods ]

        private static string RenderViewToString(ControllerContext context,
                                                string viewName, object model, ViewDataDictionary viewData)
        {
            using (StringWriter memWriter = new StringWriter())
            {
                //Create fake http context to render the view 
                HttpResponse fakeResponse = new HttpResponse(memWriter);
                HttpContext fakeContext = new HttpContext(HttpContext.Current.Request, fakeResponse);
                fakeContext.User = HttpContext.Current.User;
                foreach (object key in HttpContext.Current.Items.Keys)
                    fakeContext.Items.Add(key, HttpContext.Current.Items[key]);

                ControllerContext fakeControllerContext = new ControllerContext(
                    new HttpContextWrapper(fakeContext), context.RouteData, context.Controller);

                // Store current context
                HttpContext oldContext = HttpContext.Current;
                HttpContext.Current = fakeContext;

                //Use HtmlHelper to render partial view to fake context 
                var html = new HtmlHelper(
                    new ViewContext(fakeControllerContext, new FakeView(), new ViewDataDictionary(),
                                    new TempDataDictionary(), memWriter),
                    new ViewPage());
                html.RenderPartial(viewName, model, viewData);

                //Restore context 
                HttpContext.Current = oldContext;

                return memWriter.ToString();
            }
        }

        #endregion [ Private Methods ]

        /// <summary>Fake IView implementation, only used to instantiate an HtmlHelper.</summary> 
        private class FakeView : IView
        {
            #region IView Members
            public void Render(ViewContext viewContext, System.IO.TextWriter writer)
            {
                throw new NotImplementedException();
            }
            #endregion
        }

        #endregion
    }
}