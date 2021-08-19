import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { FormWithConstraints,FieldFeedbacks,
    FieldFeedback } from 'react-form-with-constraints';




class addUser extends React.Component{


    constructor(props){
        super(props);
        this.state={
            UserDetails:[],
           add:{
               FirstName:'',
               LastName:'',
               EmployeeCode:'',
               DOB:'',
               Department:'',
               ReportingManager:'',
               ReportingManagerId:'',
               UserName:'',
               Password:'',
               DateOfJoining:'',
               DateOfReliving:'',            
               MobileNumber:[],
               AlternativeNumber:[],
               Gender:'',  
               Address:'',
               Emailid:'',
               Status:'',
               Role:'',
              
           }
        };
    }

    //  componentDidMount() { 
    //     axios.get('http://183.82.4.93:5887/ECScadaTrends/api/userdetail?userid=0').then(response => {  
    //         console.log(response.data);  
    //         this.setState({  
    //             UserDetails: response.data  
    //         });  
    //         console.log(this.state.UserDetails); 
    //     });  
    // } 
    changeHandler = e =>{
        const name=e.target.name;
        const value=e.target.value;

        this.setState({add:{
            ...this.state.add,
            [name]:value
        }});
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state.add)
      //  axios.post('http://localhost/ScadaClient/api/userdetail?userid=0', this.state.add)

