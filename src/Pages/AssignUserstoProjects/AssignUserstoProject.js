import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"
import { Hint } from "react-autocomplete-hint";
import { Link } from 'react-router-dom';
import * as moment from 'moment';

class AddAssignUserstoProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserDetails: [],
            setHintData: [],
            setHintId: [],
            UserData: [],
            ProjectrData: [],
            setHintData1: [],
            RMID: "",
            RMID1: "",
            add: {
                UserFullName: "",
                ProjectName: "",
                ProjectID: "",
                Description: "",
                UserID: [],
                RoleID: [],
                ActiveStatus: '',
                InsertedDate: null,
                AssignFrom: null,
                AssignTo: null

            }
        };

    }
    componentDidMount() {
        this.getData();
        this.getProjectData();
    }
    getData = async () => {
        const res = await axios.get(
            "http://localhost/ScadaClient/api/userdetail?userid=0"
        );
        // console.log(res);
        var hintArray = [];
        var hintId = [];

        res.data.map((a) => hintArray.push(a.FirstName + " " + a.LastName)

        );
        res.data.map((a) => hintId.push(a.UserID));
        this.setState({ UserData: res.data })
        this.setState({ setHintData: hintArray });
        this.setState({ setHintId: hintId });
        //console.log(this.state.setHintData)
    };
    getProjectData = async () => {
        const res = await axios.get(
            "http://localhost/ScadaClient/api/ProjectDetails"
        );
        //console.log(res);
        var hintArray = [];
        var hintId = [];

        res.data.map((a) => hintArray.push(a.ProjectName)

        );

        this.setState({ ProjectrData: res.data })
        this.setState({ setHintData1: hintArray });

        //console.log(this.state.setHintData)
    };

    getUsersData = async () => {
        const res = await axios.get(
            "http://localhost/ScadaClient/api/userdetail?userid=0"
        );
        //console.log(res);
        var hintArray = [];
        var hintId = [];

        res.data.map((a) => hintArray.push(a.FirstName + " " + a.LastName)

        );

        this.setState({ UserData: res.data })
        this.setState({ setHintData1: hintArray });

        console.log(this.state.setHintData)
    };
    changeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name)
        console.log(value)
        if (name == "UserFullName") {

            this.state.UserData.map((user) => {
                var Users = user.FirstName + " " + user.LastName

                if (Users.toUpperCase() == value.toUpperCase()) {
                    console.log(user.UserID)
                    this.setState({
                        RMID: user.UserID
                    })


                }

            })

        }
        else if (name == "ProjectName") {

            this.state.ProjectrData.map((user) => {
                if (user.ProjectName.toUpperCase() == value.toUpperCase()) {
                    console.log(user.ProjectID)
                    this.setState({
                        RMID1: user.ProjectID
                    })


                }

            })

        }

        this.setState({
            add: {
                ...this.state.add,
                [name]: value
            }
        });
    }

    handleChange = date => {
        console.log(date)
        this.setState({
            add: {
                ...this.state.add,
                AssignFrom: date
            }
        });
    }
    handleChange1 = date => {
        console.log(date)
        this.setState({
            add: {
                ...this.state.add,
                AssignTo: date
            }
        });
    }


    handleVAlidations() {


        let validUser = false;
        let validProject = false;

        //Reporting Manager Validations 
        if (this.state.add.UserFullName !== null) {
            this.state.UserData.map((user) => {
                // var Users = user.FirstName+" "+user.LastName
                var value = this.state.add.UserFullName

                var rm = user.FirstName + " " + user.LastName;

                console.log(rm)
                console.log(value)
                if (rm.toUpperCase() == value.toUpperCase()) {
                    console.log("rm validation Success")
                    validUser = true;
                }
                //
            });
        }
        if (this.state.add.ProjectName !== null) {
            this.state.ProjectrData.map((user) => {
                // var Users = user.FirstName+" "+user.LastName
                var value = this.state.add.ProjectName

                console.log(value)
                if (user.ProjectName.toUpperCase() == value.toUpperCase()) {
                    console.log("rm validation Success")
                    validProject = true;
                }
                //
            });
        }

        ////console.log(formIsValid)
        return { validUser, validProject };

    }



    submitHandler = e => {
        e.preventDefault()
        console.log(this.state.RMID)
        this.setState({
            add: {
                ...this.state.add,
                UserID: this.state.RMID,
                ProjectID: this.state.RMID1
            }
        }, () => {
            console.log('Before Converting ')
            console.log(this.state.add)

            var { validUser, validProject } = this.handleVAlidations();
            if (!validUser) {
                alert("Not a Valid Username");
            }

            if (!validProject) {
                alert("Not a Valid Project name");
            }

            if (validUser && validProject) {

                console.log(this.state.add)
                const apiUrl = 'http://localhost/ScadaClient/api/UsersMapToProjects';
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.state.add)
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
                this.props.history.push('/Userlist')
                window.location.reload()

            }
        })

    }
    setGender(event) {
        //console.log(event.target.value);

    }

    setStatus(event) {
        //console.log(event.target.value);
    }

    onCreateProject = () => {
        console.log(this.state.add);
    }




    render() {
        return (
            <body className="font-montserrat">
                
                        <div className="page">

                            <div className="section-body">


                                <ul class="nav nav-tabs page-header-tab">

                                    <li class="nav-item"> <a href="/AssignUserstoProject" class="nav-link active show">Assign User To Project</a></li>
                                    <li class="nav-item"> <a href="/AssignUserToProjectsList" class="nav-link inactive show">Assign User To Projects List</a></li>



                                </ul>


                            </div>
                        <br/>
                        <br/><br/>

                            {/* <div className='center'>
     <h3 className="card-title"  style = {{fontSize:"20px", fontWeight:"bold"}}>Add Map User to Project</h3>

</div>  
                      */}
                            <form onSubmit={this.submitHandler} >
                                <div class="card-body" class="container" style={{ maxWidth: '', marginLeft: "", background: '', borderRadius: '' }}><br />
                                    <div class="row clearfix">
                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" style={{ marginLeft: "30px" }}>
                                                <label class="form-label" style={{ color: "black" }}>User <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>

                                                <Hint options={this.state.setHintData} allowDropDown>
                                                    <input style={{ width: "50%" }}
                                                        className="form-control"
                                                        type="text" name="UserFullName" value={this.state.add.UserFullName} onChange
                                                        ={this.changeHandler}

                                                    />
                                                </Hint>

                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" style={{ marginLeft: "30px" }}>
                                                <label class="form-label" style={{ color: "black" }}>Project Name <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                                <Hint options={this.state.setHintData1} allowDropDown>
                                                    <input style={{ width: "50%" }}
                                                        className="form-control"

                                                        type="text" name="ProjectName" value={this.state.add.ProjectName} onChange
                                                        ={this.changeHandler}

                                                    />
                                                </Hint>

                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" style={{ marginLeft: "30px" }}>
                                                <label class="form-label" style={{ color: "black" }}>Designation</label>
                                                <select name="RoleID" style={{ width: "50%" }}
                                                    className="form-control" style={{ width: "50%" }} value={this.state.add.RoleID} onChange={this.changeHandler}>
                                                    <option value=""></option>
                                                    <option value="1">Team Member</option>
                                                    <option value="2">Team Lead</option>
                                                    <option value="3">Project Lead</option>
                                                    <option value="4">Project Manager</option>
                                                    <option value="5">Delivery Head</option>
                                                    <option value="6">Director</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" style={{ marginLeft: "30px" }}>
                                                <label class="form-label" style={{ color: "black" }}>Discription:</label>
                                                <input type="text" size="30" style={{ width: "50%" }}
                                                    className="form-control" name="Description" value={this.state.add.Description} onChange={this.changeHandler} />

                                            </div>
                                        </div>

                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" style={{ marginLeft: "30px" }}>
                                                <label class="form-label" style={{ color: "black" }}>Assign From</label>
                                                <DatePicker
                                                    wrapperClassName="datepicker"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    selected={this.state.add.AssignFrom}
                                                    onChange={this.handleChange}
                                                    name="DOB"
                                                    dateFormat="MM/dd/yyyy"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" style={{ marginLeft: "30px" }}>
                                                <label class="form-label" style={{ color: "black" }}>Assign To</label>
                                                <DatePicker
                                                    wrapperClassName="datepicker"
                                                    minlength="4" maxlength="12"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    selected={this.state.add.AssignTo}
                                                    onChange={this.handleChange1}
                                                    name="DOB"
                                                    dateFormat="MM/dd/yyyy"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-md-4">
                                            <div class="form-group" style={{ marginLeft: "30px" }}>
                                                <div onChange={this.setStatus.bind(this)} style={{ color: "black" }}>
                                                    <label class="form-label"> Status </label>
                                                    {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}
                                                    <label>Active<input type="radio" value={this.state.ActiveStatus = true} name="ActiveStatus" onChange={this.changeHandler} style={{ marginLeft: "80px" }} /> </label>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="center">

                                            <button className="btn btn-primary" type="submit" style={{ width: "8%", marginRight: "50px", marginTop: "3px", background: "blue" }} onClick={this.onCreateProject}> Save</button>

                                            <button className="btn btn-primary" style={{ width: "8%", height: "95%", marginRight: "50px", background: "blue" }} ><a href="UserList" style={{ color: "white" }}>Back</a></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                   
            </body>
        )
    }
}
export default AddAssignUserstoProject
    ;
const element = <AddAssignUserstoProject></AddAssignUserstoProject>
ReactDOM.render(element, document.getElementById("root"));