import React,{Component} from 'react';
import {Link} from 'react-router-dom';


class adminDashboard extends React.Component{
    render(){
        return(
         
            <body className="font-montserrat"> 
           <div>
            {/* <div className ="page-loader-wrapper">
                <div className="loader">
                </div>
            </div> */}
            
            <div id="main_content">
              
               
            
                <div className="page">
                 
                  <div className="section-body mt-3">
                        <div className="container-fluid">
                            <div className="row clearfix">
                                <div className="col-lg-12">
                                    <div className="mb-4">
                                        <h4>Welcome to Admin Dashboard</h4>
                                       
                                    </div>                        
                                </div>
                            </div>
                            <div className="row clearfix row-deck">
                               <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">No of Users</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total Users - 200</h5>
                                            <span className="font-12"><Link to='/AddUser'>Add User </Link></span><br/>
                                            <span className="font-12"><Link to='/viewUser'> Users List</Link></span><br/><br/>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">No of Projects</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total No. of Projects - 5</h5>
                                            <span className="font-12"><Link to='/AddProject'>Add Project </Link></span><br/>
                                           
                                            <span className="font-12"><Link to='/viewProject'>Projects List </Link></span><br/>
                                              </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-5 col-md-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">No of Users Map To Projects</h3>
                                        </div>
                                        <div className="card-body">
                                            <h5 >Total No. of Users Map To Projects- 2</h5>
                                            <span className="font-12"><Link to='/Map'>Assign User To Project </Link></span><br/>
                                           
                                            <span className="font-12"><Link to='/UserList'>Users Assign To Projects List </Link></span><br/>
                                              </div>
                                    </div>
                                </div>
                           
                          
                    
                </div>    
            </div>
            
          </div> </div>
           </div>
           </div>
       </body>
        );
    }
}
export default adminDashboard;