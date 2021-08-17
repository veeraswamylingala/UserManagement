import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Alert } from 'react-bootstrap';
import EditUser from "./EditUser";
import {Redirect} from 'react-router-dom';




 class UserList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          message: 'Hello!',
          data:[],
        
        };
      // This line is important!
      this.handleClick = this.handleClick.bind(this);
     
    }

    componentDidMount(){
      
        axios.get('http://localhost/ScadaClient/api/UsersMapToProjects').
        then((res)=>{
            console.log(res.data.length)
            this.setState({
                data:res.data
            },()=>{
              console.log(this.state.data)
                
            })

                
        
        });
    }
  
    handleClick = e => {
        console.log(e)
   // return  <Redirect  to="/EditUser/" />
    }
  
    render() {
      // Because `this.handleClick` is bound, we can use it as an event handler.
      return (
       <div className='page'>
         
         <div className="section-body">
          
         
          <ul class="nav nav-tabs page-header-tab">
              <li class="nav-item"><Link to="/Map" class="nav-link active show">Assign User To Project</Link></li>
  
              <li class="nav-item"><Link to="/MapUserList" class="nav-link inactive show" >Assign Users To Projects List</Link></li>
          </ul>
     
      
        </div>
        {/* <div className='center'>
          <h2>Map Users To Projects List</h2>
          </div> */}
          
            <Table>
            <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
            <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                      
              <thead  style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>User </th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Role</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Active Status</th>
              
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
              </thead>
           
  
     <tbody>
              {this.state.data.map(user => (
                <tr>
                <td style={{textAlign:"-webkit-center",color:"black"}}>{user.ProjectName}</td>
                <td style={{textAlign:"-webkit-center",color:"black"}}>{user.UserFullName}</td>
                <td style={{textAlign:"-webkit-center",color:"black"}}>{user.RoleName}</td>
                <td style={{textAlign:"-webkit-center",color:"black"}}>{user.ActiveStatus.toString()}</td>           
                <td style={{textAlign:"-webkit-center"}}> <Link to={{pathname:'./EditUser',state:user}}> <Button  variant="info" onClick={() => this.handleClick(user)}>
                 Edit
                </Button></Link></td>
             
                </tr>
              ))}
            </tbody>
     
     
     </table>
     </table>
     
     </Table>
    
     
        </div>
      );
    }
  }
  export default UserList;
