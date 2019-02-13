using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Text;

public partial class server_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);
      
        switch (Request["action"])
        {
            case "create":
                try
                {
                    //dodanie tabeli
                    conn.Open();
                    //bez autoinkrementacji - ta wersja jest na dziś
                    string sql = "CREATE TABLE godziny (id INTEGER, odG VARCHAR(10), odM VARCHAR(10), doG VARCHAR(10), doM VARCHAR(10))";
                    //z autoinkrementacją co 1
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;                   
                    command.Connection = conn;
                    command.ExecuteNonQuery(); // wykonanie
                    sql = "CREATE TABLE dni (id INTEGER, dayShortName VARCHAR(5), dayLongName VARCHAR(15))";
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    sql = "CREATE TABLE przedmioty (id INTEGER IDENTITY(1,1), subjectShortName VARCHAR(10), subjectLongName VARCHAR(30))";
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    sql = "CREATE TABLE uzytkownicy (id INTEGER IDENTITY(1,1), userName VARCHAR(30), userPassword VARCHAR(100), colorBackground VARCHAR(30), colorBackground2 VARCHAR(30), fontColor VARCHAR(30), fontType VARCHAR(30))";
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    sql = "CREATE TABLE lekcje (id INTEGER IDENTITY(1,1), nr VARCHAR(10), dayFK INTEGER, hourFK INTEGER, subjectFK INTEGER, userFK INTEGER)";
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("TABELE UTWORZONE");
                }
                catch (Exception ex)
                {
                    Response.Write("ERROR: TABELE JUŻ ISTNIEJĄ");
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "drop":
                try
                {
                    //usunięcie tabeli
                    conn.Open();
                    string sql2 = "DROP TABLE godziny";
                    SqlCommand command2 = new SqlCommand();
                    command2.CommandText = sql2;
                    command2.Connection = conn;
                    command2.ExecuteNonQuery(); // wykonanie
                    sql2 = "DROP TABLE dni";
                    command2.CommandText = sql2;
                    command2.Connection = conn;
                    command2.ExecuteNonQuery();
                    sql2 = "DROP TABLE przedmioty";
                    command2.CommandText = sql2;
                    command2.Connection = conn;
                    command2.ExecuteNonQuery();
                    sql2 = "DROP TABLE uzytkownicy";
                    command2.CommandText = sql2;
                    command2.Connection = conn;
                    command2.ExecuteNonQuery();
                    sql2 = "DROP TABLE lekcje";
                    command2.CommandText = sql2;
                    command2.Connection = conn;
                    command2.ExecuteNonQuery();
                    Response.Write("TABELE USUNIĘTE");
                }   
                catch (Exception ex)
                {
                    Response.Write("ERROR: TABELE NIE ISTNIEJĄ");
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "add":
                try
                { 
                    //dodanie danych
                    conn.Open();
                    string user = Request["user"];
                    string sql3="";
                    SqlCommand command3 = new SqlCommand();

                    if (user == "1")
                    {
                        for (int i = 1; i < 15; i++)
                        {
                            sql3 = "INSERT INTO godziny (id, odG, odM, doG, doM) VALUES(" + i + ",'00','00','00','00')";
                            command3.CommandText = sql3;
                            command3.Connection = conn;
                            command3.ExecuteNonQuery(); // wykonanie                    
                        }
                        for (int i = 1; i < 6; i++)
                        {
                            string sh = "";
                            string lng = "";
                            sql3 = "";
                            switch (i)
                            {
                                case 1:
                                    sh = "PN";
                                    lng = "poniedzialek";
                                    break;
                                case 2:
                                    sh = "WT";
                                    lng = "wtorek";
                                    break;
                                case 3:
                                    sh = "SR";
                                    lng = "sroda";
                                    break;
                                case 4:
                                    sh = "CZ";
                                    lng = "czwartek";
                                    break;
                                case 5:
                                    sh = "PT";
                                    lng = "piatek";
                                    break;
                            }
                            sql3 = "INSERT INTO dni (id, dayShortName, dayLongName) VALUES(" + i + ",'" + sh + "','" + lng + "')";
                            command3.CommandText = sql3;
                            command3.Connection = conn;
                            command3.ExecuteNonQuery(); // wykonanie                    
                        }
                        for (int i = 1; i < 6; i++)
                        {
                            string sh = "";
                            string lng = "";
                            sql3 = "";
                            switch (i)
                            {
                                case 1:
                                    sh = "POL";
                                    lng = "jezyk polski";
                                    break;
                                case 2:
                                    sh = "MAT";
                                    lng = "matematyka";
                                    break;
                                case 3:
                                    sh = "ANG";
                                    lng = "jezyk angielski";
                                    break;
                                case 4:
                                    sh = "AK";
                                    lng = "aplikacje klienckie";
                                    break;
                                case 5:
                                    sh = "WF";
                                    lng = "wychowanie fizyczne";
                                    break;
                            }
                            sql3 = "INSERT INTO przedmioty ( subjectShortName, subjectLongName) VALUES('" + sh + "','" + lng + "')";
                            command3.CommandText = sql3;
                            command3.Connection = conn;
                            command3.ExecuteNonQuery(); // wykonanie                    
                        }
                        if (user == "1")
                        {
                            sql3 = "INSERT INTO uzytkownicy (userName, userPassword, colorBackground, colorBackground2, fontColor, fontType) VALUES('test user name', 'test user password', '#0b0b0b', '#334b77', 'rgb(255,255,255)', 'Anonymous')";
                            command3.CommandText = sql3;
                            command3.Connection = conn;
                            command3.ExecuteNonQuery();
                        }
                    }
                    int hour = 1;
                    int day = 1;
                    int subject = 1;
                    //int user = 1;
                    for (int i = 1; i < 71; i++)
                    { 
                        sql3 = "";
                        sql3 = "INSERT INTO lekcje ( nr, dayFK, hourFK, subjectFK, userFK) VALUES('222',"+day+","+hour+","+subject+","+user+")";
                        command3.CommandText = sql3;
                        command3.Connection = conn;
                        command3.ExecuteNonQuery(); // wykonanie

                        if (hour == 14)
                        {
                            hour = 0;
                            day++;
                            subject++;
                        }
                        hour++;                    
                    }

                    Response.Write("DANE DODANE");
                }
                catch (Exception ex)
                {
                    Response.Write("ERROR: TABELE NIE ISTNIEJĄ");
                    //Response.Write(ex);
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "del":
                try
                {
                    //usunięcie danych
                    conn.Open();
                    string sql4 = "DELETE FROM godziny ";
                    SqlCommand command4 = new SqlCommand();
                    command4.CommandText = sql4;
                    command4.Connection = conn;
                    command4.ExecuteNonQuery(); // wykonanie
                    sql4 = "DELETE FROM dni ";
                    command4.CommandText = sql4;
                    command4.Connection = conn;
                    command4.ExecuteNonQuery();
                    sql4 = "DELETE FROM przedmioty ";
                    command4.CommandText = sql4;
                    command4.Connection = conn;
                    command4.ExecuteNonQuery();
                    sql4 = "DELETE FROM uzytkownicy ";
                    command4.CommandText = sql4;
                    command4.Connection = conn;
                    command4.ExecuteNonQuery();
                    sql4 = "DELETE FROM lekcje ";
                    command4.CommandText = sql4;
                    command4.Connection = conn;
                    command4.ExecuteNonQuery();
                    Response.Write("DANE USUNIĘTE");
                }
                catch (Exception ex)
                {
                    Response.Write("ERROR: TABELE NIE ISTNIEJĄ");
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "get":
                try
                {
                    //pobranie danych
                    conn.Open();
                    string user = Request["user"];

                    string sql5 = "SELECT * FROM godziny";
                    SqlDataAdapter da = new SqlDataAdapter(sql5, conn);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    int wier = dt.Rows.Count;
                    int kol = dt.Columns.Count;
                    StringBuilder sb = new StringBuilder();
                    sb.Append("{");
                    sb.Append("\"");
                    sb.Append("godziny");
                    sb.Append("\"");
                    sb.Append(":");
                    sb.AppendLine();
                    sb.Append("\t");
                    sb.Append("[");
                    sb.AppendLine();
                    for (int i = 0; i < wier; i++)
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
                        if (i != (wier - 1))
                            sb.Append(",");
                    }
                    sb.AppendLine();
                    sb.Append("\t");
                    sb.Append("]");
                    sb.AppendLine();
                    sb.Append("}");

                    string sql6 = "SELECT lekcje.id, przedmioty.subjectLongName, lekcje.nr FROM lekcje LEFT JOIN dni ON (lekcje.dayFK = dni.id) LEFT JOIN przedmioty ON(lekcje.subjectFK = przedmioty.id) WHERE(lekcje.userFK = " + user + " AND  lekcje.dayFK = "+ Request["day"] + ") ";
                    SqlDataAdapter da2 = new SqlDataAdapter(sql6, conn);
                    DataTable dt2 = new DataTable();
                    da2.Fill(dt2);
                    int wier2 = dt2.Rows.Count;
                    int kol2 = dt2.Columns.Count;
                    StringBuilder sb2 = new StringBuilder();

                    sb2.Append("{");
                    sb2.Append("\"");
                    sb2.Append("dzisiaj");
                    sb2.Append("\"");
                    sb2.Append(":");
                    sb2.AppendLine();
                    sb2.Append("\t");
                    sb2.Append("[");
                    sb2.AppendLine();
                    //DZIWNE RZECZY //////////////////////////////////////////////////////

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

                    string sql7 = "SELECT przedmioty.subjectShortName, lekcje.nr FROM lekcje LEFT JOIN przedmioty ON (lekcje.subjectFK = przedmioty.id) LEFT JOIN uzytkownicy ON(lekcje.userFK = uzytkownicy.id) WHERE lekcje.userFK =  " + user;
                    SqlDataAdapter da3 = new SqlDataAdapter(sql7, conn);
                    DataTable dt3 = new DataTable();
                    da3.Fill(dt3);
                    int wier3 = dt3.Rows.Count;
                    int kol3 = dt3.Columns.Count;
                    StringBuilder sb3 = new StringBuilder();

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

                    string sql2 = "SELECT colorBackground, colorBackground2, fontColor, fontType FROM uzytkownicy WHERE uzytkownicy.id = " + user;
                    SqlCommand command1 = new SqlCommand();
                    command1.CommandText = sql2;
                    command1.Connection = conn;
                    command1.ExecuteNonQuery();
                    SqlDataAdapter da4 = new SqlDataAdapter(sql2, conn);
                    DataTable dt4 = new DataTable();
                    da4.Fill(dt4);
                    //int wier3 = dt2.Rows.Count;
                    //int kol3 = dt2.Columns.Count;
                        StringBuilder sb4 = new StringBuilder();
                        sb4.Append(dt4.Rows[0][0]);
                        sb4.Append("/");
                        sb4.Append(dt4.Rows[0][1]);
                        sb4.Append("/");
                        sb4.Append(dt4.Rows[0][2]);
                        sb4.Append("/");
                        sb4.Append(dt4.Rows[0][3]);
                    string toSend = sb.ToString() + "|" + sb2.ToString() + "|" + sb3.ToString() + "|" + sb4.ToString();
                    Response.Write(toSend);
                }
                catch (Exception ex)
                {
                    Response.Write("ERROR: BRAK TABEL");
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "update":
                try
                {
                    //aktualizacja danych
                    string kol1Name= Request["kol1Name"];
                    string kol1 = Request["kol1"];
                    string kol2Name = Request["kol2Name"];
                    string kol2 = Request["kol2"];
                    string toID = Request["toID"];
                    conn.Open();
                    //string sql = "UPDATE tabela SET odG = 7, odM  = 30 WHERE id = 1;
                    string sql = "UPDATE godziny SET " + kol1Name + " = '" + kol1 + "', " + kol2Name + " = '" + kol2 + "' WHERE id = " + toID;
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("ZAPISANO ZMIANY");
                }
                catch (Exception ex)
                {
                    Response.Write("ERROR");
                }
                finally
                {
                    conn.Close();
                }
                break;
            case "updateColor":
                try
                {
                    //aktualizacja danych
                    string color2 = Request["color2"];
                    string color4 = Request["color4"];
                    string fontColor = Request["fontColor"];
                    string fontType = Request["fontType"];
                    string user = Request["user"];
                    conn.Open();
                    //string sql = "UPDATE tabela SET odG = 7, odM  = 30 WHERE id = 1;
                    string sql = "UPDATE uzytkownicy SET colorBackground = '"+color2+ "', colorBackground2 = '" + color4 + "', fontColor = '" + fontColor + "', fontType = '" + fontType + "' WHERE id = " + user;
                    SqlCommand command = new SqlCommand();
                    command.CommandText = sql;
                    command.Connection = conn;
                    command.ExecuteNonQuery();
                    Response.Write("ZAPISANO ZMIANY");
                }
                catch (Exception ex)
                {
                    Response.Write("ERROR");
                }
                finally
                {
                    conn.Close();
                }
                break;
        }
        
    }
}