      //axios.get('http://localhost/ScadaClient/api/AddUser?FirstName='+this.state.add.FirstName+'&LastName='+this.state.add.LastName+'&EmpCode='+this.state.add.EmployeeCode+'&Gender=M&DOB='+this.state.add.DateOfJoining+'&Department='+this.state.add.Department+'&ReportingManager='+this.state.add.ReportingManager+'&ReportingManagerID='+this.state.add.ReportingManagerId+'&Mobile='+this.state.add.MobileNumber+'&AlternatePhone=996633&EmailID='+this.state.add.Emailid+'&Address='+this.state.add.Address+'&DateofJoining='+this.state.add.DateOfJoining+'&DateofRelieving='+this.state.add.DateOfReliving+'&RoleiD=2&ActiveStatus=true&Username='+this.state.add.UserName+'&Password='+this.state.add.Password)
             
               
      axios.get('http://localhost/ScadaClient/api/AddUser?FirstName='+this.state.add.FirstName+'&LastName='+this.state.add.LastName+'&EmpCode='+this.state.add.EmployeeCode+'&Gender='+this.state.add.Gender+'&DOB='+this.state.add.DateOfJoining+'&Department='+this.state.add.Department+'&ReportingManager='+this.state.add.ReportingManager+'&ReportingManagerID='+this.state.add.ReportingManagerId+'&Mobile='+this.state.add.MobileNumber+'&AlternatePhone='+this.state.add.AlternativeNumber+'&EmailID='+this.state.add.Emailid+'&Address='+this.state.add.Address+'&DateofJoining='+this.state.add.DateOfJoining+'&DateofRelieving='+this.state.add.DateOfReliving+'&RoleiD=2"&ActiveStatus='+this.state.add.Status+'&Username='+this.state.add.UserName+'&Password='+this.state.add.Password)
        .then(response => {
            console.log("user details")
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        console.log("user details")
    }

      setGender(event) {
    console.log(event.target.value);

  }

  setStatus(event) {
    console.log(event.target.value);
  }

    onCreateProject = () =>{
       console.log(this.state.add.add);
    }

 //handlei validation hear//
 
//  handleChange = e => {
//     this.form.validateFields(e.target);
//   }

//   contactSubmit = e => {
//     e.preventDefault();

//     this.form.validateFields();

//     if (!this.form.isValid()) {
//       console.log('form is invalid: do not submit');
//     } else {
//       console.log('form is valid: submit');
//     }
//   }



    render(){
        return(
            <body className="font-montserrat">
<div>


<div id="main_content">

    <div className="page">

<div className="section-body">
            
            <div className="row clearfix">
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                        <ul class="nav nav-tabs page-header-tab">
                        <li class="nav-item"><Link to="/addUser" class="nav-link active show">Add User</Link></li>

                        <li class="nav-item"><Link to="/viewUser" class="nav-link active show" style={{}}>View User</Link></li>
                    
                 
                       {/* <li class="nav-item"><Link to="/updateUser" class="nav-link active show" style={{}}>Update User</Link></li>
                     */}
                    </ul>
                          
                            {/* <div className="card-options">
                            
                                <button className="btn btn-sm btn-outline-secondary mr-1" id="one_month">1M</button>
                                <button className="btn btn-sm btn-outline-secondary mr-1" id="six_months">6M</button>
                                <button className="btn btn-sm btn-outline-secondary mr-1" id="one_year" class="active">1Y</button>
                                <button className="btn btn-sm btn-outline-secondary mr-1" id="ytd">YTD</button>
                                <button className="btn btn-sm btn-outline-secondary" id="all">ALL</button>
                            </div> */}
                        </div>
                     
                    </div>                
                </div>
          </div> 
          </div>

            <div className="section-body">
 
     <div className="row clearfix">
         <div className="col-xl-12 col-lg-12">
             <div className="card" style={{}}> 
                 <div className="card-header">
                     <h3 className="card-title"  style = {{marginLeft:"380px", fontSize:"20px", fontWeight:"bold"}}>Add User</h3>
                 </div>
             </div>                
         </div>
   </div>  
</div> 
<form onSubmit={this.submitHandler}>
<div class="card-body" class="container" style={{maxWidth:'55%',marginLeft:"200px", background:'#2b3035', borderRadius:'10px', borderStyle:'outset'}}><br/>
<div class="row clearfix">
<div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>First Name:</label>
         <input type="text" size="30" name="FirstName" 
         
         required onChange={this.handleChange}
         className="form-control" 
         value={this.state.add.FirstName} onChange={this.changeHandler}/>
         
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Last Name:</label>
         <input type="text" size="30" required onChange={this.handleChange}
         className="form-control"  name="LastName" value={this.state.add.LastName} onChange={this.changeHandler}/>
        
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Employee Code</label>
         <input type="text" size="10"  required onChange={this.handleChange}
         className="form-control"  name="EmployeeCode" value={this.state.add.EmployeeCode} onChange={this.changeHandler}/> 
            
     </div>
 </div>
  <div class="col-sm-6 col-md-4">
     <div class="form-group" style={{marginLeft:"72px"}}>
         <label class="form-label" style={{color:"white"}}>Desigination:</label>
         <select name="Salutation" required onChange={this.handleChange}
         className="form-control"  style={{width:"50%"}} value={this.state.add.Salutation} onChange={this.changeHandler}>
             <option>Admin</option>
             <option>Operator</option>  
           
         </select>
         
     </div>
 </div> 
 {/* <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Desigination</label>
         <input type="text" name="Role" value={this.state.add.Role} onChange={this.changeHandler}/> 
     </div>
 </div> */}
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <div onChange={this.setGender.bind(this)} style={{color:"white"}}>
         <label class="form-label" >Gender</label>
         {/* <input type="text" name="Gender" value={this.state.add.Gender} onChange={this.changeHandler}/> */}
         <label class="form-label" >Male: <input type="radio" required onChange={this.handleChange}
         className="form-control"  value={this.state.add.Gender = "M"} style={{marginTop:"-15px"}} name="gender" /> </label> 
         
         <label class="form-label" >FeMale: <input type="radio" required onChange={this.handleChange}
         className="form-control"  value={this.state.add.Gender = "F"} style={{marginTop:"-15px"}} name="gender" /> </label> 
        

        

     </div>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
 <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>D O B</label>
         <input type="date" min='1960-01-01' id="dt" required onChange={this.handleChange}
         className="form-control"  name="DOB" value={this.state.add.DOB} onChange={this.changeHandler}/> 
    
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Mobile Number</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control" size="10" name="MobileNumber" value={this.state.add.MobileNumber} onChange={this.changeHandler}/> 
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Alternative Phone</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control" size="10" name="AlternativeNumber" value={this.state.add.AlternativeNumber} onChange={this.changeHandler}/> 
     
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Department</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control"  size="30" name="Department" value={this.state.add.Department} onChange={this.changeHandler}/>
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Reporting Manager</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control"  size="30" name="ReportingManager" value={this.state.add.ReportingManager} onChange={this.changeHandler}/> 
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>ReportingManagerId</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control"  size="10" name="ReportingManagerId" value={this.state.add.ReportingManagerId} onChange={this.changeHandler}/> 
     
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
 <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>UserName</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control"  size="30" name="UserName" value={this.state.add.UserName} onChange={this.changeHandler}/> 
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Password</label>
         <input type="text" name="Password"  required minLength={8} maxLength={20}
                    onChange={this.handleChange}
                    className="form-control" value={this.state.add.Password} type="Password" onChange={this.changeHandler}/> 
     
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Email ID</label>
         <input type="email" required onChange={this.handleChange}
         className="form-control"  name="Emailid" value={this.state.add.Emailid} onChange={this.changeHandler}/> 
     
     </div>
 </div>
 
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <div onChange={this.setStatus.bind(this)}  style={{color:"white"}}>
        <label class="form-label"> Status </label> 
         {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}
         <label class="form-label" >Active <input type="radio" required onChange={this.handleChange}
         className="form-control"  value={this.state.add.status = true} style={{marginTop:"-15px"}} name="status" /> </label>  
         <label class="form-label" >Inactive <input type="radio" required onChange={this.handleChange}
         className="form-control"  value={this.state.add.status = true} style={{marginTop:"-15px"}} name="status" /> </label> 
        

     
     </div>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Date Of Joining</label>
         <input type="date" min='1960-01-01' id="dt" required onChange={this.handleChange}
         className="form-control"  name="DateOfJoining" value={this.state.add.DateOfJoining} onChange={this.changeHandler}/>
    
     </div>
 </div>
 {/* <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Date Of Reliving</label>
         <input type="date" min='1960-01-01' id="dt" name="DateOfReliving" value={this.state.add.DateOfReliving} onChange={this.changeHandler}/>
     </div>
 </div> */}
<div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Address</label>
         <textarea type="text" required onChange={this.handleChange}
         className="form-control"  rows="2" cols="50" name="Address" value={this.state.add.Address} onChange={this.changeHandler}/>
 
     </div>
 </div>


 

 
<div class="card-footer text-right" style={{}}>
<div class="row clearfix">
<div class="col-sm-6 col-md-6">
<button className="btn btn-primary" style={{width:"70%", marginLeft:"150px"}} type="submit" onClick={this.onCreateProject}> Save </button>
</div>
{/* <div class="col-sm-4 col-md-4">
<button className="btn btn-primary" style={{width:"70%", marginLeft:"75px"}} type="submit" onClick={this.onCreateProject}> Update </button>
</div> */}
<div class="col-sm-6 col-md-6">
<button className="btn btn-primary" style={{width:"55%", marginLeft:"100px"}} onClick={this.onCreateProject}> Clear </button>
</div>
</div>
</div>
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
export default addUser;
const element=<addUser></addUser>
ReactDOM.render(element,document.getElementById("root"));
