import React, { Component } from 'react';
//import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import UserList from './UserList';
import EditUser from './UserForm';
import {Link} from 'react-router-dom';
import * as moment from 'moment';


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
    console.log(data.UserID)
    let apiUrl;
    data.DateofRelieving=moment(data.DateofRelieving).format('DD/MM/YYYY');
    data.DateofJoining=moment(data.DateofJoining).format('DD/MM/YYYY');
    data.DOB=moment(data.DOB).format('DD/MM/YYYY');

    
    apiUrl = 'http://localhost/ScadaClient/api/EditUser?UserID='+data.UserID+'&FirstName='+data.FirstName+'&LastName='+data.LastName+'&EmpCode='+data.EmpCode+'&Gender='+data.Gender+'&DOB='+data.DOB+'&Department='+data.Department+'&ReportingManager='+data.ReportingManager+'&ReportingManagerID='+data.ReportingManagerID+'&Mobile='+data.Mobile+'&AlternatePhone='+data.AlternatePhone+'&EmailID='+data.EmailID+'&Address='+data.Address+'&DateofJoining='+data.DateofJoining+'&DateofRelieving='+moment(data.DateofRelieving).format('MM/DD/YYYY')+'&RoleiD='+data.RoleID+'&ActiveStatus='+data.ActiveStatus;
    
      console.log(apiUrl)

  //   const requestOptions = {
  //     method: 'POST',
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
        //this.props.history.push('/ViewUser')
    //window.location.reload();
      },
      (error) => {
        this.setState({ error });
      }
      
    )
    
  }

  editProduct = UserID => {

    console.log(UserID)

    const apiUrl = 'http://localhost/ScadaClient/api/userdetail?userid='+UserID;
  
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
      userForm = <EditUser onFormSubmit={this.onFormSubmit} user={this.state.user} />
    }

    return (
      <div className="App">
      
          {this.state.response.status === 'success' && <div><br />
          <Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddProduct && <UserList editProduct={this.editProduct}/>} 
          { userForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}        
       
      </div>
    );
  }
}

export default App;