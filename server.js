const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const fs = require("fs")
// add router in express app
app.use("/",router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',(req, res) => {
    console.log("baddepuri")
res.send("hey ECscada")
});

app.post('/Webreports',(req, res) => {
    let order = {...req.body}
    var path = "C:"+"/"+"ECWEBSERVER"+"/"+"webreports"+"/"+order["InputScript"]+"/"+order["data"]
   
    console.log(path);
    
        const directoryPath = path;
        fs.readdir(directoryPath, function (err, files) {
            const baseUrl = "file://laptop-tbjlciv2/daily/";
          if (err) {
            res.status(500).send({
              message: "Unable to scan files!",
            });
          }
          let fileInfos = [];
          files.forEach((file) => {
            fileInfos.push({
              name: file,
              url: baseUrl + file,
            });
          });
          res.status(200).send(fileInfos);
        });
});

app.listen(3000,() => {
console.log("Started on PORT 3000");
})