import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
//import "./App.css";

class Map extends React.Component{
   
    constructor(props){
        super(props);
         
        this.state={
            name: [],
            hintData:[],
            setHintData:[],
            text:"",
            setText :"",
           add:{
               UserID: '',
               Name:'',
               Date:'',
               ProjectName:'',
               Description:'',
               Task:'',
               Notes:'',
               Status:'',
           }
        };
        
    }
    componentDidMount(){
        this.getData()
    }
      getData = async () => {
        const res = await axios.get(
          "http://localhost/ScadaClient/api/userdetails"
        );
        //console.log(res);
        var hintArray = [];
        res.data.map((a) => hintArray.push(a.FirstName));
        this.setState({setHintData:hintArray});
            //console.log(this.state.setHintData)
      };
      
     
   
      
    
    changeHandler = e =>{
        const name=e.target.name;
        const value=e.target.value;

        this.setState({add:{
            ...this.state.add,
            [name]:value
        }});
    }

    onCreateProject = () =>{
       console.log(this.state.add);
    }
    

    render(){
       
        
        return(
            <body className="font-montserrat">
            <div>

<div id="main_content">

    <div className="page">

    <div className="section-body">
            
        <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item"> <a href="/Map" class="nav-link active show">Map User To Project</a></li>
            <li class="nav-item"> <a href="/Map"  class="nav-link active show">Map User To Projects LIst</a></li>
           

           
        </ul>
    </div>

    <div className="section-body">
 
     <div className="row clearfix">
         <div className="col-xl-12 col-lg-12">
             <div className="card" style={{}}> 
                 <div className="card-header">
                     <h3 className="card-title"  style = {{marginLeft:"350px",fontSize:"20px", fontWeight:"bold"}}>Map Users to Project</h3>
                 </div>
             </div>                
         </div>
   </div>  
</div> 
<div class="card-body" class="container" style={{maxWidth:'50%',marginLeft:"200px",background:'#2b3035',borderRadius:'10px',borderStyle:'outset'}}><br/>
<div class="row clearfix">
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Project Name:</label>
         <input type="text" name="Name" value={this.state.add.Name} onChange={this.changeHandler}></input>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>User:</label>
         <input type="text" name="Date" value={this.state.add.Date} onChange={this.changeHandler}/>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <label class="form-label" style={{color:"white"}}>User:
      <code>{`[${this.state.setHintData.toString()}]`}</code>
      <br />
      <br />
      <br />
      <Hint options={this.state.setHintData} allowTabFill>
        <input
          className="input-with-hint"
          value={this.state.text}
          onChange={(e) => (this.state.setText = e.target.value)}
        />
      </Hint>
     
        </label>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Discription:</label>s
         <input type="text" name="Name" value={this.state.add.Name} onChange={this.changeHandler} style={{width:"90%"}}></input>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Active status:</label>
         <input type="text" name="Date" value={this.state.add.Date} onChange={this.changeHandler}/>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Assign Date:</label>
         <input type="text" name="ProjectName" value={this.state.add.ProjectName} onChange={this.changeHandler}/>
     </div>
 </div>
 {/* <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>End Date:</label>
         <input type="date" name="Description" value={this.state.add.Description} onChange={this.changeHandler}/>
     </div>
 </div>



 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Description:</label>
         <input type="text" name="ProjectName" value={this.state.add.ProjectName} onChange={this.changeHandler}/>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Status:</label>
         <input type="text" name="Description" value={this.state.add.Description} onChange={this.changeHandler}/>
     </div>
 </div>
 */}
 

<div class="card-footer text-right" style={{marginLeft:'275px'}}>
<button className="btn btn-primary" style={{width:"150%"}} onClick={this.onCreateProject}> Save </button>
</div>
</div>
</div>
</div>  
</div>
</div>
</body>
        )
    }
}
export default Map;
const element=<Map></Map>
ReactDOM.render(element,document.getElementById("root"));