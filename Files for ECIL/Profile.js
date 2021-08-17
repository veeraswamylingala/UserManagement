import React from 'react';
import {Form, Button } from 'react-bootstrap';
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";  
import * as moment from 'moment';



import {Link} from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      UserID: '',
      HintData:[],
      FirstName:'',
      LastName:'',
      EmpCode:'',
      DOB:null,
      Department:'',
      ReportingManager:'',
      ReportingManagerID:'',
      Username:'',
      Password:'',
      DateofJoining:null, 
      DateOfReliving:null,           
      Mobile:'',
      AlternatePhone:'',
      Gender:'',  
      Address:'',
      EmailID:'',
      ActiveStatus:'',
      RoleID:'',
      data:[],
      
    }

  

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount(){
    axios.get(
        "http://localhost/ScadaClient/api/userdetail?userid=0"
      ).then((val)=>{
     
          this.setState({
            data:val.data[0]
        }, () => {
            var data = this.state.data;
            data.ActiveStatus = data.ActiveStatus==null?"true":data.ActiveStatus.toString();
            this.setState({
                data
            },()=>{
              console.log(this.state.data)
              console.log(this.state.data.ActiveStatus)
            })
          })
      });
      this.getData();
}
getData = async () => {
    const res = await axios.get(
      "http://localhost/ScadaClient/api/userdetail?userid=0"
    );
    //console.log(res);
    var hintArray = [];
    res.data.map((a) => hintArray.push(a.FirstName+" "+a.LastName)

    );
    this.setState({HintData:hintArray});
    this.setState({UserData:res.data})
  };


  handleChange(event) {
    
    const name = event.target.name;
    const value = event.target.value;
    console.log(this.state.UserData)
     if(name  == "ReportingManager")
        {
            this.state.UserData.map((user)=>{
                var Users = user.FirstName+" "+user.LastName

                if( Users.toUpperCase() == value.toUpperCase())
                {
                    console.log(user.UserID)
                   
                    this.setState({data:{
                        ...this.state.data,
                        ReportingManagerID:user.UserID
                    }});
                   
                }
        
              })

        }
        if(name == "Gender")
        {

            this.setState({data:{
                ...this.state.data,
                Gender: event.target.value
            }},()=>{
                console.log(this.state.Gender);
              });
         
      
        }
        
        if(name == "ActiveStatus")
        {

          console.log(event.target.value)
          
          this.setState({data:{
            ...this.state.data,
            ActiveStatus: event.target.value
        }},()=>{
            console.log(this.state.Gender);
          });
      
        }  
    this.setState({
      [name]: value
    })
    
    this.setState({data:{
        ...this.state.data,
        [name]: value
    }},()=>{
        console.log(this.state.data);
      });
  }

  handleVAlidations(){

    //let validUser = true;
    let validRM = false;
    // let validEmp=true;
    // let boolPasswordError = true;
    // console.log(".....................")
    // console.log(this.state.ReportingManager)
    // console.log(this.state.UserName)
    // console.log(this.state.EmpCode)

    //Reporting Manager Validations 
if(this.state.data.ReportingManager !== null)        
{
    console.log(this.state.UserData)
    var temp =this.state.UserData
    this.state.UserData.map((user)=>{
        console.log(user)
        // var Users = user.FirstName+" "+user.LastName
         var value =this.state.data.ReportingManager

     var rm = user.FirstName+" "+user.LastName ;

         console.log(rm)
         console.log(value)
        if(rm.toUpperCase() == value.toUpperCase())
        {
            console.log("rm validation Success")
            validRM = true;
        }
        //
      });
 }
 
 ////console.log(formIsValid)
 return {validRM};

  } 


  handleSubmit(event) {
    event.preventDefault();
    var {validRM} = this.handleVAlidations();
    console.log('Before Converting ')
    
    var s  = this.state.data
    const convertedDOB = moment(s.DOB).format('MM/DD/YYYY');
            s.DOB = convertedDOB.toString();
            const convertedDate = moment(s.DateofJoining).format('MM/DD/YYYY');
            s.DateofJoining = convertedDate.toString()
            this.setState({
                s
            },()=>{
                console.log('after Converting ')
                console.log(this.state)
            })
    
      
      if(!validRM){
        alert("Not a Valid Reporting Manager");
      }
  
  
      if(validRM)
        {
          console.log(this.state.data)
          let apiUrl;

    
          apiUrl = 'http://localhost/ScadaClient/api/Updateuserdetails';
        
          
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state.data)
      };
      
      fetch(apiUrl, requestOptions)
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
            //this.props.history.push('/ViewUser')
            //window.location.reload();
  }
}



  setGender(event) {
    console.log(event.target.value);

  }
  handleChange1 = DateofRelieving => {
    console.log('onchange called....')
  console.log(DateofRelieving)
  this.setState({data:{
    ...this.state.data,
    DateofRelieving:DateofRelieving 
}});

  }
  handleChange2 = DateofJoining => {
      console.log('onchange called....')
  
  
    console.log(DateofJoining)
    this.setState({data:{
        ...this.state.data,
        DateofJoining:DateofJoining
    }});
    }
    handleChange3 = DOB => {
      console.log('onchange called....')
  
  
    console.log(DOB)
    this.setState({data:{
        ...this.state.data,
        DOB:DOB
    }});
    }
    onClick(){
        window.location.reload()
    }
  render() {
console.log(this.state.FirstName)
 this.state.data.DateofRelieving = new Date(this.state.data.DateofRelieving==undefined?"1999-01-01T00:00:00":this.state.data.DateofRelieving)
     //console.log(new Date(this.state.DateofRelieving))
     //console.log(this.state.DateofRelieving)
    var DateofRelieving =   <DatePicker
    time={false}  dateFormat="MMMM d, yyyy"
    onChange={this.handleChange1} 
    selected={this.state.data.DateofRelieving}
    className="form-control"/>

this.state.data.DateofJoining = new Date(this.state.data.DateofJoining==undefined?"1999-01-01T00:00:00":this.state.data.DateofJoining) 
           var DateofJoining = <DatePicker
               selected={this.state.data.DateofJoining}
               onChange={ this.handleChange2 }
               dateFormat="MMMM d, yyyy"
               className="form-control"/>

this.state.data.DOB = new Date(this.state.data.DOB==undefined?"1999-01-01T00:00:00":this.state.data.DOB) 
           var DOB = <DatePicker
               selected={this.state.data.DOB}
               onChange={ this.handleChange3 }
               dateFormat="MMMM d, yyyy"
               className="form-control"
               
               />    
    return(

    <body className="font-montserrat">
          <div id="main_content">

<div className="page" >
{/*     
<div className="center">
         <h3 className="card-title"  style = {{fontSize:"20px", fontWeight:"bold"}}>Update User</h3>
         <br/>
        </div> */}
            <Form onSubmit={this.handleSubmit}>
            <div class="card-body" class="container"><br/>
            <div class="row clearfix">
            <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>First Name</label>
         <input type="text" size="30" name="FirstName" style={{width:"50%"}}
         className="form-control" placeholder="FirsttName"
         value={this.state.data.FirstName==""?"":this.state.data.FirstName} onChange={this.handleChange}/>
         
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group"  style={{marginLeft:"30px"}}
     >
         <label class="form-label" style={{color:"black"}}>Last Name</label>
         <input type="text" size="30" style={{width:"50%"}} required onChange={this.handleChange}
         className="form-control"  name="LastName" value={this.state.data.LastName} onChange={this.handleChange}/>
        
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:'black'}}>Employee Code</label>
         <input type="text" size="30"  style={{width:"50%"}}
         className="form-control" disabled name="EmpCode" value={this.state.data.EmpCode} onChange={this.handleChange}/> 
            
     </div>
 </div>
 
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Designation</label>
         <select name="RoleID" 
         className="form-control"  style={{width:"50%"}} value={this.state.data.RoleID} onChange={this.handleChange}>
             <option value="1">Admin</option>
             <option value="2">Operator</option>  
           
         </select>
     </div>
 </div> 
 {/* <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Desigination</label>
         <input type="text" name="Role" value={this.state.Role} onChange={this.changeHandler}/> 
     </div>
 </div> */}
