import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'; 

import {
    ListGroup,
    ListGroupItem,
    Button
  } from "reactstrap";
import { validateYupSchema } from 'formik';


class viewUser extends React.Component{

    constructor(props) {  

        super(props); 
        
        this.state={
            name:[],
        }
     }
    
componentDidMount() {
    axios.get('http://localhost/ScadaClient/api/userdetails').then(res => {
        console.log(res);
        this.setState({ name: res.data });
        console.log(this.state.name)
    });

    }

    onEdit =(id)=>{
        const tempname = this.state.name;
        const index = tempname.indexof(this.getRecord(id));
        const selectedRecord = tempname[index];
        this.setState({
            FirstName:selectedRecord['FirstName']
        })
    
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
                        <li class="nav-item"><Link to="/addUser" class="nav-link active show">Add User</Link></li>

                        <li class="nav-item"><Link to="/viewUser" class="nav-link active "> View User</Link></li>

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
            
            <div className="tab-content">
                <div className="tab-pane fade show active" id="list" role="tabpanel">
                    <div className="row clearfix">
                        <div className="col-lg-12">
                            <div className="table-responsive"  id="users">
                                <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                    <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                    <thead style={{ backgroundColor:"#252d42"}}>
                                        <tr>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>First Name</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Last Name</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Phone Number</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Email Id</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>DOB</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Gender</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Department</th>
                                            <th style={{ textAlign:"-webkit-center",textTransform:"none", color:"#E5E5E5"}}>Edit</th>
                                            {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>
                                              */}
                                        </tr>
                                    </thead>
                                   <tbody>
                                        
                                   {this.state.name.map((name) => (
                                     <tr>
                                            <td style={{color:"black"}}>{name.FirstName}</td>
                                            <td style={{color:"black"}}>{name.LastName}</td>
                                            <td style={{color:"black"}}>{name.Mobile}</td>
                                            <td style={{color:"black"}}>{name.EmailID}</td>
                                            <td style={{color:"black"}}>{name.DOB}</td>
                                            <td style={{color:"black"}}>{name.Gender}</td>
                                            <td style={{color:"black"}}>{name.Department}</td>
                                            <td style={{textAlign:"center", marginLeft:"0"}}>   <button className="btn btn-primary" onClick={(name) => {name.this.state.onEdit(name.id)}}  ><Link to="/updateUser" class="nav-link active show" style={{}}>Edit</Link></button> </td>
                                            {/* <Button onClick={() => delete(name.id)} color="danger">Delete</Button>
               */}
                                    </tr>
                                   ))}
                                        </tbody>
                                </table>
                                </table>
                            </div>
                        </div>
                    </div>
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
export default viewUser;