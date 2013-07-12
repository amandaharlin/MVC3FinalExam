using System.Web.UI;
using System.Web.UI.Adapters;
using System.Web.UI.WebControls;

namespace Mvc3App.Framework
{
    public class ButtonAdapter : ControlAdapter
    {

        // Return a strongly-typed reference
        public new Button Control
        {
            get
            {
                return (Button)base.Control;
            }
        }

        protected override void Render(HtmlTextWriter writer)
        {
            Button button = this.Control;

            writer.WriteBeginTag("button"); // <button 
            writer.WriteAttribute("value", "submit"); // <button value="submit" 
            writer.WriteAttribute("id", button.ClientID); // <button value="submit" id="btnButton"

            PostBackOptions myPostBackOptions = new PostBackOptions(button);
            //Add the Postback event
            if (button.Page.ClientScript.GetPostBackEventReference(myPostBackOptions).Length > 0)
            {
                //Turn on Validation if it needs to be on...
                if (button.CausesValidation)
                    myPostBackOptions.PerformValidation = true;

                //Need to replace double quotes with single quotes for javascript to work.
                writer.WriteAttribute("onclick", button.Page.ClientScript.GetPostBackEventReference(myPostBackOptions).Replace("\"", "'")); // <button value="submit" 

                //Register the Event
                button.Page.ClientScript.RegisterForEventValidation(myPostBackOptions);
            } // <button value="submit" id="btnButton" onclick="__doPostBack('btnButton','')"

            if (button.CssClass.Length > 0)
                writer.WriteAttribute("class", button.CssClass); // <button value="submit" id="btnButton" onclick="__doPostBack('btnButton','')" class="large-button"

            writer.Write(HtmlTextWriter.TagRightChar); // <button value="submit" id="btnButton" onclick="__doPostBack('btnButton','')" class="large-button">
            writer.WriteFullBeginTag("span");
            writer.Write(button.Text);
            writer.WriteEndTag("span"); // <button value="submit" id="btnButton" onclick="__doPostBack('btnButton','')" class="large-button"><span>testButton</span>
            writer.WriteEndTag("button"); // <button value="submit" id="btnButton" onclick="__doPostBack('btnButton','')" class="large-button"><span>testButton</span></button>
        }
    }
}