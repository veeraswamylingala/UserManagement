import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const history = useHistory();
 

async function login() {
    
    //console.warn(username, password)
    let item = { username, password };
    console.clear();
    console.log(item)
    
    sessionStorage.setItem("user",username)
    sessionStorage.setItem("password",password)
    sessionStorage.setItem("Admin","1")
    let result = await fetch("http://localhost/ScadaClient/api/userAuthentication", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json'
        }, 
        body: JSON.stringify(item)
    }).then((response) => {
       // console.log(response)
       // console.log(response.status)
        if(response.status === 200){
            console.log(response.status)
    
            history.push("/adminDashboard") 
            window.location.reload();  
        }
        else {
            console.log(response.status)
           alert("Please enter valid username and pasword")
        }
    })

}

        return(
            
            <div>
                <body className="font-montserrat">
                <div className="auth">
    <div className="auth_left">
        <div className="card">
            <div className="text-center mb-2">
               
            </div>
			 <div className="card-body">
			 <h3 style={{textAlign:"center"}}> ECSCADA Web Server Application </h3>
			 </div>
            <div className="card-body">
			<img className="text-center mb-2" src="assets/images/ecillogo.jpg"  style={{width:"150px"},{height:"170px"},{marginLeft:"75px"}} alt=""/>
                <div className="card-title" style={{textAlign: "center"}}>Login to ECSCADA Application</div>
                {/* <div className="form-group">
                    <select id="roles" className="custom-select" onChange={this.change}>
						<option>Choose Role...</option>
                        <option value="administrator@ecil.co.in">Administrator</option>
                        <option value="supervisor@ecil.co.in">Supervisor</option>
                        <option value="project-employee@ecil.co.in">Employee</option>
                    </select>
                </div> */}
					<div className="form-group">
                    <input type="text" aria-describedby="username" className="form-control" id="inp" name="input" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                   
                <input type="password" placeholder="Password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
					 <label className="form-label"><a href='/ForgotPassword' className="float-right small">I forgot password</a></label>
                </div>
               
                <div className="form-group">
                   
                 <Link  onClick={login}  className="btn btn-primary btn-block" > Sign in</Link> 
                </div>
            </div>


        </div>        
    </div>

    <div className="auth_right full_img" ></div>
   
</div>


</body>
            </div>

        );
     }
//  }

// export default Login;