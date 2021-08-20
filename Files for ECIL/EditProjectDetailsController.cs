
using System.Web;
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
   [RoutePrefix("api/EditProjectDetails")]
   // [EnableCors(origins: "http://183.82.4.93:5887/ECScadaTrends", headers: "*", methods: "get,post")]
    //[EnableCors("*","*","*")]
    public class EditProjectDetailsController : ApiController
    {
        private ECDBAZEEntities db = new ECDBAZEEntities();
        public string connectionString = WebConfigurationManager.ConnectionStrings["ECDBAZEEntities"].ConnectionString;
        readonly string conString = WebConfigurationManager.ConnectionStrings["ECSCadaCon"].ConnectionString;

        // GET: api/UserDetail
       
        [System.Web.Http.HttpGet]
        public string Get([FromUri]int? ProjectID,string ProjectName, string ProjectCode,string ProjectDesc, string StartDate, string EndDate
            ,double ProjectValue, string Location, bool ActiveStatus)
        {
            int Result = 0;
            string Message = "";             
            SqlConnection Connection = new SqlConnection(conString);
            System.Data.DataTable dt1 = new System.Data.DataTable();
            try
           {
                Connection.Open();
                string CmdTxt = "PR_INSERTUPDATE_GET_PROJECTDETAILS";
                SqlCommand Command = new SqlCommand(CmdTxt, Connection);               
                Command.CommandType = System.Data.CommandType.StoredProcedure;
                Command.Parameters.Add(new SqlParameter("@ProjectID", ProjectID));
                Command.Parameters.Add(new SqlParameter("@ProjectName", ProjectName));
                Command.Parameters.Add(new SqlParameter("@ProjectCode", ProjectCode));

                Command.Parameters.Add(new SqlParameter("@ProjectDesc", ProjectDesc));
                Command.Parameters.Add(new SqlParameter("@StartDate", StartDate));
                Command.Parameters.Add(new SqlParameter("@EndDate", EndDate));

                Command.Parameters.Add(new SqlParameter("@ProjectValue", ProjectValue));
                Command.Parameters.Add(new SqlParameter("@Location", Location));
                Command.Parameters.Add(new SqlParameter("@ActiveStatus", ActiveStatus));
                Command.Parameters.Add(new SqlParameter("@FLAG", 'U'));

                //dt.Load(Command.ExecuteReader());
                SqlDataAdapter da = new SqlDataAdapter(Command);
                da.Fill(dt1);
                Connection.Close();
                if (dt1.Rows.Count > 0) Result = Convert.ToInt32(dt1.Rows[0]["ProjectID"].ToString());
                Message = (Result > 0) ? "Projects Updated Successfully" : "Sorry there is a problem in saving data";

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
          
            //var itemgroupname = GetGroupNamesList.RemoveAll(x => x.CURTRENDTITLE == null);
            return Message;

        }
         
        // GET: api/UserDetails/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //    Gender,DOB,Department,ReportingManager,ReportingManagerID		 ,Mobile,AlternatePhone,EmailID,Address,DateofJoining,isnull(DateofRelieving,'01/01/1900')DateofRelieving,
        //    ROleID, ActiveStatus,InsertedBy, InsertedDate,ModifiedDate,Username,Password


        // POST: api/UserDetail/create
        // [System.Web.Http.Route("api/UserDetail/{FirstName}/{LastName}/{EmpCode}/{Gender}/{DOB}/{Department}/{ReportingManager}/{ReportingManagerID}/{Mobile}/{AlternatePhone}/{EmailID}/{Address}/{DateofJoining}/{DateofRelieving}/{RoleID}/{ActiveStatus}/{Username}/{Password}")]
        // [System.Web.Http.Route("UserDetail/{FirstName}/{LastName}/{EmpCode}/{Gender}/{DOB}/{Department}/{ReportingManager}/{ReportingManagerID}/{Mobile}/{AlternatePhone}/{EmailID}/{Address}/{DateofJoining}/{DateofRelieving}/{RoleID}/{ActiveStatus}/{Username}/{Password}")]
        //[System.Web.Http.Route("UserDetail?FirstName=FirstName&LastName=LastName")]
       // [System.Web.Http.Route("~/api/UserDetail/CreateUser")]
        //[System.Web.Http.HttpPost]
        //public void Post([FromUri]string FirstName, string LastName, string EmpCode, string Gender, DateTime DOB, string Department
        //    , string ReportingManager, int ReportingManagerID, string Mobile, string AlternatePhone, string EmailID, string Address, DateTime DateofJoining, DateTime DateofRelieving
        //    , int RoleID, bool ActiveStatus, string Username, string Password)
        //public void Post([FromUri]string FirstName, string LastName)

   
    }
}
