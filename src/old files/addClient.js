import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class addUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
           add:{
               FirstName:'',
               LastName:'',
               PhoneNumber:'',
               Email:'',
               Gender:'',
               DOB:'',
               Address:'',
               Company:'',
           }
        };
    }
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
            
            <div className="row clearfix">
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                        <ul class="nav nav-tabs page-header-tab">
                        <li class="nav-item"><Link to="/addClient" class="nav-link active show" >Add Client</Link></li>

                        <li class="nav-item"><Link to="/viewClient" class="nav-link active show" style={{}}>View Client</Link></li>
                    
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
                     <h3 className="card-title"  style = {{marginLeft:"380px", fontSize:"20px", fontWeight:"bold"}}>Add Client</h3>
                 </div>
             </div>                
         </div>
   </div>  
</div> 
<div class="card-body" class="container" style={{maxWidth:'55%',marginLeft:"200px", background:'#2b3035', borderRadius:'10px', borderStyle:'outset'}}><br/>
<div class="row clearfix">
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>First Name</label>
         <input type="text" name="FirstName" value={this.state.add.FirstName} onChange={this.changeHandler}></input>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Last Name</label>
         <input type="text" name="LastName" value={this.state.add.LastName} onChange={this.changeHandler}/>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Phone Number</label>
         <input type="text" name="PhoneNumber" value={this.state.add.PhoneNumber} onChange={this.changeHandler}/>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Email Id</label>
         <input type="text" name="Email" value={this.state.add.Email} onChange={this.changeHandler}/>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Gender</label>
         <input type="text" name="Gender" value={this.state.add.Gender} onChange={this.changeHandler}/>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Date of Birth</label>
         <input type="date" name="DOB" value={this.state.add.DOB} onChange={this.changeHandler}/> 
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Address</label>
         <input type="text" name="Address" value={this.state.add.Address} onChange={this.changeHandler}/>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Company</label>
         <input type="text" name="Company" value={this.state.add.Company} onChange={this.changeHandler}/> 
     </div>
 </div>

<div class="card-footer text-right" style={{}}>
<button className="btn btn-primary" style={{width:"40%", marginLeft:"190px"}} onClick={this.onCreateProject}> Create </button>
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
export default addUser;
const element=<addUser></addUser>
ReactDOM.render(element,document.getElementById("root"));