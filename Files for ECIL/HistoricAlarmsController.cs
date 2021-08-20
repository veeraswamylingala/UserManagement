using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ScadaWebApi.Models;
using System.Web.Configuration;
using System.Reflection;
using System.Data.SqlClient;

namespace ScadaWebApi.Controllers
{
    [RoutePrefix("api/HistoricAlarms")]
    public class HistoricAlarmsController : ApiController
    {
        private ECDBAZEEntities db = new ECDBAZEEntities();
        public string connectionString = WebConfigurationManager.ConnectionStrings["ECDBAZEEntities"].ConnectionString;
        readonly string conString = WebConfigurationManager.ConnectionStrings["ECSCadaCon"].ConnectionString;

        // GET: api/EventsAlarms
        //public IQueryable<HISTALARM> GetHISTALARMs()
        //{
        //    return db.HISTALARMs;
        //}
        //[Route("date/{*pubdate:datetime:regex(\\d{4}/\\d{2}/\\d{2})}")]         
        [ResponseType(typeof(HISTALARM))]
        //
        //    [HttpGet, Route("api/sampledates/startdate/{startDate}/enddate/{endDate}/offset/{offset}/type{type}")]
        //    public IHttpActionResult Get(DateTime startDate, DateTime endDate, int offset = 0, string type = "defaultType")
        //    {
        //        List<DateTime> EventsAlarms = new List<DateTime>()
        //{
        //    new DateTime(2015, 1, 22),
        //    new DateTime(2015, 2, 22),
        //    new DateTime(2015, 3, 22),
        //    new DateTime(2015, 4, 22),
        //};

        //        return Ok(EventsAlarms);
        //    }
        #region old code
        //       https://localhost:44348/api/EventsAlarms/date/2014/03/14  [Route("date/{*StartDate:datetime:regex(\\d{4}/\\d{2}/\\d{2})}")]
        //     api/EventsAlarms/date/2014/03/14
        //  https://localhost:44348/api/EventsAlarms/date/2014/03/14/2017/03/14
        //[Route("date/{*StartDate:datetime:regex(\\d{4}/\\d{2}/\\d{2})}/{EndDate:datetime:regex(\\d{4}/\\d{2}/\\d{2})}")]
        // [Route("date/{*StartDate:datetime:regex(\\d{4}/\\d{2}/\\d{2})}")]
        //public IEnumerable<HISTALARM> GetEvents(DateTime StartDate)
        #region Working for both events and alarms -- commented by aparna 
        public IEnumerable<HISTALARM> GetEvents(DateTime? StartDate, DateTime? EndDate, string TagName, int? Flag)
        {
            // DateTime EndDate = Convert.ToDateTime("17-Mar-2014");
               //int Flag = 2;
            //1 events, 2 alarms
            List<Models.HISTALARM> GetAlarmsEventsList = new List<HISTALARM>();
            List<Models.HISTALARM> objInvoiceDetailsList = new List<Models.HISTALARM>();
            SqlConnection Connection = new SqlConnection(conString);
            System.Data.DataTable dt = new System.Data.DataTable();
            try
            {
                Connection.Open();
                string CmdTxt = "PR_GET_EVENTS_ALARMS";
                SqlCommand Command = new SqlCommand(CmdTxt, Connection);
                Command.CommandType = System.Data.CommandType.StoredProcedure;
                Command.Parameters.Add(new SqlParameter("@FromDate", StartDate));
                Command.Parameters.Add(new SqlParameter("@ToDate", EndDate));
                Command.Parameters.Add(new SqlParameter("@TagName", TagName));
                Command.Parameters.Add(new SqlParameter("@Flag", Flag));  // ---1 events, 2 alarms
                dt.Load(Command.ExecuteReader());
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
            GetAlarmsEventsList = ConvertDataTable<HISTALARM>(dt);
            return (GetAlarmsEventsList.ToList());
            // return new string[] { "value1", "value2" };
        }
        #endregion

        #endregion


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
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }



        //our own method
        [ResponseType(typeof(HISTALARM))]
        public IHttpActionResult GetHISTALARM(decimal id)
        {
            HISTALARM hISTALARM = db.HISTALARMs.Find(id);
            if (hISTALARM == null)
            {
                return NotFound();
            }

            return Ok(hISTALARM);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HISTALARMExists(decimal id)
        {
            return db.HISTALARMs.Count(e => e.MSINCE == id) > 0;
        }
    }
}