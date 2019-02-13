using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Web.Security;

public partial class server_Register : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string connstr = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\\Database.mdf;Integrated Security = True; Connect Timeout = 30";
        SqlConnection conn = new SqlConnection(connstr);

        string a = Request["action"];
        if (a == "log")
        {
            try
            {
                //aktualizacja danych
                string login = Request["login"];
                string passwd = Request["passwd"];
                conn.Open();

                login = login.Replace("\'", "");
                login = login.Replace("\"", "");
                login = login.Replace("<", "");
                login = login.Replace(">", "");
                login = login.Replace("javascript", "");

                passwd = passwd.Replace("\'", "");
                passwd = passwd.Replace("\"", "");
                passwd = passwd.Replace("<", "");
                passwd = passwd.Replace(">", "");
                passwd = passwd.Replace("javascript", "");

                //string zaszyfrowane = FormsAuthentication.HashPasswordForStoringInConfigFile(pass, "SHA1");
                passwd = FormsAuthentication.HashPasswordForStoringInConfigFile(passwd, "SHA1");

                //string resp = "NIE MA TAKIEGO";
                string sql1 = "SELECT userName FROM uzytkownicy WHERE userName = '" + login + "' ";
                SqlCommand command = new SqlCommand();
                command.CommandText = sql1;
                command.Connection = conn;
                command.ExecuteNonQuery();

                SqlDataAdapter da = new SqlDataAdapter(sql1, conn);
                DataTable dt = new DataTable();
                da.Fill(dt);
                //int wier3 = dt.Rows.Count;
                //int kol3 = dt.Columns.Count;
                StringBuilder sb = new StringBuilder();
                try
                {
                    sb.Append(dt.Rows[0][0]);
                    string sbA = sb.ToString();
                    if (sbA == login)
                    {
                        try
                        {
                            string sql2 = "SELECT id, userPassword FROM uzytkownicy WHERE userPassword = '" + passwd + "' AND userName = '" + login + "' ";
                            SqlCommand command1 = new SqlCommand();
                            command1.CommandText = sql2;
                            command1.Connection = conn;
                            command1.ExecuteNonQuery();
                            SqlDataAdapter da2 = new SqlDataAdapter(sql2, conn);
                            DataTable dt2 = new DataTable();
                            da2.Fill(dt2);
                            //int wier3 = dt2.Rows.Count;
                            //int kol3 = dt2.Columns.Count;
                            StringBuilder sb2 = new StringBuilder();
                            sb2.Append(dt2.Rows[0][1]);
                            string sb2A = sb2.ToString();
                            if (sb2A == passwd)
                            {
                                StringBuilder sb3 = new StringBuilder();
                                sb3.Append(dt2.Rows[0][0]);
                                Response.Write("ZALOGOWANO"+ sb3.ToString());
                            }
                        }
                        catch
                        {
                            Response.Write("NIEPOPRAWNE DANE");
                        }
                    }
                }
                catch
                {
                    //REJESTRACJA - INSERT..
                    string sql3 = "INSERT INTO uzytkownicy (userName, userPassword, colorBackground, colorBackground2, fontColor, fontType) VALUES ('" + login+"' , '"+passwd+ "', '#0b0b0b', '#334b77', 'rgb(255,255,255)', 'Anonymous' )";
                    SqlCommand command1 = new SqlCommand();
                    command1.CommandText = sql3;
                    command1.Connection = conn;
                    command1.ExecuteNonQuery();

                    string sql2 = "SELECT id FROM uzytkownicy WHERE userPassword = '" + passwd + "' AND userName = '" + login + "' ";
                    SqlCommand command2 = new SqlCommand();
                    command2.CommandText = sql2;
                    command2.Connection = conn;
                    command2.ExecuteNonQuery();
                    SqlDataAdapter da2 = new SqlDataAdapter(sql2, conn);
                    DataTable dt2 = new DataTable();
                    da2.Fill(dt2);
                    //int wier3 = dt2.Rows.Count;
                    //int kol3 = dt2.Columns.Count;
                    StringBuilder sb2 = new StringBuilder();
                    sb2.Append(dt2.Rows[0][0]);
                    string sb2A = sb2.ToString();
                    Response.Write("ZAREJESTROWANO"+sb2A);
                }
            }
            catch (Exception ex)
            {
                Response.Write("ERROR");
                //Response.Write(ex);
            }
            finally
            {
                conn.Close();
            }

        }
    }
}