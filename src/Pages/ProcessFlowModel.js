import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class ProcessFlowmodel extends Component{
    render(){
    return(
<body className="font-montserrat">
{/* <!-- Page Loader --> */}
{/* <div className="page-loader-wrapper">
    <div className="loader">
    </div>
</div> */}

<div id="main_content">
  
    
<div className="page">
{/* <div className="section-body mt-3">
        <div className="container-fluid">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="mb-4">
                        <h4>Welcome to Process flow Models</h4>
                       
                    </div>                        
                </div>
            </div>
            <div className="row clearfix row-deck">
               <div className="col-xl-4 col-lg-5 col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Process Models</h3>
                        </div>
                        <div className="card-body">
                            <h5 >Total Models - 200</h5>
                            <span className="font-12"><Link to='/ProcessFlowmodels'>View Models </Link></span><br/>
                            <span className="font-12"><Link to='/HistoricModels'>Historic Models</Link></span><br/><br/>
                            
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Alarms</h3>
                        </div>
                        <div className="card-body">
                            <h5 >Total No. of Alarms - 40</h5>
                            <span className="font-12"><Link to='ViewAlarms'>View Alarms </Link></span><br/><hr/>
                            <span className="h7"><i className="fa fa-arrow-circle-left"> </i>18-12-2020 <i className="fa fa-arrow-circle-right"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Events</h3>
                        </div>
                        <div className="card-body">
                            <h5 >Total No. of Events - 20</h5>
                            <span className="font-12"><Link to='/ViewEvents'>View Events </Link></span><br/><hr/>
                            <span className="h7"><i className="fa fa-arrow-circle-left"> </i>18-12-2020<i className="fa fa-arrow-circle-right"></i></span>
                        </div>
                    </div>
               </div>
          </div>

</div>

</div> */}

<div className="section-body mt-3">
<div className="container-fluid">
				<div className="row clearfix">
				   <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Process Models</h3>
                                <div class="d-lg-flex justify-content-between" style={{marginLeft:"20px"}}>
                            <ul class="nav nav-tabs page-header-tab">
                                <li class="nav-item"><Link to="/FileUpload" class="nav-link active show" data-toggle="tab" href="#Area_Charts">Choose XML File</Link></li>
                            </ul>
                        </div>
                            </div>
                          <div className="card-body">
						  <div>
				   <a href='/assets/samples/processFlow.html' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px"}} > Model -1</a>
				       <Link to='/Model9' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} > Model -2</Link>
					 <Link to='/Model3' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} >Model -3</Link>
					 <Link to='/Model10' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -4</Link>
					 <Link to='/Model5' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -5</Link>
					 <Link to='/Model2' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -6</Link>
					  <Link to='/Model7' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -7</Link> 
					  <Link to='/Model8' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} > Model -8</Link>
				    <Link to='/Model9' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} > Model -9</Link>
					 <Link to='/Model4' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} >Model -10</Link>
                      </div>

					  <div style={{marginTop:"25px"}}>
                      
					  <p></p>
					  
					 <Link  to='/Model3' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px"}}> Model -11</Link>
					 <Link  to='/Model12' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -12</Link>
					 <Link  to='/Model13' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -13</Link>
					  <Link  to='/Model14' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -14</Link> 
					  <Link  to='/Model15' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -15</Link>
				    <Link  to='/Model16' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -16</Link>
					 <Link  to='/Model17' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} >Model -17</Link>
					 <Link  to='/Model18' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -18</Link>
					 <Link  to='/Model19' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -19</Link>
					 <Link  to='/Model20' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -20</Link>
                      </div>

                      <div style={{marginTop:"25px"}}>
                      
					  <p></p>
					  
					 <Link  to='/Model3' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px"}}> Model -21</Link>
					 <Link  to='/Model12' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -22</Link>
					 <Link  to='/Model13' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -23</Link>
					  <Link  to='/Model14' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -24</Link> 
					  <Link  to='/Model15' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -25</Link>
				    <Link  to='/Model16' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -26</Link>
					 <Link  to='/Model17' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} >Model -27</Link>
					 <Link  to='/Model18' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -28</Link>
					 <Link  to='/Model19' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -29</Link>
					 <Link  to='/Model20' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -30</Link>
                      </div>
                      <div style={{marginTop:"25px"}}>
                      
					  <p></p>
					  
					 <Link  to='/Model3' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px"}}> Model -31</Link>
					 <Link  to='/Model12' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -32</Link>
					 <Link  to='/Model13' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -33</Link>
					  <Link  to='/Model14' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -34</Link> 
					  <Link  to='/Model15' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -35</Link>
				    <Link  to='/Model16' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -36</Link>
					 <Link  to='/Model17' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}} >Model -37</Link>
					 <Link  to='/Model18' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -38</Link>
					 <Link  to='/Model19' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -39</Link>
					 <Link  to='/Model20' onclick="myFunction()" className="btn btn-primary" style={{height:"30px"},{width:"125px", marginLeft:"30px"}}> Model -40</Link>
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
    );
}
}