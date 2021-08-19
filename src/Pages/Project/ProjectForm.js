import React from 'react';
import {Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";    
import "react-datepicker/dist/react-datepicker.css";  
import * as moment from 'moment';
import {Link} from 'react-router-dom';


class EditProject extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        StartDate: null,
        EndDate:  null,
      }
      this.initialState = {
                ProjectID:"",
                ActiveStatus:"",
                InsertedBy: "1",
                InsertedDate: "2021-01-01T00:00:00",
                Location: "",
                ModifiedBy: "1",
                ModifiedDate: "2021-01-01T00:00:00",
                ProjectCode: "",
                ProjectDesc: "", 
                ProjectName: "",
                ProjectValue: "",
                StartDate: null,
                EndDate:  null,
            
         };
    

   
         if(props.user[0]){
          var temp = props.user[0]
          
          temp.ActiveStatus= temp.ActiveStatus == null? "true":temp.ActiveStatus.toString()
          this.state = temp
          console.log(this.state)
        
      } else {
      this.state = this.initialState;
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
 
    if(name == "ActiveStatus")
    {

      console.log(event.target.value)
      this.setState({
        ActiveStatus: event.target.value
      },()=>{
        console.log(this.state.ActiveStatus);
        console.log(typeof(this.state.ActiveStatus))
      })
  
    } 
    this.setState({
      [name]: value
    })
  }

  handleChange1 = StartDate => {
    console.log('onchange called....')
  console.log(StartDate)
  this.setState({        
    StartDate: StartDate,
     
  });
  }
  handleChange2 = EndDate => {
      console.log('onchange called....')
  
  
    console.log(EndDate)
    this.setState({        
        EndDate: EndDate,
       
    });
    }     

handleSubmit(event) {
    event.preventDefault();
    console.log('Before Converting ')
    console.log(this.state)
    var s  = this.state
    const convertedstartdate = moment(s.StartDate).format('MM/DD/YYYY');
            s.StartDate = convertedstartdate.toString();
            const convertedDate = moment(s.EndDate).format('MM/DD/YYYY');
            s.EndDate = convertedDate.toString()
            this.setState({
                s
            },()=>{
                console.log('after Converting ')
                console.log(this.state)
            })
            console.log(this.state)
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  } 




  onCreateProject = () =>{
    console.log(this.initialState);
 }
 onClick(){
   window.location.reload();
 }
  
  render() {
    this.state.StartDate = new Date(this.state.StartDate)
     
    var StartDate =   <DatePicker
    dateFormat="MMMM d, yyyy"
    wrapperClassName="datepicker" 
    onChange={this.handleChange1} 
    selected={this.state.StartDate}
    className="form-control"
    
    />
    this.state.EndDate = new Date(this.state.EndDate) 
           var EndDate = <DatePicker
               selected={this.state.EndDate}
               wrapperClassName="datepicker" 
               onChange={ this.handleChange2 }
               dateFormat="MMMM d, yyyy"
               className="form-control"
               
               />
    return(
        <body >
        <div>
    
        <div>
        
            <div className="page">
        
                    {/* <div className="section-body">
         
             <div className="row clearfix">
                 <div className="col-xl-12 col-lg-12">
                     <div className="card" style={{}}> 
                         <div className="card-header" className='center'>
                             <h3 className="card-title"  style = {{ fontSize:"20px", fontWeight:"bold"}}>Update Project</h3>
                         </div>
                     </div>                
                 </div>
           </div>  
        </div>  */}
        <br/>
        <br/>
        
        <Form onSubmit={this.handleSubmit}>
        <div class="card-body" class="container" style={{}}><br/>
        <div class="row clearfix">
        <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{marginLeft:"30px"}}>
                 <label class="form-label" style={{color:"black"}}>Project Name:</label>
                 <input type="text" size="30" name="ProjectName" style={{width:"50%"}}
                 className="form-control" disabled
                 value={this.state.ProjectName} onChange={this.handleChange}/>
                 
             </div>
         </div>
         <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{marginLeft:"30px"}}>
                 <label class="form-label" style={{color:"black"}}>Project Code</label>
                 <input type="text" size="30" style={{width:"50%"}} disabled
                 className="form-control"  name="ProjectCode" value={this.state.ProjectCode} onChange={this.handleChange}/>
                
             </div>
         </div>
         <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{marginLeft:"30px"}}>
                 <label class="form-label" style={{color:"black"}}>Project Description</label>
                 <textarea type="text" required style={{width:"50%"}}
                 className="form-control"  rows="2" cols="50" name="ProjectDesc" value={this.state.ProjectDesc} onChange={this.handleChange}/>
         
             </div>
         </div>
         <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{marginLeft:"30px"}}>
                 <label class="form-label" style={{color:"black"}}>Project Value</label>
                 <textarea  required style={{width:"50%"}}
                 className="form-control"  rows="2" cols="50" name="ProjectValue" value={this.state.ProjectValue} onChange={this.handleChange}/>
         
             </div>
         </div>
         <div class="col-sm-4 col-md-4">
 <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>Start Date</label>
         {StartDate}
     </div>
 </div>
 <div class="col-sm-4 col-md-4">
 <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"black"}}>End Date</label>
      {EndDate}
     </div>
 </div>
        <div class="col-sm-4 col-md-4">
             <div class="form-group" style={{marginLeft:"30px"}}>
                 <label class="form-label" style={{color:"black"}}>Location</label>
                 <textarea type="text" required style={{width:"50%"}}
                 className="form-control"  rows="2" cols="50" name="Location" value={this.state.Location} onChange={this.handleChange}/>
         
             </div>
         </div>
         
         <div class="col-sm-4 col-md-4">
     <div class="form-group" style={{color:"black",marginLeft:"30px"}}>
     <div >
     <label>Active<input type="radio"  name="ActiveStatus"
                  value="true"
              checked={this.state.ActiveStatus === "true"}  onChange={this.handleChange} style={{marginLeft:"80px"}}/> </label>
       <br/> 
        <label>In Active<input type="radio"   value="false"
              checked={this.state.ActiveStatus === "false"} name="ActiveStatus" onChange={this.handleChange}style={{marginLeft:"73px"}}/> </label>
        

     </div>
     </div>
 </div>
 <br/>
        <br/>
        <br/>
        <br/>
 <div className="center">
    <button className="btn btn-primary" type="submit" style={{width: "8%",marginRight:"50px",marginTop:"3px",background:"blue"}} onClick={this.onCreateProject}> Update</button>

    <Link to="ViewProject"><button className="btn btn-primary" style={{width: "8%",height:"92%" ,marginRight:"50px",background:"blue"}} onClick={this.onClick} >Back</button></Link>
</div>
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

export default EditProject;