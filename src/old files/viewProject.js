import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class viewProject extends React.Component{
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
                        <li class="nav-item"><Link to="/addProject" class="nav-link active show">Add Project</Link></li>

                        <li class="nav-item"><Link to="/viewProject" class="nav-link active "> View Project</Link></li>
                    
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
                                    <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
                                        <tr>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Name</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Date</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Name</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Status</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Edit</th>
                                            <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                        
                                            <tr className="">
                                            <td className="hidden-xs" >
                                         </td>
                
                                            <td className="text-center width40">
                                               
                                            </td>

                                            <td class="hidden-xs">                                               
                                         
                                            </td> 
                                          
                                            <td className="hidden-xs">
                                          
                                            </td>
                                            
                                            <td className="hidden-xs">
                                
                                            </td>
                                            <td class="hidden-xs">
                                            
                                            </td>
                                            
                                        </tr>
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
export default viewProject;