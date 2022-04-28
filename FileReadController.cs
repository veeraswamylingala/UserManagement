using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web.Configuration;
using System.Web.Http;
using ScadaWebApi.Models;
using ScadaWebApi.Gateway;

namespace ScadaWebApi.Controllers
{
    [RoutePrefix("api/FileRead")]
    public class FileReadController : ApiController
    {
        //TextFilesPackage_2021-07-13 18_50_22
        string FilePath = System.Configuration.ConfigurationSettings.AppSettings["FileReadingPath"].ToString();
        // string FilePath1 = System.Configuration!System.Configuration.ConfigurationManager.AppSettings["FileReadingPath"].ToString();
        public string conString = WebConfigurationManager.ConnectionStrings["ECSCadaCon"].ConnectionString;

        // [ActionName("LoadData")]  //  /api/FileRead?PointName=DAS_GRP2&FromDt=2022-03-25T00:00:00&ToDt=2022-03-26T23:00:00
        [HttpGet]
        public IEnumerable<Models.WebdataLog> FileRead([FromUri] string TagName, string FromDt, string ToDt)//([FromBody] DateModel dateModel)
        {
            string fullpath = FilePath + "\\";//  + "TextFilesPackage_2021-07-13 18_50_22.txt"
                                              //
            /*
            string FromDate = dateModel.FromDate; //"22-07-2021";
            string FromTime = dateModel.FromDate.ToString().Substring(11,5); //"15:59";
            string GroupName = dateModel.GroupName; //"DAS_GRP2";
            string ToDate = dateModel.ToDate; //"24-07-2021"; 
            string ToTime = dateModel.ToDate.ToString().Substring(11, 5); //"18:00";
            */

            string FromDate = FromDt.ToString().Substring(0, 10);
            string ToDate = ToDt.ToString().Substring(0, 10);
            string FromTime = FromDt.ToString().Substring(11, 5);
            string ToTime = ToDt.ToString().Substring(11, 5);
            string GroupName = "";// PointName;

            FromDate = ConvertDateTime(FromDate).ToString(); //, "-"
            ToDate = ConvertDateTime(ToDate).ToString();//, "-"
            ///Here we need to check the txtDate is in the datesbetween array of dates or not
            DateTime starting = new DateTime();
            starting = DateTime.ParseExact(FromDate, "dd-MM-yyyy", null);
            DateTime ending = new DateTime();
            ending = DateTime.ParseExact(ToDate, "dd-MM-yyyy", null);
            DateTime[] dates = GetDatesBetween(starting, ending).ToArray();
            List<string> dateAndTimesFinal = new List<string>();
            DateTime txtDateT = new DateTime();
            //Dt, DS declarations            
            DataSet dsTxtFiledata = new DataSet();
            DataTable dt1 = new DataTable();
            DataTable dtFinal = new DataTable();
            //dt.Columns.Add("slno");
            //dt.Columns.Add("pointname");
            //dt.Columns.Add("fvalue");
            //dt.Columns.Add("timestamp");
            string txtFullName = "", txtDate = ""; // TagName = "";
             
            int intCharAt = 0;
            ////
            int aa = Convert.ToInt32(FromTime.Substring(0, 2));
            int bb = Convert.ToInt32(FromTime.Substring(3, 2));
            //converting From time into minutes
            int intNoofHrsFromTime = 60 * aa + bb; //////60 * Convert.ToInt32(FromTime.Substring(2)) + Convert.ToInt32(FromTime.Substring(FromTime.IndexOf(':') + 1,2));

            int p = Convert.ToInt32(ToTime.Substring(0, 2));
            int q = Convert.ToInt32(ToTime.Substring(3, 2));
            int intNoofHrsToTime = 60 * p + q;  //Todaate no of hrs calculation

            //defining intervals based on the SSIS package.
            //My SSIS Job will run for every 12 hrs. i.e., for one day it runs 2 times at 00:00 and again at 12:00 pm 
            //I need to check here first interval - time value will be '0', second interval time value is 720 (12 hrs * 60 min) = 720 min
            //We need to check intNoofHrs is between first interval or second interval.
            List<WebdataLog> webdataLog = new List<WebdataLog>();
            var webdataLogFinalList = new List<WebdataLog>();
            #region Get Tag Names Based on GroupName
            DataTable dtTagNames = new DataTable();
            //dtTagNames = GetTagNames(GroupName);
            //
            SqlConnection connection = new SqlConnection(conString);
            try
            {
                connection.Open();
                string cmdTxt = "PR_GET_TAGNAMES_BY_GROUP";
                SqlCommand sqlCommand = new SqlCommand(cmdTxt, connection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@GroupName", GroupName));
                dtTagNames.Load(sqlCommand.ExecuteReader());
                connection.Close();
            }
            catch (Exception ex)
            {

            }
            finally
            {
                connection.Close();
            }
            //
            // DataTable dtTagNameColors = new DataTable();
            // dtTagNameColors = GetTagNameColors(GroupName);
            #endregion

            #region Converting dtTagNames to ArrayList object 
            //declaring ArryList for getting the tagnames of the selected Groupname           
            var ArryList = new ArrayList();
            /*
            if (dtTagNames.Rows.Count > 0)
            {
                foreach (DataRow dr in dtTagNames.Rows)
                    ArryList.Add(string.Join(",", dr.ItemArray.Select(item => item.ToString())));
            }*/
            ArryList.Add(TagName.ToLower());
            #endregion

            string partialName = FromDate + " " + FromTime;
            DirectoryInfo di = new DirectoryInfo(FilePath);
            ArrayList MatchedFileNamesList = new ArrayList();
            int matchedFileCount = 0; int jj = 0;
            DirectoryInfo hdDirectoryInWhichToSearch = new DirectoryInfo(FilePath);  //("*" + partialName + "*.*");
            foreach (var fi in di.EnumerateFiles("*", SearchOption.AllDirectories))  //foreach (var fi in di.EnumerateFiles("*"+"$"+"?.txt"))
            {
                //Console.WriteLine(fi.Name);
                txtFullName = fi.Name;
                TagName = txtFullName.Substring(0, txtFullName.IndexOf('$'));
                intCharAt = txtFullName.IndexOf('$');
                //13 characters from $ symbol
                txtDate = txtFullName.Substring(intCharAt + 1, 10);
                if (ArryList.Contains(TagName.ToLower()))
                {
                    // PENCOLOR = dtTagNameColors.Rows[0]["PENCOLOR"].ToString().SingleOrDefault().ToString().Any(x=>x.)
                    // txtDateT = txtDate.ToString("dd/MM/yyyy");
                    // txtDateT.ToString("dd/mm/yyyy");
                    //// txtDate = ConvertDateTime1(txtDate).ToString();//,"/"  --for testing purpose
                    txtDate = ConvertDateTime(txtDate, "/").ToString();
                    // txtDateT = DateTime.TryParse(dt,)
                    txtDateT = DateTime.ParseExact(txtDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    //txtDateT = Convert.ToDateTime(txtDate);
                    
                        for (; jj < dates.Count(); jj++)
                        {
                            txtDateT = dates[jj];
                            if (Array.Exists(dates, x => x == txtDateT))
                            {
                                string CurrentDate;
                                string dttxt = Convert.ToString(txtDateT);
                                dttxt = dttxt.Substring(0, 10);
                                CurrentDate = dttxt;// 
                                CurrentDate = ConvertDateDDmmYYYY(dttxt, "-");
                                if (FromDate == ToDate)
                                {
                                    List<string> dateAndTimes = new List<string>();
                                    CurrentDate = ConvertDateTime2(CurrentDate, "-").ToString();
                                    //first case validation started
                                    if (intNoofHrsFromTime < 480)//0 to 480 min, 480 to 960, 960 to 1440
                                    {
                                        if (intNoofHrsToTime < 480)
                                        {
                                            //txtFullName = CurrentDate + " " + "000000.txt";
                                            dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        }
                                        else if (intNoofHrsToTime <= 480)
                                        {
                                            dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                            dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        }
                                        ///////////////
                                        ///
                                        // ie, we should consider only 12:00 am txt files
                                        // ignore the first interval generated at the time 00:00
                                        // ie, we should consider only 12:00 pm txt files
                                        // these are only for the first day of the from date. 
                                        // if the difference of fromdate and today are more than 1 day, then we should consider the first intervval of the 2nd day also.

                                    }
                                    else if (intNoofHrsFromTime <= 480 && intNoofHrsToTime < 480)//0 to 480 min, 480 to 960, 960 to 1440
                                    {//if the above case is for different dates (from date & todates are different) then we need to consider
                                     //date[i]+"000000.txt", date[i]+"080000.txt",date[i]+"160000.txt" (i=0,1,2,3,..n)
                                     //and also date[i-1]+"000000.txt";
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                    }
                                    else if (intNoofHrsFromTime <= 480 && intNoofHrsToTime <= 480)//0 to 480 min, 480 to 960, 960 to 1440
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                    }
                                    else if (intNoofHrsFromTime < 480 && intNoofHrsToTime < 960)//0 to 480 min, 480 to 960, 960 to 1440
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                    }
                                    else if (intNoofHrsFromTime <= 480 && intNoofHrsToTime < 960)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                    }
                                    else if (intNoofHrsFromTime <= 480 && intNoofHrsToTime <= 960)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                    }
                                    else if (intNoofHrsFromTime < 480 && intNoofHrsToTime <= 1440)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                    }
                                    else if (intNoofHrsFromTime >= 480 && intNoofHrsToTime < 960)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        //we should consider 
                                    }
                                    else if (intNoofHrsFromTime >= 480 && intNoofHrsToTime <= 960)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                        //we should consider 
                                    }
                                    else if (intNoofHrsFromTime > 960 && intNoofHrsToTime <= 1440)
                                    {
                                        //we should consider 
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                    }
                                    else if (intNoofHrsFromTime >= 960 && intNoofHrsToTime <= 1440)
                                    {
                                        //we should consider 
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                    }
                                    //first case validation completed

                                    //second case validation started
                                    else if (intNoofHrsFromTime < 480 && intNoofHrsToTime < 960)
                                    {
                                    }
                                    else if (intNoofHrsFromTime < 480 && intNoofHrsToTime <= 960)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                    }
                                    else if (intNoofHrsFromTime <= 480 && intNoofHrsToTime <= 960)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                    }
                                    else if (intNoofHrsFromTime < 960 && intNoofHrsToTime <= 1440)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                    }

                                    //second case validation completed
                                    else if (intNoofHrsFromTime < 1440 && intNoofHrsToTime <= 1440)
                                    {
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                    }
                                    // }
                                    IList lstdates = dateAndTimes;
                                    for (int k = 0; k < lstdates.Count; k++)
                                    {
                                        txtFullName = TagName + "$" + lstdates[k].ToString();
                                        MatchedFileNamesList.Add(txtFullName);
                                        fullpath = FilePath + "\\" + txtFullName;
                                        #region reading txt file data into datatable
                                        using (FileStream stream = File.OpenRead(fullpath))
                                        {
                                            DataTable dt = new DataTable();
                                            using (StreamReader reader = new StreamReader(stream))
                                            {
                                                string line = reader.ReadLine();
                                                int i = 0;
                                                //if(!string.IsNullOrEmpty(line))                                
                                                while (line != null)
                                                {
                                                    if (i > 0)
                                                    {
                                                        line = line.Replace(",,", "");
                                                        if (i > 1)
                                                            line = line.Remove(0, 1);
                                                    }
                                                    string[] items = line.Split(',');
                                                    // Check if the number of items in the line is 
                                                    // greater than the current number of columns in the datatable.
                                                    if (items.Length > dt.Columns.Count)
                                                    {
                                                        if (!dt.Columns.Contains("timestamp"))
                                                        {
                                                            //dt.Columns.Add("slno");
                                                            //  dt.Columns.Add("plntloc");
                                                            //  dt.Columns.Add("pointname");
                                                            dt.Columns.Add("fvalue");
                                                            dt.Columns.Add("timestamp");
                                                            dt.Columns.Add("Quality");
                                                            dt.Columns.Add("pointname");
                                                        }

                                                    }
                                                    // Create new row
                                                    var newRow = dt.NewRow();
                                                    if (i == 0)
                                                    {
                                                        for (var j = 0; j < items.Length; j++)
                                                        {
                                                            newRow[j] = items[j];
                                                        }
                                                    }
                                                    else
                                                    {
                                                        // Loop thru the items and add them to the row one by one.
                                                        for (var j = 0; j < items.Length; j++)
                                                        {
                                                            newRow[j] = items[j];
                                                        }
                                                        newRow[3] = TagName.ToString();
                                                    }
                                                    i++;
                                                    //Add row to the datatable.
                                                    dt.Rows.Add(newRow);
                                                    line = reader.ReadLine();
                                                }
                                                // Bind datatable to the gridview.
                                                //dataGridView1.DataSource = dt;                                
                                                dsTxtFiledata.Tables.Add(dt);
                                                dt.Rows.RemoveAt(0);
                                                matchedFileCount++;
                                                dt1.Merge(dt);

                                            }
                                        }
                                        #endregion
                                    }
                                }
                                else if (FromDate != ToDate)
                                {
                                    //added new logic
                                    if (CurrentDate == FromDate)
                                    {
                                        List<string> dateAndTimes = new List<string>();
                                        CurrentDate = ConvertDateTime2(CurrentDate, "-").ToString();
                                        if (intNoofHrsFromTime <= 480)//0 to 480 min, 480 to 960, 960 to 1440
                                        {
                                            if (intNoofHrsToTime < 480)
                                            {
                                                //txtFullName = CurrentDate + " " + "000000.txt";
                                                dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                            }
                                            else if (intNoofHrsToTime == 480)
                                            {
                                                dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                            }
                                        }
                                        if (intNoofHrsFromTime > 480 && intNoofHrsFromTime <= 960)//0 to 480 min, 480 to 960, 960 to 1440
                                        {//if the above case is for different dates (from date & todates are different) then we need to consider
                                         //date[i]+"000000.txt", date[i]+"080000.txt",date[i]+"160000.txt" (i=0,1,2,3,..n)
                                         //and also date[i-1]+"000000.txt";
                                            if (intNoofHrsFromTime == 960)
                                            {
                                                dateAndTimes.Add(CurrentDate + " " + "080000.txt");//test one more time
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                            }
                                            else if (intNoofHrsFromTime < 960)
                                            {
                                                dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                            }
                                        }
                                        if (intNoofHrsFromTime > 960)
                                        {
                                            if (intNoofHrsFromTime < 1440)
                                            {
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                            }
                                            else if (intNoofHrsFromTime == 1440)
                                            {
                                                // dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                                DateTime PlusOneDt;
                                                PlusOneDt = DateTime.Parse(CurrentDate).AddDays(1);
                                                string PlusOneDate = Convert.ToString(PlusOneDt);//= ConvertDateTime2(dttxt, "-");
                                                dateAndTimes.Add(PlusOneDate + " " + "000000.txt");
                                            }
                                        }
                                        /*
                                        if (intNoofHrsFromTime >= 960 && intNoofHrsFromTime <= 1440)//0 to 480 min, 480 to 960, 960 to 1440
                                        {//if the above case is for different dates (from date & todates are different) then we need to consider
                                         //date[i]+"000000.txt", date[i]+"080000.txt",date[i]+"160000.txt" (i=0,1,2,3,..n)
                                         //and also date[i-1]+"000000.txt";
                                            dateAndTimes.Add(CurrentDate + " " + "160000.txt");                                        
                                            DateTime PlusOneDt;
                                            PlusOneDt = DateTime.Parse(CurrentDate).AddDays(1);
                                            string PlusOneDate = Convert.ToString(PlusOneDt);//= ConvertDateTime2(dttxt, "-");
                                            dateAndTimes.Add(PlusOneDate + " " + "000000.txt");
                                        }                                   
                                      if (intNoofHrsFromTime > 480 && intNoofHrsFromTime <=960 )//0 to 480 min, 480 to 960, 960 to 1440
                                      {//if the above case is for different dates (from date & todates are different) then we need to consider
                                       //date[i]+"000000.txt", date[i]+"080000.txt",date[i]+"160000.txt" (i=0,1,2,3,..n)
                                       //and also date[i-1]+"000000.txt";
                                       ////dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                      }

                                      if (intNoofHrsFromTime > 480 && intNoofHrsFromTime < 960)//0 to 480 min, 480 to 960, 960 to 1440
                                      {//if the above case is for different dates (from date & todates are different) then we need to consider
                                       //date[i]+"000000.txt", date[i]+"080000.txt",date[i]+"160000.txt" (i=0,1,2,3,..n)
                                       //and also date[i-1]+"000000.txt";
                                      dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                          ///dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                      }
                                      */
                                        dateAndTimesFinal = dateAndTimes;
                                        //dateAndTimes
                                    }
                                    else if (CurrentDate == ToDate)
                                    {
                                        List<string> dateAndTimes = new List<string>();
                                        CurrentDate = ConvertDateTime2(CurrentDate, "-").ToString();
                                        if (intNoofHrsToTime > 960)
                                        {
                                            if (intNoofHrsToTime <= 1440)
                                            {
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                                DateTime PlusOneDt;
                                                PlusOneDt = DateTime.Parse(CurrentDate).AddDays(1);
                                                string PlusOneDate = Convert.ToString(PlusOneDt).Substring(0, 10);//= ConvertDateTime2(dttxt, "-");
                                                dateAndTimes.Add(PlusOneDate + " " + "000000.txt");
                                            }
                                            if (intNoofHrsToTime < 1440)
                                            {
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                            }
                                        }
                                        if (intNoofHrsToTime > 480)
                                        {
                                           if (intNoofHrsToTime <= 960)
                                            {
                                                dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                                dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                            }
                                        }
                                        if (intNoofHrsToTime == 480)
                                        {
                                            dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                            dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        }
                                        if (intNoofHrsToTime < 480)
                                        {
                                            dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        }

                                        dateAndTimesFinal = dateAndTimes;
                                    }
                                    else
                                    {
                                        List<string> dateAndTimes = new List<string>();
                                        //entered into the condition when FromDate <=Today, executes upto currentdate < Todate
                                        //In this case, we need to read 3 txt files for the selected tagname
                                        CurrentDate = ConvertDateTime2(CurrentDate, "-").ToString();
                                        //txtFullName = CurrentDate + " " + "000000.txt";
                                        dateAndTimes.Add(CurrentDate + " " + "000000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "080000.txt");
                                        dateAndTimes.Add(CurrentDate + " " + "160000.txt");
                                        //  
                                        dateAndTimesFinal = dateAndTimes;
                                    }
                                    //ends new logic
                                }

                            }
                            //files reading logic
                            #region files reading logic for Todate
                            IList lst = dateAndTimesFinal;
                            for (int k = 0; k < lst.Count; k++)
                            {
                                txtFullName = TagName + "$" + lst[k].ToString();
                                MatchedFileNamesList.Add(txtFullName);
                                fullpath = FilePath + "\\" + txtFullName;
                                #region reading txt file data into datatable
                                using (FileStream stream = File.OpenRead(fullpath))
                                {
                                    DataTable dt = new DataTable();
                                    using (StreamReader reader = new StreamReader(stream))
                                    {
                                        string line = reader.ReadLine();
                                        int i = 0;
                                        //if(!string.IsNullOrEmpty(line))                                
                                        while (line != null)
                                        {
                                            if (i > 0)
                                            {
                                                line = line.Replace(",,", "");
                                                if (i > 1)
                                                    line = line.Remove(0, 1);
                                            }
                                            string[] items = line.Split(',');
                                            // Check if the number of items in the line is 
                                            // greater than the current number of columns in the datatable.
                                            if (items.Length > dt.Columns.Count)
                                            {
                                                if (!dt.Columns.Contains("timestamp"))
                                                {
                                                    //dt.Columns.Add("slno");
                                                    //  dt.Columns.Add("plntloc");
                                                    //  dt.Columns.Add("pointname");
                                                    dt.Columns.Add("fvalue");
                                                    dt.Columns.Add("timestamp");
                                                    dt.Columns.Add("Quality");
                                                    dt.Columns.Add("pointname");
                                                }

                                            }
                                            // Create new row
                                            var newRow = dt.NewRow();
                                            if (i == 0)
                                            {
                                                for (var j = 0; j < items.Length; j++)
                                                {
                                                    newRow[j] = items[j];
                                                }
                                            }
                                            else
                                            {
                                                // Loop thru the items and add them to the row one by one.
                                                for (var j = 0; j < items.Length; j++)
                                                {
                                                    newRow[j] = items[j];
                                                }
                                                newRow[3] = TagName.ToString();
                                            }
                                            i++;
                                            //Add row to the datatable.
                                            dt.Rows.Add(newRow);
                                            line = reader.ReadLine();
                                        }
                                        // Bind datatable to the gridview.
                                        //dataGridView1.DataSource = dt;                                
                                        dsTxtFiledata.Tables.Add(dt);
                                        dt.Rows.RemoveAt(0);
                                        matchedFileCount++;
                                        dt1.Merge(dt);

                                    }
                                }
                                #endregion
                            }
                            #endregion

                        }
                   
                }
                // int FromDatecheck = 12+intCharAt;
            }
            // txtFullName = ""; txtDate = ""; TagName = "";
            //dt1.Rows.RemoveAt(0);
            webdataLog = ConvertDataTable<Models.WebdataLog>(dt1);
            return webdataLog.ToList();
        }

        private DateTime[] GetDatesBetween(DateTime starting, DateTime ending)
        {
            List<DateTime> allDates = new List<DateTime>();
            for (DateTime date = starting; date <= ending; date = date.AddDays(1))
                allDates.Add(date);
            return allDates.ToArray();
        }

        private DataTable GetTagNames(string GroupName)
        {
            SqlConnection connection = new SqlConnection(conString);
            DataTable dtTagNames = new DataTable();
            try
            {
                connection.Open();
                string cmdTxt = "PR_GET_TAGNAMES_BY_GROUP";
                SqlCommand sqlCommand = new SqlCommand(cmdTxt, connection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@GroupName", GroupName));
                dtTagNames.Load(sqlCommand.ExecuteReader());
                connection.Close();
            }
            catch (Exception ex)
            {

            }
            return dtTagNames;
        }


        /// <summary>
        /// This function returns the tagnames for a specific pointname
        /// </summary>
        /// <returns></returns>
        private DataTable GetTagNameColors(string GroupName)
        {
            SqlConnection connection = new SqlConnection(conString);
            DataTable dtTagNameColors = new DataTable();
            try
            {
                connection.Open();
                string cmdTxt = "PR_GET_TAGNAMECOLORS_BY_GROUP";
                SqlCommand sqlCommand = new SqlCommand(cmdTxt, connection);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Parameters.Add(new SqlParameter("@GroupName", GroupName));
                dtTagNameColors.Load(sqlCommand.ExecuteReader());
                connection.Close();
            }
            catch (Exception ex)
            {

            }
            return dtTagNameColors;
        }

        /// <summary>
        /// Converts yyyy-mm-dd to dd-mm-yyyy
        /// </summary>
        /// <param name="TextDate"></param>
        /// <returns></returns>
        public string ConvertDateTime(string TextDate)
        {
            //CultureInfo newCulture = (CultureInfo)System.Threading.Thread.CurrentThread.CurrentCulture.Clone();
            //newCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
            //newCulture.DateTimeFormat.DateSeparator = "/";
            //Thread.CurrentThread.CurrentCulture = newCulture;
            DateTime date = new DateTime();
            if (TextDate != null && TextDate.Split('-').Length > 2)
            {
                int year = Convert.ToInt32(TextDate.Split('-')[0]);
                string month = Convert.ToString(TextDate.Split('-')[1]);
                string day = Convert.ToString(TextDate.Split('-')[2]);
                date = new DateTime(year, Convert.ToInt32(month), Convert.ToInt32(day));
                string dt;
                dt = day + "-" + month + "-" + year;
                //date = DateTime.ParseExact(dt, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                return dt;
            }
            return null;
        }
        public string ConvertDateTime(string TextDate, string Seperator)
        {
            //CultureInfo newCulture = (CultureInfo)System.Threading.Thread.CurrentThread.CurrentCulture.Clone();
            //newCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
            //newCulture.DateTimeFormat.DateSeparator = "/";
            //Thread.CurrentThread.CurrentCulture = newCulture;
            DateTime date = new DateTime();
            if (TextDate != null && TextDate.Split('-').Length > 2)
            {
                int year = Convert.ToInt32(TextDate.Split('-')[0]);
                string month = Convert.ToString(TextDate.Split('-')[1]);
                string day = Convert.ToString(TextDate.Split('-')[2]);
                date = new DateTime(year, Convert.ToInt32(month), Convert.ToInt32(day));
                string dt;
                dt = day + Seperator + month + Seperator + year;
                //date = DateTime.ParseExact(dt, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                return dt;
            }
            return null;
        }
        public string ConvertDateTime2(string TextDate, string Seperator)
        {
            //CultureInfo newCulture = (CultureInfo)System.Threading.Thread.CurrentThread.CurrentCulture.Clone();
            //newCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
            //newCulture.DateTimeFormat.DateSeparator = "/";
            //Thread.CurrentThread.CurrentCulture = newCulture;
            DateTime date = new DateTime();
            if (TextDate != null && TextDate.Split('-').Length > 2)
            {
                int year = Convert.ToInt32(TextDate.Split('-')[2]);
                string month = Convert.ToString(TextDate.Split('-')[1]);
                string day = Convert.ToString(TextDate.Split('-')[0]);
                date = new DateTime(year, Convert.ToInt32(month), Convert.ToInt32(day));
                string dt;
                dt = year + Seperator + month + Seperator + day;
                //date = DateTime.ParseExact(dt, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                return dt;
            }
            return null;
        }
        public string ConvertDateDDmmYYYY(string TextDate, string Seperator)
        {
            //CultureInfo newCulture = (CultureInfo)System.Threading.Thread.CurrentThread.CurrentCulture.Clone();
            //newCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
            //newCulture.DateTimeFormat.DateSeparator = "/";
            //Thread.CurrentThread.CurrentCulture = newCulture;
            DateTime date = new DateTime();
            if (TextDate != null && TextDate.Split('-').Length > 2)
            {
                int year = Convert.ToInt32(TextDate.Split('-')[2]);
                string month = Convert.ToString(TextDate.Split('-')[1]);
                string day = Convert.ToString(TextDate.Split('-')[0]);
                date = new DateTime(year, Convert.ToInt32(month), Convert.ToInt32(day));
                string dt;
                dt = day + Seperator + month + Seperator + year;
                //date = DateTime.ParseExact(dt, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                return dt;
            }
            return null;
        }

        /// <summary>
        /// Converts yyyy-mm-dd to dd-mm-yyyy
        /// </summary>
        /// <param name="TextDate"></param>
        /// <returns></returns>
        public string ConvertDateTime1(string TextDate)
        {
            //CultureInfo newCulture = (CultureInfo)System.Threading.Thread.CurrentThread.CurrentCulture.Clone();
            //newCulture.DateTimeFormat.ShortDatePattern = "dd/MM/yyyy";
            //newCulture.DateTimeFormat.DateSeparator = "/";
            //Thread.CurrentThread.CurrentCulture = newCulture;
            DateTime date = new DateTime();
            if (TextDate != null && TextDate.Split('/').Length > 2)
            {
                int year = Convert.ToInt32(TextDate.Split('/')[2]);
                string month = Convert.ToString(TextDate.Split('/')[1]);
                string day = Convert.ToString(TextDate.Split('/')[0]);
                string dt;
                dt = year + "-" + month + "-" + day;
                //date = DateTime.ParseExact(dt, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                return dt;
            }
            return null;
        }
        public IEnumerable<Models.WebdataLog> LoadDataa([FromBody] DateModel dateModel)
        {
            dateModel.FromDate = "";
            dateModel.ToDate = "";
            string fullpath = FilePath;// + "\\" + "TextFilesPackage_2021-07-13 18_50_22.txt";
            #region read multiple files
            //var files = Directory.GetFiles(path, "*.txt");
            //List<Sample> list = new List<Sample>();
            //string[] text;
            //foreach (var item in files)
            //{
            //    text = File.ReadAllLines(item);
            //    list.Add(new Sample { Name = text[1], Number = Convert.ToInt32(text[2].Replace("Length =", "")), Id = Convert.ToInt32(text[4]) });
            //}

            //foreach (var item in list)
            //{
            //    text = new string[] { item.Name, item.Number.ToString(), item.Id.ToString() };
            //    string result = string.Join(",", text) + Environment.NewLine;
            //    File.AppendAllText("D:\\sample\\total.txt", result);
            //}
            #endregion

            List<WebdataLog> webdataLog = new List<WebdataLog>();
            DataTable dt = new DataTable();
            using (FileStream stream = File.OpenRead(fullpath))
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    string line = reader.ReadLine();

                    while (line != null)
                    {
                        string[] items = line.Split(',');

                        // Check if the number of items in the line is 
                        // greater than the current number of columns in the datatable.
                        if (items.Length > dt.Columns.Count)
                        {
                            //Add new columns to the datatable.
                            //for (int i = dt.Columns.Count; i < items.Length; i++)
                            //{
                            //    dt.Columns.Add("column" + i);
                            //}
                            dt.Columns.Add("slno");
                            dt.Columns.Add("plntloc");
                            dt.Columns.Add("pointname");
                            dt.Columns.Add("fvalue");
                            dt.Columns.Add("timestamp");
                        }
                        // Create new row
                        var newRow = dt.NewRow();

                        // Loop thru the items and add them to the row one by one.
                        for (var j = 0; j < items.Length - 1; j++)
                        {
                            newRow[j] = items[j];
                        }

                        //Add row to the datatable.
                        dt.Rows.Add(newRow);
                        line = reader.ReadLine();
                    }
                    // Bind datatable to the gridview.
                    //dataGridView1.DataSource = dt;
                    dt.Rows.RemoveAt(0);
                    webdataLog = ConvertDataTable<Models.WebdataLog>(dt);
                }
            }

            return webdataLog.ToList();
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
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

    }
}
