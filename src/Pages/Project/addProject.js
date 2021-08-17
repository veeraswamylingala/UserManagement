import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios" ; 
import "./styles.css";
import * as moment from 'moment';

class addProject extends React.Component{
    constructor(props){
        super(props);
        this.state={
            UserDetails:[],
            ProjectData:[],
                add:{
                    
                    ActiveStatus:"",
                    EndDate: null,
                    InsertedBy: "1",
                    InsertedDate: "",
                    Location: "",
                    ModifiedBy: "1",
                    ModifiedDate: "",
                    ProjectCode: "",
                    ProjectDesc: "", 
                    ProjectName: "",
                    ProjectValue: "",
                    StartDate: null,
                }
             };
     
    }
    componentDidMount(){
        this.getData()
    }
      getData = async () => {
        const res = await axios.get(
          "http://localhost/ScadaWebApi/api/projectdetail?projectid=0"
        );
        
        this.setState({ProjectData:res.data})
        
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
   
    handleChange = date => {
        console.log(date)
        this.setState({add:{
            ...this.state.add,
    StartDate:date
        }});
        }
        handleChange1 = date => {
            console.log(date)
            this.setState({add:{
                ...this.state.add,
                EndDate:date
            }});
            }
        
        
                handleVAlidations(){

                    let validProject = true;
                    
                    let validCode=true;
                   
               
                 //Project Name Validation
                 if(this.state.add.ProjectName !== null)
                 {
                     console.log(this.state.add.UserName) 
                     this.state.ProjectData.map((user)=>{    
                         console.log("Verify User")
                         if (user.ProjectName.toUpperCase() == this.state.add.ProjectName.toUpperCase())
                         {
                            validProject = false
                       
                         }                
                     })        
                 }
            
                 // Project code Validation
            
                 if(this.state.add.ProjectCode !== null)
                 {
                     console.log(this.state.add.ProjectCode) 
                     this.state.ProjectData.map((user)=>{    
                         console.log("Verify Empcode")
                         if (user.ProjectCode.toUpperCase() == this.state.add.ProjectCode.toUpperCase())
                         {
                            validCode = false
                       
                         }                
                     })        
                 }
                
                
            
                 ////console.log(formIsValid)
                 return {validProject,validCode};
            
                  }      
                
            
            
            
                submitHandler = e =>{
                    e.preventDefault()
                    console.log('Before Converting ')
                    console.log(this.state.add)
                   
            
                    var {validProject,validCode} = this.handleVAlidations();

                  
                              if(!validProject){
                                alert("Project Name should be Unique");
                              }  
                              if(!validCode) {
                                //$(".spassword_error").show();
                                    
                                alert("Project Code should be Unique")
                                
                                }
                              
                              if(validProject&validCode)
                                {
                                    console.log(this.state.add)
                   const apiUrl = 'http://localhost/ScadaWebApi/api/projectdetail?projectid=0';
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(this.state.add)
                    };
                    
                    fetch(apiUrl, requestOptions)
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                          this.setState({
                            response: result,
                            
                          })
                        },
                        (error) => {
                          this.setState({ error });
                        }
                      )
                      this.props.history.push('/viewProject') 
                    }
                }

      setGender(event) {
    //console.log(event.target.value);

  }

  setStatus(event) {
    //console.log(event.target.value);
  }

    onCreateProject = () =>{
       console.log(this.state.add);
    }




    render(){
        return(
            <body className="font-montserrat">
<div>


<div>

    <div className="page">

    <div className="section-body">
            
           
            <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item"><Link to="/AddProject" class="nav-link active show">Add Project</Link></li>

            <li class="nav-item"><Link to="/ViewProject" class="nav-link inactive show" >View Projects</Link></li>
        </ul>
     
      
</div>


{/* <div className='center'>
         <h3 className="card-title"  style = {{fontSize:"20px", fontWeight:"bold"}}>Add Project</h3>

</div>   */}
<form onSubmit={this.submitHandler} >
<div class="card-body" class="container"   style={{}}><br/>
<div class="row clearfix">
<div class="col-sm-6 col-md-6" >
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Project Name <span style={{fontWeight:"bold" ,color:"red"}} >*</span></label>
         <input type="text"style={{width:"50%"}} size="30" name="ProjectName" 
         
         
         className="form-control" 
         value={this.state.add.ProjectName} onChange={this.changeHandler}/>
         
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Project Code <span style={{fontWeight:"bold" ,color:"red"}} >*</span></label>
         <input type="text" size="30" style={{width:"50%"}}
         className="form-control"  name="ProjectCode" value={this.state.add.ProjectCode} onChange={this.changeHandler}/>
        
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Project Description</label>
         <textarea type="text" required style={{width:"50%"}}
         className="form-control"  rows="2" cols="50" name="ProjectDesc" value={this.state.add.ProjectDesc} onChange={this.changeHandler}/>
 
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Project Value</label>
         <input type="text" required style={{width:"50%"}}
         className="form-control"  rows="2" cols="50" name="ProjectValue" value={this.state.add.ProjectValue} onChange={this.changeHandler}/>
 
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group">
         <label class="form-label" style={{color:"black"}}>Start Date</label>
         <DatePicker
        wrapperClassName="datepicker" 
        selected={ this.state.add.StartDate }
        onChange={ this.handleChange }
        dateFormat="MMMM d, yyyy"
        className="form-control"

/>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>End Date</label>
         <DatePicker
        wrapperClassName="datepicker" 
        selected={ this.state.add.EndDate }
        onChange={ this.handleChange1 }
        dateFormat="MMMM d, yyyy"
        className="form-control"
        />
     </div>
 </div>
<div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Location</label>
         <textarea type="text" required style={{width:"50%"}}
         className="form-control"  rows="2" cols="50" name="Location" value={this.state.add.Location} onChange={this.changeHandler}/>
 
     </div>
 </div>
 
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <div onChange={this.setStatus.bind(this)}  style={{color:"black"}}>
        <label class="form-label"> Status </label> 
         {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}
          
       <label>Active<input type="radio" value={this.state.ActiveStatus=true} name="ActiveStatus"   onChange={this.changeHandler} style={{marginLeft:"80px"}}/> </label> 
       

     
     </div>
     </div>
 </div>

 
 

    <div className="center">
    <button className="btn btn-primary" type="submit" style={{width: "10%",marginRight:"50px",marginTop:"3px",background:"blue"}} onClick={this.onCreateProject}> Save</button>

    <Link to={{pathname:'./Viewproject'}}> <button className="btn btn-primary" style={{width: "11%",height:"70%",marginRight:"50px",background:"blue"}} >Back</button></Link>
</div>
<br/>
 <br/>
 
</div>
</div>
</form>
</div>  
</div>
</div>
</body>
        )
    }
}
export default addProject;
const element=<addProject></addProject>
ReactDOM.render(element,document.getElementById("root"));