import React, { Component } from 'react';
//import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import MapList from './MapList';
import AddMap from './MapForm';
import {Link} from 'react-router-dom';


class viewMap extends Component {
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

    
      apiUrl = 'http://localhost/ScadaClient/api/UsersMaptoProjects';
    

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  
  fetch(apiUrl, requestOptions)
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
  }

  editProduct = UserMapID => {
    console.log(UserMapID)

    const apiUrl = 'http://localhost/ScadaClient/api/UsersMapToProject?UserMapID='+UserMapID;
console.log(apiUrl)
  console.log(apiUrl)
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
      userForm = <AddMap onFormSubmit={this.onFormSubmit} user={this.state.user} />
    }

    return (
      <div className="App" id="main_content" style={{marginLeft:"180px"}}>
        <Container >
        <div className="row clearfix">
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                        <ul class="nav nav-tabs page-header-tab">
                            
                            <li class="nav-item"><Link to="/Map" class="nav-link inactive show">Assign Users to Projects</Link></li>

                            <li class="nav-item"><Link to="/viewMap" class="nav-link active show" >Users to Projects List </Link></li>

                        </ul>
                          
                        </div>
                     
                    </div>                
                </div>
          </div>
           {/* <Button variant="primary" onClick={() => this.onCreate()}>Add User</Button> */}
          {this.state.response.status === 'success' && <div><br />
          <Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddProduct && <MapList editProduct={this.editProduct}/>} 
          { userForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}        
        </Container>
      </div>
    );
  }
}

export default viewMap;