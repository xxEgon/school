using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Text;

public partial class server_Test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        conn.Open();
        string sql5 = "SELECT * FROM godziny";
        SqlDataAdapter da = new SqlDataAdapter(sql5, conn);
        DataTable dt = new DataTable();
        da.Fill(dt);
        int wier = dt.Rows.Count;
        int kol = dt.Columns.Count;
        //Response.Write(dt.Rows.Count);              // ilość wierszy w tabeli
        // Response.Write(dt.Columns.Count);           // ilość kolumn w tabeli
        // Response.Write(dt.Columns[0].ColumnName);   // nazwa 1 kolumny
        //Response.Write(dt.Rows[0][0]); 	            // wartość w 1 komórce 1 wiersza
        StringBuilder sb = new StringBuilder();
        //sb.Append("napis");
        //sb.Append("\""); // cudzysłów w napisie
        //sb.AppendLine(); // nowa linia
        //sb.Append("\t"); // tabulator
        sb.Append("{");
        sb.Append("\"");
        sb.Append("godziny");
        sb.Append("\"");
        sb.Append(":");
        sb.AppendLine();
        sb.Append("\t");
        sb.Append("[");
        sb.AppendLine();       
        for (int i = 0; i <  wier; i++)
        {
            sb.Append("{");
            for (int p = 0; p < kol; p++)
            {
                sb.Append("\"");
                sb.Append(dt.Columns[p].ColumnName);
                sb.Append("\"");
                sb.Append(":");
                sb.Append("\"");
                sb.Append(dt.Rows[i][p]);
                sb.Append("\"");
                if (p != (kol - 1))
                    sb.Append(",");
            }
            sb.Append("}");
            if(i!=(wier-1))
                sb.Append(",");
        }       
        sb.AppendLine();
        sb.Append("\t");
        sb.Append("]");
        sb.AppendLine();
        sb.Append("}");
        Response.Write(sb.ToString());

        //string sql6 = "SELECT lekcje.id, przedmioty.subjectLongName, lekcje.nr FROM lekcje LEFT JOIN dni ON (lekcje.dayFK = dni.id) LEFT JOIN przedmioty ON(lekcje.subjectFK = przedmioty.id) WHERE(lekcje.userFK = 1 AND  lekcje.dayFK = 1) ";
        string sql6 = "SELECT lekcje.id, przedmioty.subjectLongName, lekcje.nr FROM lekcje LEFT JOIN dni ON (lekcje.dayFK = dni.id) LEFT JOIN przedmioty ON(lekcje.subjectFK = przedmioty.id) WHERE(lekcje.userFK = 1 AND  lekcje.dayFK = 1) ";
        SqlDataAdapter da2 = new SqlDataAdapter(sql6, conn);
        DataTable dt2 = new DataTable();
        da2.Fill(dt2);
        int wier2 = dt2.Rows.Count ;
        int kol2 = dt2.Columns.Count ;
        StringBuilder sb2 = new StringBuilder();

        sb2.AppendLine();
        sb2.AppendLine();
        sb2.AppendLine();

        sb2.Append("{");
        sb2.Append("\"");
        sb2.Append("dzisiaj");
        sb2.Append("\"");
        sb2.Append(":");
        sb2.AppendLine();
        sb2.Append("\t");
        sb2.Append("[");
        sb2.AppendLine();
        for (int i = 0; i < wier2; i++)
        {
            sb2.Append("{");
            for (int p = 0; p < kol2; p++)
            {
                sb2.Append("\"");
                sb2.Append(dt2.Columns[p].ColumnName);
                sb2.Append("\"");
                sb2.Append(":");
                sb2.Append("\"");
                sb2.Append(dt2.Rows[i][p]);
                sb2.Append("\"");
                if (p != (kol2 - 1))
                    sb2.Append(",");
            }
            sb2.Append("}");
            if (i != (wier2 - 1))
                sb2.Append(",");
        }
        sb2.AppendLine();
        sb2.Append("\t");
        sb2.Append("]");
        sb2.AppendLine();
        sb2.Append("}");

        Response.Write(sb2.ToString());
        SqlCommand command3 = new SqlCommand();

        string sql7 = "SELECT przedmioty.subjectShortName, lekcje.nr FROM lekcje LEFT JOIN przedmioty ON (lekcje.subjectFK = przedmioty.id) LEFT JOIN uzytkownicy ON(lekcje.userFK = uzytkownicy.id) WHERE lekcje.userFK = 1";
        SqlDataAdapter da3 = new SqlDataAdapter(sql7, conn);
        DataTable dt3 = new DataTable();
        da3.Fill(dt3);
        int wier3 = dt3.Rows.Count;
        int kol3 = dt3.Columns.Count;
        StringBuilder sb3 = new StringBuilder();

        sb3.AppendLine();
        sb3.AppendLine();
        sb3.AppendLine();

        sb3.Append("{");
        sb3.Append("\"");
        sb3.Append("tydzien");
        sb3.Append("\"");
        sb3.Append(":");
        sb3.AppendLine();
        sb3.Append("\t");
        sb3.Append("[");
        sb3.AppendLine();
        for (int i = 0; i < wier3; i++)
        {
            sb3.Append("{");
            for (int p = 0; p < kol3; p++)
            {
                sb3.Append("\"");
                sb3.Append(dt3.Columns[p].ColumnName);
                sb3.Append("\"");
                sb3.Append(":");
                sb3.Append("\"");
                sb3.Append(dt3.Rows[i][p]);
                sb3.Append("\"");
                if (p != (kol3 - 1))
                    sb3.Append(",");
            }
            sb3.Append("}");
            if (i != (wier3 - 1))
                sb3.Append(",");
        }
        sb3.AppendLine();
        sb3.Append("\t");
        sb3.Append("]");
        sb3.AppendLine();
        sb3.Append("}");

        Response.Write(sb3.ToString());
    }
}