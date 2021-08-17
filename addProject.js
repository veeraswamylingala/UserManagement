import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

class addProject extends React.Component{
    constructor(props){
        super(props);
        this.state={
           add:{
               
               ProjectName:'',
               ProjectValue:'',
               StartDate:'',
               EndDate:'',
               Description:'',
               Status:'',
           }
        };
    }
    changeHandler = (e) =>{
        console.log("date edit clicked")
        const name=e.target.name;
        const value=e.target.value;

        this.setState({add:{
            ...this.state.add,
            [name]:value
        }});  
    } 

    setStatus(event) {
        console.log(event.target.value);
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
                        <li class="nav-item"><Link to="/addProject" class="nav-link active show" >Add Project</Link></li>

                        <li class="nav-item"><Link to="/viewProject" class="nav-link active show" style={{}}>View Project</Link></li>
                    
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
                     <h3 className="card-title"  style = {{marginLeft:"350px",fontSize:"20px", fontWeight:"bold"}}>Add Project</h3>
                 </div>
             </div>                
         </div>
   </div>  
</div> 
<div class="card-body" class="container" style={{maxWidth:'55%',marginLeft:"200px",background:'#2b3035',borderRadius:'10px',borderStyle:'outset'}}><br/>
<div class="row clearfix">
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Project Name:</label>
         <input type="text" name="ProjectName" value={this.state.add.ProjectName} onChange={this.changeHandler}></input>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Project Value:</label>
         <input type="text" name="ProjectValue" value={this.state.add.ProjectValue} onChange={this.changeHandler}/>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Start Date:</label>
         <input type="date" name="StartDate" value={this.state.add.StartDate} onChange={this.changeHandler}/>
     </div>
 </div>
 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>End Date:</label>
         <input type="date" name="EndDate" value={this.state.add.EndDate} onChange={this.changeHandler}/>
     </div>
 </div>



 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Description:</label>
         <textarea rows="3" cols="25" name="Description" value={this.state.add.Description} onChange={this.changeHandler}/>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Location:</label>
         <input type="text" name="Location" value={this.state.add.Location} onChange={this.changeHandler}/>
     </div>
 </div>

 <div class="col-sm-6 col-md-6">
     <div class="form-group" style={{marginLeft:"30px"}}>
     <div onChange={this.setStatus.bind(this)}>
         <label class="form-label" style={{color:"white"}}>Status:</label>
         <input type="radio" value="ACTIVE" name="status" /> Active 
        <input type="radio" value="INACTIVE" name="status" /> Inactive 
        </div>
         {/* <select name="Status" value={this.state.add.Status} onChange={this.changeHandler}>
             <option>Completed</option>
             <option>Not Completed</option>
             <option>In Progress</option>
         </select> */}

       {/*   <input type="text" name="Status" value={this.state.add.Status} onChange={this.changeHandler}/> */}
     </div>
 </div>

 

<div class="card-footer text-right" style={{marginLeft:'175px'}}>
<button className="btn btn-primary" style={{width:"150%"}} onClick={this.onCreateProject}> Create </button>
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
export default addProject;
const element=<addProject></addProject>
ReactDOM.render(element,document.getElementById("root"));