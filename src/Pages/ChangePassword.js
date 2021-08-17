import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import Login from './Login';

class ChangePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            add:{
                
            username:"",
            old_password:"",
            Password:"",
            }
        };

    this.state.add.username=localStorage.getItem("user")
     this.state.add.old_password=localStorage.getItem("password")
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
     submitHandler = e =>{
        e.preventDefault()
        
        console.log("test")
       const apiUrl = 'http://localhost/ScadaClient/api/ChangePassword';
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
          alert('Password updated succesfully')
          this.props.history.push('/AdminDashboard')
        }
    render(){
        return(
            
         
            <body className="font-montserrat">
                <form onSubmit={this.submitHandler}>

        {/* <div className="card"> */}
  
            {/* <div className="card-body"> */}
            <div id="main_content">

<div className="page">

<div className="section-body">
                
           
                <div className="card-title" style={{textAlign:"center", fontWeight:"bold", fontSize:"20px"}}>Change password</div>
                <div className="form-group" style={{width:"50%", marginLeft:"250px"}}>
                <label class="form-label" style={{color:"black"}}>Username</label>
         <input type="text" size="30" name="username" 
         className="form-control" placeholder="username" disabled
         value={this.state.add.username} onChange={this.changeHandler}/>
                </div>
                <div className="form-group" style={{width:"50%", marginLeft:"250px"}}>
                    <label className="form-label" for="exampleInputEmail1"> Old Password </label>
                    <input type="password" size="30" 
         className="form-control" placeholder="old_password"
         value={this.state.add.old_password} onChange={this.changeHandler}/>
                </div>
                <div className="form-group" style={{width:"50%", marginLeft:"250px"}}>
                    <label className="form-label" for="exampleInputEmail1"> New Password </label>
                    <input type="Password" size="30" name="Password" required
         className="form-control" placeholder="new_password"
         value={this.state.add.new_password} onChange={this.changeHandler}/>
                </div>
                {/* <div className="form-group" style={{width:"50%", marginLeft:"250px"}}>
                    <label className="form-label" for="exampleInputEmail1"> Confirm Password </label>
                    <input type="password" className="form-control" id="exampleInputPassword2" aria-describedby="passwordHelp" placeholder="Enter Confirm Password"
                    onChange={e => this.confirmpassword = e.target.value}/>
                </div> */}
                <div className="form-footer">
                <div class="row clearfix">
                <div class="col-sm-6 col-md-6">
                    <button type="submit" className="btn btn-primary btn-block" style={{width:"20%", marginLeft:"400px"}} onClick={this.onCreateProject}> Update </button>
                    </div>
               
                </div>
                </div>
            </div>
            {/* <div className="text-center text-muted">
                Forget it, <a href="index.html">Send me Back</a> to the Sign in screen.
            </div> */}
        </div>        
</div>
{/* </div> */}
{/* </div> */}
</form>
     </body>


        )

        
    }  
}

export default ChangePassword;