<div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <div  style={{color:"black"}}>
         <label class="form-label" >Gender</label>
         <label>Male<input type="radio"  name="Gender"
                  value="Male"
              checked={this.state.data.Gender === "Male"}  onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label>
       <br/> 
        <label>Female<input type="radio"   value="Female"
              checked={this.state.data.Gender === "Female"} name="Gender" onChange={this.handleChange}style={{marginLeft:"60px"}}/> </label>
        

     </div>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
 <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Date of Birth</label>
         {/* <input type="date" min='1960-01-01' id="dt" required onChange={this.handleChange}
         className="form-control"  name="DOB" value={this.state.DOB} onChange={this.handleChange}/> 
     */}
     {DOB}
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Mobile Number</label>
         <input type="text" required onChange={this.handleChange} style={{width: "50%"}}
         className="form-control" size="10" name="Mobile" value={this.state.data.Mobile} onChange={this.handleChange}/> 
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Extn. No</label>
         <input type="text" required onChange={this.handleChange} style={{width: "50%"}}
         className="form-control" size="10" name="AlternatePhone" value={this.state.data.AlternatePhone} onChange={this.handleChange}/> 
     
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Department</label>
         <input type="text" required onChange={this.handleChange} style={{width: "50%"}}
         className="form-control"  size="30" name="Department" value={this.state.data.Department} onChange={this.handleChange}/>
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Reporting Manager</label>
         {/* <input type="text" 
         className="form-control"  size="30" name="ReportingManager" value={this.state.add.ReportingManager} onChange={this.changeHandler}/> 
      */}
      {/* <code>{`[${this.state.setHintData.toString()}]`}</code> */}
         <Hint options={this.state.HintData!=null?this.state.HintData:[]} allowDropDown>  
        <input style={{width: "50%"}}
          type="text" name="ReportingManager" value={this.state.data.ReportingManager} onChange
          ={this.handleChange}
          
        />
       </Hint>  
     </div>
 </div>
  {/* <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>ReportingManagerId</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control"  size="10" name="ReportingManagerID" value={this.state.ReportingManagerID} onChange={this.handleChange}/> 
     
     </div>
 </div> * */}

 <div class="col-sm-6 col-md-6">
 <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Username</label>
         <input type="text" required onChange={this.handleChange} style={{width: "50%"}}
         className="form-control" disabled  size="30" name="Username" value={this.state.data.Username}onChange={this.handleChange}/> 
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Password</label>
         <input type="text" style={{width: "50%"}} name="Password" disabled required minLength={8} maxLength={20}
                    onChange={this.handleChange}
                    className="form-control" value={this.state.data.Password} type="Password" onChange={this.handleChange}/> 
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Email ID</label>
         <input type="email" required onChange={this.handleChange} style={{width: "50%"}}
         className="form-control"  name="EmailID" value={this.state.data.EmailID} onChange={this.handleChange}/> 
     
     </div>
 </div>
 
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{color:"black",marginLeft:"30px"}}>
     <div >
     <label>Active<input type="radio"  name="ActiveStatus"
                  value="true"
              checked={this.state.data.ActiveStatus === "true"}  onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label>
       <br/> 
        <label>In Active<input type="radio"   value="false"
              checked={this.state.data.ActiveStatus === "false"} name="ActiveStatus" onChange={this.handleChange}style={{marginLeft:"65px"}}/> </label>
        

     </div>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Date of Joining</label>
         {DateofJoining}
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Date of Relieving</label>
         {DateofRelieving}
     </div>
 </div>
<div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Address</label>
         <textarea type="text" required onChange={this.handleChange} style={{width: "50%"}}
         className="form-control"  rows="2" cols="50" name="Address" value={this.state.data.Address} onChange={this.handleChange}/>
 
     </div>
 </div>
             <br/> 
             

      <Form.Group>
     
<div class="row clearfix">
<div  className='center'>
                <Form.Control type="hidden" name="id" value={this.state.UserID} />
                <button className="btn btn-primary" type="submit" style={{width: "9%",marginRight:"50px",marginTop:"3px",background:"blue"}} onClick={this.onCreateProject}> Update</button>

                <Link to="Viewuser"><button className="btn btn-primary" style={{width: "8%",height:"92%" ,marginRight:"50px",background:"blue"}} onClick={this.onClick} >Back</button></Link>

              </div>
              </div>
              </Form.Group>
            </div>
            </div>
            </Form>
         
        </div>
        </div>
        </body>
    
    )
  }
}

export default Profile;