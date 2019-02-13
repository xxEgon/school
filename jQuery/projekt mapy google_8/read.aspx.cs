using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.IO;
using System.Text;

public partial class read : System.Web.UI.Page
{
    private string PATH = HttpContext.Current.Server.MapPath("files/file1.txt");
    protected void Page_Load(object sender, EventArgs e)
    {
        StreamReader reader = new StreamReader(PATH , Encoding.UTF8);
        string all = reader.ReadToEnd();
        string retTabs = "["+ all.Substring(0, all.Length - 3)+"]" ; // 3 - przecinek i enter na końcu
                                                                       //dodatkowe [] są po to aby spełnić standard json-a uzyskując tablicę tablic
        reader.Close();
        Response.Write(retTabs);

    }
}