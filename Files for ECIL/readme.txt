line:27 to 28
import Download from "./Pages/Report"
import Profile from './Pages/Profile';

line:97-98
<Route exact path="/Download" component={Download}/>
  <Route exact path="/Profile" component={Profile}/>

home.js:

line:17 to 18
 localStorage.setItem("password",password)
 localStorage.setItem("Admin","1")
...................................................

for Button hide:

User-> UserList.js

line:105 to 109
 {localStorage.getItem("Admin")?
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                
                  :""                            
                }  
line:124 to 128
     {localStorage.getItem("Admin")?
                <td style={{textAlign:"-webkit-center"}}> <Button variant="info" onClick={() => this.props.editProduct(data.UserID)}>Edit</Button>
                </td>
              :""
              }

......................................................
Designation Binding In Map.js:
line:355 to 360
 <option value="1">Team Member</option>
  <option value="2">Team Lead</option>  
  <option value="3">Project Lead</option>  
 <option value="4">Project Manager</option>  
<option value="5">Delivery Head</option>  
<option value="6">Director</option>  
................................................
for profile
profile.js
sidebar.js
line:33 to 34
    this.UpdateProfile=this.UpdateProfile.bind(this);
    this.UpdateChangePassword = this.UpdateChangePassword.bind(this);
line:114 to 125

UpdateProfile()
{
    this.setState({data: ' My Profile'});
    this.UpdateProfile = this.UpdateProfile.bind(this);
   
line:152 to 156
 <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
  <Link onClick = {this.UpdateProfile} to="/Profile"><i className="fa fa-user"></i><span> My Profile</span></Link>
                      
   <a href='/' className="dropdown-item" ><i className="dropdown-icon fe fe-log-out"></i> Sign out</a>
  </div>
 
}
..........................................................................
for report Report.js
