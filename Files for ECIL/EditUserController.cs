
using System.Web.Mvc;
using ScadaWebApi.Models;
using ScadaWebApi.Gateway;
using System.Web.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;
using System.Web.Http;
using RoutePrefixAttribute = System.Web.Http.RoutePrefixAttribute;
using System;
using System.Collections.Generic;
using System.Linq;
//using System.Web.Http.Cors;

namespace ScadaWebApi.Controllers
{
    [RoutePrefix("api/EditUser")]
    // [EnableCors(origins: "http://183.82.4.93:5887/ECScadaTrends", headers: "*", methods: "get,post")]
    public class EditUserController : ApiController
    {
        private ECDBAZEEntities db = new ECDBAZEEntities();
        public string connectionString = WebConfigurationManager.ConnectionStrings["ECDBAZEEntities"].ConnectionString;
        readonly string conString = WebConfigurationManager.ConnectionStrings["ECSCadaCon"].ConnectionString;

         
        [System.Web.Http.HttpGet]
        public string EditUser([FromUri]int UserID, string FirstName, string LastName, string EmpCode, string Gender, string DOB, string Department
           , string ReportingManager, int? ReportingManagerID, string Mobile, string AlternatePhone, string EmailID, string Address, string DateofJoining, string DateofRelieving
          , int? RoleID, bool ActiveStatus)
        {
            DateTime DOB1, DateofJoining1, DateofRelieving1;
            DOB1 = (!string.IsNullOrEmpty(DOB)) ? Convert.ToDateTime(DOB) : DateTime.MinValue;
            DateofJoining1 = (!string.IsNullOrEmpty(DateofJoining)) ? Convert.ToDateTime(DateofJoining) : DateTime.MinValue;
            DateofRelieving1 = (!string.IsNullOrEmpty(DateofRelieving)) ? Convert.ToDateTime(DateofRelieving) : DateTime.MinValue;
            int Result = 0;
            string Message = "";
            try
            {
                SqlConnection Connection = new SqlConnection(conString);
                Connection.Open();
                bool isError = false;
                SqlTransaction objTrans = Connection.BeginTransaction();
                try
                {
                    SqlCommand Command = new SqlCommand("PR_INSERTUPDATE_USERDETAILS", Connection);
                    Command.CommandType = System.Data.CommandType.StoredProcedure;
                    Command.Transaction = objTrans;// Begin traction 

                    Command.Parameters.Add(new SqlParameter("@UserID", UserID));
                    Command.Parameters.Add(new SqlParameter("@FirstName", FirstName));
                    Command.Parameters.Add(new SqlParameter("@LastName", LastName));
                    Command.Parameters.Add(new SqlParameter("@EmpCode", EmpCode));
                    Command.Parameters.Add(new SqlParameter("@Gender", Gender));
                    Command.Parameters.Add(new SqlParameter("@DOB", DOB));
                    Command.Parameters.Add(new SqlParameter("@Department", Department == null ? " " : Department.ToString()));
                    Command.Parameters.Add(new SqlParameter("@ReportingManager", ReportingManager == null ? " " : ReportingManager.ToString()));
                    Command.Parameters.Add(new SqlParameter("@ReportingManagerID", ReportingManagerID ==  null ? 0 : (int)ReportingManagerID));

                    Command.Parameters.Add(new SqlParameter("@Mobile", Mobile == null ? " " : Mobile.ToString()));
                    Command.Parameters.Add(new SqlParameter("@AlternatePhone", AlternatePhone == null ? " " : AlternatePhone.ToString()));
                    Command.Parameters.Add(new SqlParameter("@EmailID", EmailID == null ? " " : EmailID.ToString()));
                    Command.Parameters.Add(new SqlParameter("@Address", Address == null ? " " : Address.ToString()));
                    Command.Parameters.Add(new SqlParameter("@DateofJoining", DateofJoining == "" ? null : DateofJoining.ToString()));
                    Command.Parameters.Add(new SqlParameter("@DateofRelieving", DateofRelieving =="" ? null : DateofRelieving.ToString()));
                    Command.Parameters.Add(new SqlParameter("@RoleID", RoleID == null ? 0 : (int)RoleID));
                    Command.Parameters.Add(new SqlParameter("@ActiveStatus", ActiveStatus));
                    //Command.Parameters.Add(new SqlParameter("@Username", Username));
                    //Command.Parameters.Add(new SqlParameter("@Password", Password));
                    ////this.Result = Command.ExecuteNonQuery();
                    SqlDataReader rdr = Command.ExecuteReader();
                    while (rdr.Read())
                    {
                        Result = rdr.GetInt32(0);
                        // UserDetail.UserID = rdr.GetString(1);
                    }
                    rdr.Close();
                    isError = Result > 0 ? false : true;
                    Message = Result > 0 ? "User Details Updated Successfully" : "Sorry there is a problem in saving data";

                    if (isError)
                        objTrans.Rollback();
                    else
                        objTrans.Commit();// End Transaction

                }
                catch (Exception e)
                {
                    Result = -1;
                }
                finally
                {
                    Connection.Close();
                }
            }
            catch (Exception ex)
            {

            }
            return Message;

        }


    }
}

