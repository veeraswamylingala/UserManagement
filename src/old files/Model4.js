import React, { Component } from "react";
import {Link} from 'react-router-dom';
import XMLParser from "react-xml-parser";
import fs from 'fs';
import { Stage, Polyline, Shape,Layer, Rect,Ellipse, Text, Circle, Line,Group,Arc,label,Pipe, Label, } from 'react-konva';



class Model4 extends Component {
  constructor(props) {
    super(props);
   
      this.state = {};
     
      this.ShapesData=[]
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.onclick=this.onclick.bind(this);
   
  }
// onclick(){
//     alert("file uploaded sucessfully")
// }
// downloadEmployeeData = () => {
//   fetch('http://192.168.1.221/ScadaWebAPI/api/GroupwithTrendsTimestamp?GroupName=DAS_GRP2')
//     .then(response => {
//       response.blob().then(blob => {
//         let url = window.URL.createObjectURL(blob);
//         console.log(this.state.data)
//         let a = document.createElement('a');
//         a.href = url;
//         a.download = 'employees.jsx';
//         a.click();
//       });
//       //window.location.href = response.url;
//   });
// }








  handleSubmit(event) {
    event.preventDefault();

    const file = this.App.files[0];

    const reader = new FileReader();
    

    reader.readAsText(file);

    reader.onloadend = evt => {
      const readerData = evt.target.result;

      const parser = new DOMParser();
      const xml = parser.parseFromString(readerData, "text/xml");

      var XMLParser = require("react-xml-parser");
      var NewXml = new XMLParser().parseFromString(
        new XMLSerializer().serializeToString(xml.documentElement)
      ); 
      // let url = window.URL.createObjectURL(NewXml);
      //   //console.log(this.state.data)
      //   let a = document.getElementById('a');
      //   a.href = url;
      //   a.download = 'employees.jsx';
      //   a.click();
     
      // Assume xmlText contains the example XML
      //console.log("newxml", NewXml);

      this.setState({ xml });
      console.log(NewXml)
      this.ShapesData.push(NewXml)
      console.log(this.ShapesData)

    };
    //window.location.href = response.url;

  } 
//  onclick(){
//   this.LoadShapes();
//   LoadShapes()
//   {
//     var shapeData=ShapesData.hmipage.shapes.shape
//     this.shapesObjData.push(shapeData)
//     console.log(shapeData)
//     let ciData= ShapesData.hmipage.component_instances.map((ci=> ci))
//     this.shapesObjData.push(ciData.map(xx=>xx.shape))
//     //console.log(this.myRef.current)
//     // let cdData = ShapesData.hmipage.labels.map((cd=>cd))
//     // this.shapelabel.push(cdData.map(xy=>xy.shape))
//     // console.log(cdData)
//   }


  
  render() {
    return (
      <div className="App" style={{width:"60%", margin:"auto", borderStyle:"ridge", height:"500px"}}>
    <div>
        <p className="App-intro" style={{fontWeight:"bold", fontSize:"25px", marginTop:"25px", marginLeft:"200px"}}>
    Please Upload your XML file at the button below
        </p>

        <form onSubmit={this.handleSubmit}>
          <label style={{marginLeft:"270px", marginTop:"25px", fontSize:"17px"}}>
            Upload file:
            <input
              type="file"
              ref={input => {
                this.App = input;
              }}
            />
          </label>
          <br />
          <button className="btn btn-primary" type="submit" style={{marginTop:"25px",fontSize:"17px", marginLeft:"150px"}}>Submit</button>
          <div onClick='true'>
          <h1 style={{marginTop:"25px", fontSize:"20px", marginLeft:"180px"}}>please click below link to convert to Html</h1>
          <div style={{marginTop:"25px", marginLeft:"150px", fontSize:"17px"}}>
          <Link to='/Model2' onclick="myFunction()">Converted File</Link>
          </div>
          </div>
        </form>                                        
        </div>
     
        
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        


      </div>
      
    );
  }
}
export default Model4 ;