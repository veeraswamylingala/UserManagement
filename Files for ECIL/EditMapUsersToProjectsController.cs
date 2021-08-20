using System.Web;
using System.Web.Mvc;
using ScadaWebApi.Models;
using ScadaWebApi.Gateway;
using System.Web.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;
using System.Web.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ScadaWebApi.Controllers
{
    [System.Web.Http.Route("api/EdiMapUsersToProjects")]
    public class EditMapUsersToProjectsController : ApiController
    {
        private ECDBAZEEntities db = new ECDBAZEEntities();
        public string connectionString = WebConfigurationManager.ConnectionStrings["ECDBAZEEntities"].ConnectionString;
        readonly string conString = WebConfigurationManager.ConnectionStrings["ECSCadaCon"].ConnectionString;



        // GET api/<controller>/5
        // MapUsersToProjects
        [System.Web.Http.HttpGet]
        public string MapUsersToProjects([FromUri]int? UserMapID, int? UserID, int? ProjectID, int? RoleID, string Description, string AssignedFrom, string AssignedTo, 
            bool ActiveStatus)
        {

            int Result = 0;
            string Message = "";
            DataTable dt1 = new DataTable();
            SqlConnection con = new SqlConnection(conString);
            con.Open();
            try
            {

                ///////////////////////////////////////
                ///

                string CmdTxt = "PR_INSERT_UPDATE_MAP_USERS_TO_PROJECTS";
                SqlCommand Command = new SqlCommand(CmdTxt, con);
                Command.CommandType = CommandType.StoredProcedure;
                Command.Parameters.Add(new SqlParameter("@UserMapID", UserMapID));
                Command.Parameters.Add(new SqlParameter("@UserID", UserID));
                Command.Parameters.Add(new SqlParameter("@ProjectID", ProjectID));
                Command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
                Command.Parameters.Add(new SqlParameter("@Description", Description));
                Command.Parameters.Add(new SqlParameter("@AssignedFrom", AssignedFrom));
                Command.Parameters.Add(new SqlParameter("@AssignedTo", AssignedTo));
                Command.Parameters.Add(new SqlParameter("@ActiveStatus", ActiveStatus));
                SqlDataAdapter da = new SqlDataAdapter(Command);
                da.Fill(dt1);
                con.Close();
                if (dt1.Rows.Count > 0) Result = Convert.ToInt32(dt1.Rows[0]["UserMapID"].ToString());
                Message = (Result > 0) ? "User Assigned to Projects Updated Successfully" : "Sorry there is a problem in saving data";

                #region old code

                ///////////////////////////////////////
                //SqlConnection Connection = new SqlConnection(conString);
                //Connection.Open();
                //bool isError = false;
                //SqlTransaction objTrans = Connection.BeginTransaction();
                //try
                //{
                //    SqlCommand Command = new SqlCommand("PR_INSERT_UPDATE_MAP_USERS_TO_PROJECTS", Connection);
                //    Command.CommandType = System.Data.CommandType.StoredProcedure;
                //    Command.Transaction = objTrans;// Begin traction 

                //    Command.Parameters.Add(new SqlParameter("@UserID", UserID));
                //    Command.Parameters.Add(new SqlParameter("@ProjectID", ProjectID));
                //    Command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
                //    Command.Parameters.Add(new SqlParameter("@Description", Description));
                //    Command.Parameters.Add(new SqlParameter("@ActiveStatus", ActiveStatus)); 
                //    ////this.Result = Command.ExecuteNonQuery();
                //    SqlDataReader rdr = Command.ExecuteReader();
                //    while (rdr.Read())
                //    {
                //        Result = rdr.GetInt32(0);
                //        // UserDetail.UserID = rdr.GetString(1);
                //    }
                //    rdr.Close();
                //    isError = Result > 0 ? false : true;
                //    Message = Result > 0 ? "User Details Added Successfully" : "Sorry there is a problem in saving data";

                //    if (isError)
                //        objTrans.Rollback();
                //    else
                //        objTrans.Commit();// End Transaction

                #endregion end

            }
            catch (Exception ex)
            {
                Result = -1;
            }
            finally
            {
                //   Connection.Close();

                con.Close();
            }

            return Message;
        }


        // POST api/<controller>

        public IEnumerable<UsersToProjects> GetUsersMapToProjectsDetails(int? UserMapID)
        {
            // return db.UsersMapToProjects.ToList();
            List<Models.UsersToProjects> GetUsersList = new List<UsersToProjects>();
            List<Models.UsersToProjects> GetUsersMapToProjectsDetailsLst = new List<UsersToProjects>();

            SqlConnection Connection = new SqlConnection(conString);
            System.Data.DataTable dt = new System.Data.DataTable();
            try

            {
                Connection.Open();
                string CmdTxt = "PR_GET_USERS_MAP_TO_PROJECT_DETAILS";
                SqlCommand Command = new SqlCommand(CmdTxt, Connection);
                Command.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataAdapter sde = new SqlDataAdapter(Command);
                Command.Parameters.Add(new SqlParameter("@UserMapID", UserMapID));
                //sde.Fill(result);
                sde.Fill(dt);
                // result.Tables.Add(dtPoints);
                GetUsersMapToProjectsDetailsLst = ConvertDataTable<Models.UsersToProjects>(dt);
                // GetUsersList.AddRange(GetUsersMapToProjectsDetailsLst);
            }

            catch (Exception e)
            {
                //this.Result = -1;
                //this.ErrorMessage = e.Message;
            }
            finally
            {
                Connection.Close();
            }
            return (GetUsersMapToProjectsDetailsLst.ToList());

        }

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();

            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);


            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        if (dr[column.ColumnName] != DBNull.Value)
                            pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

        //public string MapUsersToProjects([FromUri] int? UserID, int? ProjectID, int? RoleID, string Description, 
        //    bool ActiveStatus)
        //{

        //    int Result = 0;
        //    string Message = "";
        //    DataTable dt1 = new DataTable();
        //    SqlConnection con = new SqlConnection(conString);
        //    con.Open();
        //    try
        //    {

        //        ///////////////////////////////////////
        //        ///

        //        string CmdTxt = "PR_INSERT_UPDATE_MAP_USERS_TO_PROJECTS";
        //        SqlCommand Command = new SqlCommand(CmdTxt, con);
        //        Command.CommandType = CommandType.StoredProcedure; 
        //        Command.Parameters.Add(new SqlParameter("@UserID", UserID));
        //        Command.Parameters.Add(new SqlParameter("@ProjectID", ProjectID));
        //        Command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
        //        Command.Parameters.Add(new SqlParameter("@Description", Description));
        //        Command.Parameters.Add(new SqlParameter("@ActiveStatus", ActiveStatus));
        //        SqlDataAdapter da = new SqlDataAdapter(Command);
        //        da.Fill(dt1);
        //        con.Close();
        //        if (dt1.Rows.Count > 0) Result = Convert.ToInt32(dt1.Rows[0]["UserMapID"].ToString());
        //        Message = (Result > 0) ? "User Details Added Successfully" : "Sorry there is a problem in saving data";

        //        #region old code

        //        ///////////////////////////////////////
        //        //SqlConnection Connection = new SqlConnection(conString);
        //        //Connection.Open();
        //        //bool isError = false;
        //        //SqlTransaction objTrans = Connection.BeginTransaction();
        //        //try
        //        //{
        //        //    SqlCommand Command = new SqlCommand("PR_INSERT_UPDATE_MAP_USERS_TO_PROJECTS", Connection);
        //        //    Command.CommandType = System.Data.CommandType.StoredProcedure;
        //        //    Command.Transaction = objTrans;// Begin traction 

        //        //    Command.Parameters.Add(new SqlParameter("@UserID", UserID));
        //        //    Command.Parameters.Add(new SqlParameter("@ProjectID", ProjectID));
        //        //    Command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
        //        //    Command.Parameters.Add(new SqlParameter("@Description", Description));
        //        //    Command.Parameters.Add(new SqlParameter("@ActiveStatus", ActiveStatus)); 
        //        //    ////this.Result = Command.ExecuteNonQuery();
        //        //    SqlDataReader rdr = Command.ExecuteReader();
        //        //    while (rdr.Read())
        //        //    {
        //        //        Result = rdr.GetInt32(0);
        //        //        // UserDetail.UserID = rdr.GetString(1);
        //        //    }
        //        //    rdr.Close();
        //        //    isError = Result > 0 ? false : true;
        //        //    Message = Result > 0 ? "User Details Added Successfully" : "Sorry there is a problem in saving data";

        //        //    if (isError)
        //        //        objTrans.Rollback();
        //        //    else
        //        //        objTrans.Commit();// End Transaction

        //            #endregion end

        //        }
        //        catch (Exception ex)
        //        {
        //            Result = -1;
        //        }
        //        finally
        //        {
        //        //   Connection.Close();

        //        con.Close();
        //        }

        //    return Message;
        //}


        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}