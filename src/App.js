import React,{Components} from 'react';
import './App.css';
import Login from './Pages/home';
// import ProcessFlowModel from './Pages/ProcessFlowModel';
// import ProjectManagement from './Pages/ProjectManagement';
// import ClientManagement from './Pages/ClientManagement';
// import UserManagement from './Pages/UserManagement';
import addProject from './Pages/Project/addProject';
import viewProject from './Pages/Project/viewProject';
import ProjectList from './Pages/Project/ProjectList';
// import addClient from './Pages/addClient';
import addUser from './Pages/User/addUser';
import viewUser from './Pages/User/viewUser';
import adminDashboard from './Pages/adminDashboard';
// import viewClient from './Pages/viewClient';
import Sidebar from './Components/Sidebar'; 
import ForgotPassword from './Pages/ForgotPassword';
import AssignUserstoProject from './Pages/AssignUserstoProjects/AssignUserstoProject';
// import viewMap from './Pages/MapUser/viewMap'
import ChangePassword from './Pages/ChangePassword';
// import Model4 from './Pages/Model4';
// import Model2 from './Pages/Model2';
import AssignUserToProjectsList from './Pages/AssignUserstoProjects/AssignUserToProjectsList';
import EditAssignUsersToProjects from "./Pages/AssignUserstoProjects/EditAssignUsersToProjects";
import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';
import AddXml from "./Pages/AddXml";
import Download from "./Pages/Report"
import Profile from './Pages/Profile';
import UNCCanvas from './Pages/Xml/UNCCanvas';

class App extends React.Component {
  

  
  render(){
     
    if(window.location.pathname ==="/")
    {
      
      return(
      
      <div>
        
      <Router>
               
      <Route exact path="/" component={Login} />
     
      </Router>
      </div>
      )
    }
    else if (window.location.pathname==="/ForgotPassword"){
      return(
        <div>
          {
            
          <Router>
            <Route exact path="/ForgotPassword" component={ForgotPassword}/>
            
            <Route exact path="/" component={Login} />
          </Router>
          }
        </div>
      )
      
    }
    else if (window.location.pathname==="/processflow"){
      return(
        <div>
          {
            
          <Router>
            <Route exact path="/processflow" component={UNCCanvas}/>
            
            <Route exact path="/" component={Login} />
          </Router>
          }
        </div>
      )
      
    }
    else
    {
      return(
        
  <div>
   
    <Router >
    <Sidebar/>
        <Switch>

        {/* <Route exact path="/ProcessFlowModel" component={ProcessFlowModel} />
        <Route exact path="/ProjectManagement" component={ProjectManagement}/>
        <Route exact path="/UserManagement" component={UserManagement}/>
        <Route exact path="/ClientManagement" component={ClientManagement}/> */}
        <Route exact path="/addProject" component={addProject}/>
        {/* <Route exact path="/addClient" component={addClient}/> */}
        <Route exact path="/addUser" component={addUser}/>
        <Route exact path="/viewUser" component={viewUser}/>
        {/* <Route exact path="/viewClient" component={viewClient}/> */}
        <Route exact path="/adminDashboard" component={adminDashboard}/>
        <Route exact path="/viewProject" component={viewProject}/>
        <Route exact path="/ProjectList" component={ProjectList}/>
        <Route exact path="/AssignUserstoProject" component={AssignUserstoProject}/>
        <Route exact path="/AssignUserToProjectsList" component={AssignUserToProjectsList}/> 
        <Route exact path="/EditAssignUsersToProjects" component={EditAssignUsersToProjects}/> 
        {/* <Route exact path="/viewMap" component={viewMap}/> */}
        <Route exact path="/ChangePassword" component={ChangePassword}/>
        {/* <Route exact path="/Model4" component={Model4}/>
        <Route exact path="/Model2" component={Model2}/> */}
        <Route exact path="/AddXml" component={AddXml}/>
        <Route exact path="/Download" component={Download}/>
        <Route exact path="/Profile" component={Profile}/>
      
      
        </Switch>
        </Router> 
      
      <Router> 
      <Route exact path="/" component={Login} />
      </Router> 


    </div>
 );
      }
}}

export default App;