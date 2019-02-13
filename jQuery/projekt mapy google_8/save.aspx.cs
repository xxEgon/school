using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Text;

public partial class save : System.Web.UI.Page
{
    private string PATH = HttpContext.Current.Server.MapPath("files/file1.txt");
    protected void Page_Load(object sender, EventArgs e)
    {
        string trasa = Request["trasa"];
        if (trasa != null)
        {
            Response.Write("ZAPISANO POPRAWNIE");
            SaveFile(trasa);
        }
        else
        {
            Response.Write("BRAK DANYCH");
        }
    }
    private void SaveFile(string trasa)
    {
        //   Response.Write("test");
        StreamWriter writer = new StreamWriter(PATH, true, Encoding.UTF8);
        writer.WriteLine(trasa);
        writer.Close();
    }
}