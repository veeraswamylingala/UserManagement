import React from 'react'
import {Form, Button,Container } from 'react-bootstrap';
import axios from "axios" ;
import { Hint } from "react-autocomplete-hint";
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import * as moment from 'moment';

 class EditUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        UserData:[],
        user:{},
        ProjectrData:[],
        UserFullName:"",
        ProjectName:"",
        ProjectID:"",
        Description:"",
        UserID:[],
        RoleID:[],
        ActiveStatus: false,
        InsertedDate:null,
        UserHintData:[],
        ProjectHintData:[],
        setHintData:[],
        setHintData1:[],
        ModifiedDate:null,
        AssignFrom:null,
        AssignTo:null,
        RMID:"",
        RMID1:"",
      };
   
   }

    componentDidMount(){
      this.setState({
        user:this.props.location.state
        
    }, () => {
      var user = this.state.user;
      user.ActiveStatus = user.ActiveStatus.toString();
      this.setState({
        user
      },()=>{
        console.log(this.state.user)
        console.log(this.state.user.ActiveStatus)
        console.log(this.state.user.UserMapID)
      })
    })
          
        this.getProjectData();
        this.getData();
    }




    getData = async () => {
      const res = await axios.get(
        "http://localhost/ScadaClient/api/userdetail?userid=0"
      );
      //console.log(res);
      var hintArray = [];
      var hintId=[];

      res.data.map((a) => hintArray.push(a.FirstName+" "+a.LastName)

      );
      res.data.map((a) =>hintId.push(a.UserID));
      this.setState({UserData:res.data})
      this.setState({setHintData:hintArray});
      this.setState({setHintId:hintId});
          console.log(this.state.setHintData)
    };
    getProjectData = async () => {
      const res = await axios.get(
        "http://localhost/ScadaClient/api/ProjectDetails"
      );
      //console.log(res);
      var hintArray = [];
      var hintId=[];

      res.data.map((a) => hintArray.push(a.ProjectName)

      );

      this.setState({ProjectrData:res.data})
      this.setState({setHintData1:hintArray});

          console.log(this.state.setHintData)
    };

    handleChange1 = date => {
      console.log(date)
      console.log(date)
      this.setState({user:{
          ...this.state.user,
          AssignFrom:date
      }});
  }

  handleChange2 = date => {
    console.log(date)
    console.log(date)
    this.setState({user:{
        ...this.state.user,
        AssignTo:date
    }});
}


    handleChange = event => {
      const name = event.target.name;
      const value = event.target.value;

      if(name == "ActiveStatus")
      {
          var user = {...this.state.user}
  
          if(event.target.value === "true" )
          {
            user.ActiveStatus = true;
          }else
          {
            user.ActiveStatus = false;
          }
  
        this.setState({
         user:user,
      },()=>{
        console.log(this.state.user.ActiveStatus);
      })
         
  
  
  
      }
  
      if(name  == "UserFullName")
      {
      
          this.state.UserData.map((user)=>{
              var Users = user.FirstName+" "+user.LastName

              if( Users.toUpperCase() == value.toUpperCase())
          
              {
                  console.log(user.UserID)
                  this.setState({user:{
                    ...this.state.user,
                    UserID:user.UserID,
                    
                }})
          
                 
              }
      
            })

      }
      else if(name  == "ProjectName")
      {
      
          this.state.ProjectrData.map((user)=>{
              if( user.ProjectName.toUpperCase()  == value.toUpperCase())
          
              {
                  console.log(user.ProjectID)
                  this.setState({user:{
                    ...this.state.user,
                    ProjectID:user.ProjectID,
                    
                }})
          
                 
              }
      
            })

      }






        this.setState({user:{
              ...this.state.user,
              [name]:value
          }});
  
        }
       
     handleClick = event => {
      //  this.setState({ username: event.target.value });
     };
     onClick(){
      window.location.href="ViewUser"
     }
     handleVAlidations(){

                
      let validUser = false;
      let validProject = false;
      
      //User Name Validations 
  if(this.state.user.UserFullName !== null)        
  {
      this.state.UserData.map((user)=>{
          // var Users = user.FirstName+" "+user.LastName
           var value =this.state.user.UserFullName
 
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
   if(this.state.user.ProjectName !== null)        
   {
       this.state.ProjectrData.map((user)=>{
           // var Users = user.FirstName+" "+user.LastName
            var value =this.state.user.ProjectName
         
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


     submitHandler = e =>{
      e.preventDefault()
      console.log(this.state.RMID)
      console.log(this.state.RMID1)
      
      this.setState({user:{
        ...this.state.user,
        
    }},()=>{
      
      
      console.log('Before Converting ')
    
              var {validUser,validProject} = this.handleVAlidations();
              if(!validUser){
                  alert("Not a Valid Username");
                }
                
                if(!validProject){
                  alert("Not a Valid Project name");
                }
              
                if(validUser && validProject)
                  {
      let apiUrl;
    
                    console.log(this.state.ProjectID)
      this.state.user.AssignFrom = moment(this.state.user.AssignFrom).format('MM/DD/YYYY');
      this.state.user.AssignTo = moment(this.state.user.AssignTo ).format('MM/DD/YYYY');
        apiUrl = 'http://localhost/ScadaClient/api/EdiMapUsersToProjects?UserMapID='+this.state.user.UserMapID+'&UserID='+this.state.user.UserID+'&ProjectID='+this.state.ProjectID+'&RoleID='+this.state.user.RoleID+'&Description='+this.state.user.Description+'&AssignedFrom='+this.state.user.AssignFrom+'&AssignedTo='+this.state.user.AssignTo+'&ActiveStatus='+this.state.user.ActiveStatus;
        console.log(apiUrl )

    //   const requestOptions = {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(this.state.user)
    // };

    fetch(apiUrl)
        .then(res => res.json())
        .then(result => {
          this.setState({
            response: result,
            isAddProduct: false,
            isEditProduct: false
          })
        },
        (error) => {
          this.setState({ error });
        }
        
      )
      //this.props.history.push('/MapUserlist') 
      }
    }) 
    }
   
    render() {

      //this.state = this.props.location.state;
      // Because `this.handleClick` is bound, we can use it as an event handler.
      //console.log(new Date())
      //console.log(this.state.user.AssignFrom)
      console.log(this.state.user.AssignFrom )
      console.log(this.state.user.AssignTo )
      this.state.user.AssignFrom = new Date(this.state.user.AssignFrom==undefined?"1999-01-01T00:00:00":this.state.user.AssignFrom)
  
    var Assigndate = <DatePicker
        className="form-control"
        wrapperClassName="datepicker" 
        selected={this.state.user.AssignFrom } 
        onChange={ this.handleChange1}  
        dateFormat="MMMM d, yyyy"
        className="form-control"
      
        />
     
        //console.log(this.state.user.AssignTo)
        this.state.user.AssignTo = new Date(this.state.user.AssignTo==undefined?"1999-01-01T00:00:00":this.state.user.AssignTo)
    var Assignto = <DatePicker
        className="form-control"
        wrapperClassName="datepicker" 
        selected={this.state.user.AssignTo}
        onChange={ this.handleChange2}
        dateFormat="MMMM d, yyyy"
        className="form-control"

        />
      return (
        
        <body className="font-montserrat">
        <div className="page">

        <div className="section-body">
                    
{/*                     
                      <ul class="nav nav-tabs page-header-tab">
                        <li class="nav-item"><Link to="/Map" class="nav-link inactive show">Map User To Project</Link></li>

                        <li class="nav-item"><Link to="/UserLIst" class="nav-link active show" >View </Link></li>

                      </ul> */}

                    </div>
                    <br/>
                    
               
                <Form onSubmit={this. submitHandler}>
        <div class="card-body" class="container"><br/>
        <div class="row clearfix">
    <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black" }}>User Name <span style={{fontWeight:"bold" ,color:"red"}} >*</span></label>
        <Hint   options={this.state.setHintData} allowTabFil>
        <input className="form-control" style={{width:"50%"}} type="text" name="UserFullName" value={this.state.user.UserFullName} onChange={this.handleChange}  />
      </Hint>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black" }}>Project Name<span style={{fontWeight:"bold" ,color:"red"}} >*</span></label>
         <Hint options={this.state.setHintData1} allowTabFil>
         <input type="text" size="30" name="ProjectName" style={{width:"50%"}}
                 className="form-control" 
                 value={this.state.user.ProjectName} onChange={this.handleChange}/>
    </Hint>

     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Designation</label>
         <select name="RoleID" className="form-control" 
         className="form-control"  style={{width:"50%"}} value={this.state.user.RoleID} onChange={this.handleChange}>
             <option value="1">Admin</option>
             <option value="2">Operator</option>

         </select>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{}}>
         <label class="form-label" style={{color:"black"}}>Discription</label>
         <input type="text" className="form-control"  size="30" style={{width:"50%"}}
         className="form-control"  name="Description" value={this.state.user.Description} onChange={this.handleChange}/>

     </div>
 </div>
 

     <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Assign From</label>
 {Assigndate}
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" >
         <label class="form-label" style={{color:"black"}}>Assign To</label>
 {Assignto}

     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <div >
     <label class="form-label" style={{color:"black"}}>Status</label>
     <label>Active<input type="radio"  name="ActiveStatus"
                  value={"true"}
              checked={this.state.user.ActiveStatus === "true"}  onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label>
       <br/> 
        <label>In Active<input type="radio"   value={"false"}
              checked={this.state.user.ActiveStatus === "false"} name="ActiveStatus" onChange={this.handleChange}style={{marginLeft:"60px"}}/> </label>
        

     </div>
     </div>
 </div>
 <div className="center">
 
 <button className="btn btn-primary" type="submit" style={{textAlign:"center", width: "9%",marginRight:"50px",marginTop:"3px",background:"blue"}} onClick={this.onCreateProject}> Update</button>

 <Link to="UserList"><button className="btn btn-primary" style={{width: "8%",height:"58%" ,marginRight:"50px",background:"blue"}} onClick={this.onClick} >Back</button></Link>

 <br/>
 <br/>


 </div>

            </div>
            </div>

        </Form>


        </div>
</body>
      );
    }
  }
  export default EditUser;
