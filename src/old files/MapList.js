import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class MapList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
      response: {}
    }
  }

  componentDidMount() {
  console.log('map list')
    const apiUrl = 'http://localhost/ScadaClient/api/UsersMapToProjects';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            users: result
          });
          console.log(this.state.users[0].ActiveStatus)
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  

  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(

        <div>
         
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
          <table className="table table-hover table-vcenter text-nowrap table_custom border-style list"> 
                                    <table className="table table-hover table-vcenter mb-0 table_custom spacing8 text-nowrap">
                                    
            <thead style={{textAlign:"-webkit-center", backgroundColor:"#252d42"}}>
              <tr >
                
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Project Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>User Name</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Role</th>
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Active Status</th>
              
                <th style={{textTransform:"none", color:"#E5E5E5"}}>Action</th>
                 {/* <th style={{textTransform:"none", color:"#E5E5E5"}}>Delete</th>*/}
                                              
                                            
                                        
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(data => {

              

                console.log(data.UserMapID);
              return   <tr key={data.ProjectID}>
                  
                  <td style={{color:"black"}}>{data.ProjectName}</td>
                  <td style={{color:"black"}}>{data.UserFullName}</td>
                  <td style={{color:"black"}}>{data.Role}</td>
                  <td style={{color:"black"}}>{data.ActiveStatus.toString()}</td>
                  
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(data.UserMapID)}>Edit</Button>
                    {/* &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(data.ProjectID)}>Delete</Button> */}
                  </td>
                </tr>
              
            })}
            </tbody>
            </table>
            </table>
          </Table>
        </div>
      )
    }
  }
}

export default MapList;