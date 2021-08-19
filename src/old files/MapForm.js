import React from 'react';
import {Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios" ;
import { Hint } from "react-autocomplete-hint";



class AddMap extends React.Component {
    constructor(props) {
      super(props);
    

      this.initialState = {
        
        UserDetails:[],
        UserData:[],
        ProjectrData:[],
        UserFullName:"",
        ProjectName:"",
        ProjectID:"",
        Description:"",
        UserID:[],
        RoleID:[],
        ActiveStatus: [],
        InsertedDate:new Date(),
        UserHintData:[],
        ProjectHintData:[],
        user:{},
            
        
         };
    

         

   
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  componentDidMount(){
    this.setState({
      //user: props.user[0]
  }, () => {
      //console.log(this.state.user)
  })
    this.getData();
    this.getProjectData();
}
  getData = async () => {
    const res = await axios.get(
      "http://localhost/ScadaClient/api/userdetail?userid=0"
    );
    this.setState({UserData:res.data})
    var hintArray = [];
    res.data.map((a) => hintArray.push(a.FirstName+" "+a.LastName) );
    console.log(hintArray)
    this.setState({
      UserHintData:hintArray
    })
    
  };
  
  getProjectData = async () => {
    const res = await axios.get(
      "http://localhost/ScadaClient/api/ProjectDetails"
    );
    //console.log(res);
    this.setState({ProjectrData:res.data})
    var hint  = [];
   
    res.data.map((b) =>hint.push(b.ProjectName));
    this.setState({
      ProjectHintData:hint
    })
    
    console.log(Array)
  
  };
 

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if(name  == "UserFullName")
    {
    
        this.state.UserData.map((user)=>{
            if( user.FirstName  == value)
        
            {
                console.log(user.UserID)
                this.setState({
                    UserID:user.UserID
                })
        
               
            }
    
          })

    }
    else if(name  == "ProjectName")
    {
    
        this.state.ProjectrData.map((user)=>{
            if( user.ProjectName  == value)
        
            {
                console.log(user.ProjectID)
                this.setState({
                    ProjectID :user.ProjectID
                })
        
               
            }
    
          })

    }

    this.setState({
      [name]: value
    })
  }
  handleChange1 = date => {
    console.log(date)
    this.setState({ 
       
        InsertedDate: date,
       
    });
}
handleVAlidations(){

                
  let validUser = false;
  let validProject = false;
  
  //Reporting Manager Validations 
if(this.state.UserFullName !== null)        
{
  this.state.UserData.map((user)=>{
      // var Users = user.FirstName+" "+user.LastName
       var value =this.state.UserFullName

   var rm = user.FirstName+" "+user.LastName ;

       console.log(rm)
       console.log(value)
      if(rm.toUpperCase() == value.toUpperCase())
      {
          console.log("rm validation Success")
          validUser = true;
      }
      //
    });
}
if(this.state.ProjectName !== null)        
{
   this.state.ProjectrData.map((user)=>{
       // var Users = user.FirstName+" "+user.LastName
        var value =this.state.ProjectName
     
        console.log(value)
       if(user.ProjectName.toUpperCase() == value.toUpperCase())
       {
           console.log("rm validation Success")
           validProject = true;
       }
       //
     });
}

////console.log(formIsValid)
return {validUser,validProject};

}   
handleSubmit(event) {
    event.preventDefault();
    var {validUser,validProject} = this.handleVAlidations();
    if(!validUser){
        alert("Not a Valid Username");
      }
      
      if(!validProject){
        alert("Not a Valid Project name");
      }
    
      if(validUser && validProject)
        {
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  } 
  
}


  onCreateProject = () =>{
    console.log(this.initialState);
 }
  
  render() {
    this.state.user.InsertedDate = new Date(this.state.user.InsertedDate) 
    var Assigndate = <DatePicker
        selected={this.state.user.InsertedDate}
        onChange={ this.handleChange1}
        dateFormat="MMMM d, yyyy"
        className="form-control"
        
        />

    return(
        <body className="font-montserrat">
        <div>
        
        
        <div id="main_content">
        
            <div className="page">
        
                    <div className="section-body">
         
             <div className="row clearfix">
                 <div className="col-xl-12 col-lg-12">
                     <div className="card" style={{}}> 
                         <div className="card-header">
                             <h3 className="card-title"  style = {{marginLeft:"220px", fontSize:"20px", fontWeight:"bold"}}>Update Project</h3>
                         </div>
                     </div>                
                 </div>
           </div>  
        </div> 
        <Form onSubmit={this.handleSubmit}>
        <div class="card-body" class="container" style={{maxWidth:'55%',marginLeft:"200px", background:'#2b3035', borderRadius:'10px', borderStyle:'outset'}}><br/>
        <div class="row clearfix">
        
        <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>User</label>
       
        
      
        {/* <Hint options={this.state.UserHintData} allowTabFil> */}
        <input
          className="input-with-hint"
          type="text" name="UserFullName" value={this.state.user.UserFullName} onChange={this.handleChange} 
        />
      {/* </Hint> */}
         
    
         
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Project Name:</label>
         {/* <Hint options={this.state.ProjectHintData} allowTabFil> */}
        <input
          className="input-with-hint"
          type="text" name="ProjectName" value={this.state.user.ProjectName} onChange
          ={this.handleChange}
          
        />
    {/* </Hint> */}

     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Designation</label>
         <select name="RoleID" 
         className="form-control"  style={{width:"50%"}} value={this.state.user.RoleID} onChange={this.handleChange}>
             <option value="1">Admin</option>
             <option value="2">Operator</option>  
           
         </select>
     </div>
 </div> 

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Discription:</label>
         <input type="text" size="30" 
         className="form-control"  name="Description" value={this.state.user.Description} onChange={this.handleChange}/>
        
     </div>
 </div>
 
 
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Assign Date</label>
 {Assigndate}
     </div>
 </div>
 

 
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <div  style={{color:"white"}}>
        <label class="form-label"> Status </label> 
         {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}
         <label>Active<input type="radio" value={this.state.ActiveStatus=true} checked={"true"} name="ActiveStatus" onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label> 
       <br/>
       <label>Inactive<input type="radio" value={this.state.ActiveStatus=false} checked={ "false"} name="ActiveStatus" onChange={this.handleChange}style={{marginLeft:"70px"}}/> </label>
       

     
     </div>
     </div>
 </div>




  
         <Form.Group>
      <div class="card-footer text-right" style={{}}>
<div class="row clearfix">
<div class="col-sm-6 col-md-6">
                <Form.Control type="hidden" name="id" value={this.state.ProjectID} />
                <Button variant="success" type="submit" style={{marginLeft:"150px",marginBottom:"100px"}}>Update</Button>
              </div>
              </div>
              </div>
              </Form.Group>
             
        </div>
        </div>
        </Form>
        </div>  
        </div>
        </div>
        </body>
    )
  }
}

export default AddMap;