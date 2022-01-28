

var config = require('./dbconfig');
const sql = require('mssql');



async function getOrders() {

    var fs = require("fs")

    let pool = await sql.connect(config);
    //console.log(pool)
    
    let Tagname1 = await pool.request().query("SELECT pointname from webdata_log GROUP BY pointname")
   // console.log(Tagname1.recordsets)

     const  Tagname = []
     Tagname1.recordsets.map((a=>{
        Tagname.push(a)
    }))
   //console.log(Tagname[0].length)
   // console.log(Tagname[0])
    

    var filePath = "D:/unical/DynamicFlatFiles/OutputFolder/"

    // fs.writeFile('data.text', JSON.stringify(fileData), (err) => {

    //     // In case of a error throw err.
    //     if (err) throw err;
    // })
    
    var fs = require('fs');
    const moment = require('moment');
    var time = moment ( new Date()).format("YYYY-MM-DD HHmmss").toString()
   " DTms_0010$2022-01-07 154105.108000000"
   
   // console.log("2022-01-07 154105")
   // console.log(time)

            
                    for (let i = 0; i < Tagname[0].length; i++) {

                        let products = await pool.request().query(`select slno,plntloc,pointname,fvalue,timestamp from webdata_log where pointname ='${Tagname[0][i].pointname}'`);
                       // console.log("finding the length of the ")
                    
                        var temp = products.recordsets
                       // console.log(temp)
                    
            
                           let fileData = [] 
                        temp.map((a)=>{
                            fileData.push(a)
                        })
                  console.log(fileData[0].length)
                  var mydata = []
                 
                  fileData[0].map((a)=>{
                      mydata.push(a.slno,a.plntloc,a.pointname,a.fvalue,moment (a.timestamp).format("YYYY-MM-DD HHmmss"),"}");
                  })
                    var mydata1 = mydata.toString()
                   
                  
                    var mydata2 = mydata1.split("},")
                    var mydata3 = mydata1.split(",}")
                   

                  //console.log(mydata2)
        
                    

                
                    if(fileData.length > 0 ){
                    fs.open(filePath+Tagname[0][i].pointname+'$'+time+'.txt', 'w', function (err, file) {
                        if (err) throw err;
                //         fs.writeFile(filePath+Tagname[0][i].pointname+'$'+time+'.txt',JSON.stringify(mydata) + '\n' , (err) => {
            
                //     // In case of a error throw err.
                //     if (err) throw err;
                // })
                var logger = fs.createWriteStream(filePath+Tagname[0][i].pointname+'$'+time+'.txt', {
                    flags: 'a' // 'a' means appending (old data will be preserved)
                  })
                  var writeLine = (line) => logger.write(`\n${line}`);
                  console.log('Saved!');
                  console.log(mydata3);
                  writeLine(mydata3);
                        
                     });
                }
            
                }
        

            ////////////.......................///
    //     fs.open(filePath+temp+'.txt', 'w', function (err, file) {
    //         if (err) throw err;
    //         fs.writeFile(filePath+temp+'.txt', fileData, (err) => {

    //     // In case of a error throw err.
    //     if (err) throw err;
    // })

    //         console.log('Saved!');
    //     });
        
    return Tagname1.recordsets;


}

module.exports = {
    getOrders: getOrders,

}