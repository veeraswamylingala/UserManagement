import React, { Component } from 'react';
//import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ProjectList from './ProjectList';
import AddProject from './ProjectForm';
import {Link} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      user: {},
      isEditProduct: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    console.log(data)
    let apiUrl;

    
      apiUrl = 'http://localhost/ScadaClient/api/EditProjectDetails?ProjectID='+data.ProjectID+'&ProjectName='+data.ProjectName+'&ProjectCode='+data.ProjectCode+'&ProjectDesc='+data.ProjectDesc+'&StartDate='+data.StartDate+'&EndDate='+data.EndDate+'&ProjectValue='+data.ProjectValue+'&Location='+data.Location+'&ActiveStatus='+data.ActiveStatus
      console.log(apiUrl)
  //   const requestOptions = {
      
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  // };
  
  fetch(apiUrl)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddProduct: false,
          isEditProduct: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  // this.props.history.push('/viewProject')
   //window.location.reload();
  }

  editProduct = ProjectID => {
    //console.log(ProjectID)
   
    const apiUrl = 'http://localhost/ScadaClient/api/projectdetail?projectid='+ProjectID;
  //   const formData = new FormData();
  //   formData.append('ProjectID', ProjectID);
  //   const myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');

  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: formData
  // };
  fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result)
          this.setState({
            user: result,
           isEditProduct: true,
           isAddProduct: true
          });
          console.log(this.state.user)
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let userForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      userForm = <AddProject onFormSubmit={this.onFormSubmit} user={this.state.user} />
    }

    return (
      <div >
        
  
             
           {/* <Button variant="primary" onClick={() => this.onCreate()}>Add User</Button> */}
          {this.state.response.status === 'success' && <div><br />
          <Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddProduct && <ProjectList editProduct={this.editProduct}/>} 
          { userForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}        
    
      </div>
    );
  }
}

export default App;