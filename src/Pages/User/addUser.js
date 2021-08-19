import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Hint } from "react-autocomplete-hint";
import axios from "axios";
import "./styles.css";
import * as moment from 'moment';

class addUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserDetails: [],
            hintData: [],
            setHintData: [],
            setHintId: [],
            text: "",
            setText: "",
            UserData: [],
            RMID: "",
            Emperror: "",
            Reportingerror: "",
            Usererror: null,
            add: {

                FirstName: '',
                LastName: '',
                EmpCode: '',
                Department: '',
                ReportingManager: '',
                ReportingManagerID: '',
                UserName: '',
                Password: '',
                DateofJoining: null,
                DateofRelieving: '',
                Mobile: '',
                AlternatePhone: '',
                Gender: '',
                Address: '',
                EmailID: '',
                ActiveStatus: '',
                RoleID: '',
                InsertedBy: '1',
                InsertedDate: "2021-05-06T00:00:00",
                ModifiedDate: "2021-05-06T00:00:00",
                DOB: null,




            }

        };

    }

    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        const res = await axios.get(
            "http://localhost/ScadaClient/api/userdetail?userid=0"
        );
        //console.log(res);
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
    changeHandler = e => {

        const repo = "ReportingManagerID"
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value)
        //to fetch the user name

        if (name == "UserName") {
            this.state.UserData.map((user) => {

                if (user.Username !== value) {
                    this.setState({
                        [name]: value
                    })
                }
                else if (user.Username == value) {
                    //alert("user name should be unique")
                }
            })
        }
        // to fetch the emp code
        if (name == "EmpCode")
        // console.log(this.state.UserData)
        {
            this.state.UserData.map((user) => {
                //console.log(user)
                if (user.EmpCode !== value) {
                    this.setState({
                        [name]: value
                    })
                }

            })
        }



        //to fetch the userId--
        if (name == "ReportingManager") {
            this.state.UserData.map((user) => {
                var Users = user.FirstName + " " + user.LastName
                console.log("for test ID")
                if (Users.toUpperCase() == value.toUpperCase()) {
                    console.log(user.UserID)

                    this.setState({
                        RMID: user.UserID
                    }, () => {
                        console.log('..................')
                        console.log(this.state.RMID)
                    });

                }
            })
        }

        this.setState({
            add: {
                ...this.state.add,
                [name]: value
            }
        });
        //console.log(this.state.DOB)
    }


    //DoB HAndler ------
    handleChange = date => {


        this.setState({
            add: {
                ...this.state.add,
                DOB: date,
            }
        });
    }

    //Date of JOining Handler
    handleChange1 = date => {

        this.setState({
            add: {
                ...this.state.add,
                DateofJoining: date,

            }
        });
    }

    handleChange2 = date => {
        console.log(date)
        this.setState({
            DateofRelieving: date,
        });
    }

    ///handle validation
    handleVAlidations() {
        let validUser = true;
        let validRM = false;
        let validEmp = true;
        //let validRMId=false;
        // let boolPasswordError = true;
        console.log(".....................")
        console.log(this.state.add.ReportingManager)
        console.log(this.state.add.UserName)
        console.log(this.state.add.EmpCode)
        //Reporting Manager Validations 
        if (this.state.add.ReportingManager !== null) {
            this.state.UserData.map((user) => {
                // var Users = user.FirstName+" "+user.LastName
                var value = this.state.add.ReportingManager
                var rm = user.FirstName + " " + user.LastName;

                // console.log(rm)
                // console.log(value)
                if (rm.toUpperCase() == value.toUpperCase()) {
                    //console.log("rm validation success")
                    validRM = true;
                }
                var value1 = this.state.add.ReportingManagerID;
                var rmid = user.UserID;

                console.log(value1)
                console.log(rmid)
                if (rmid == value1) {
                    //console.log("rm validation success")
                    validRM = true;
                }

                //
            });
        }
        ///Reporting Manager Validations 
        // if(this.state.add.ReportingManagerID !== null)        
        // {
        //     this.state.UserData.map((user)=>{
        //         // var Users = user.FirstName+" "+user.LastName
        //          var value =this.state.add.ReportingManagerID ;
        //          var rmid =user.UserID;

        //          console.log(value)
        //          console.log(rmid)
        //         if( rmid == value)
        //         {
        //             //console.log("rm validation success")
        //             validRMId = true;
        //         }

        //         //
        //       });
        //  }
        //User Name Validation
        if (this.state.add.UserName !== null) {
            console.log(this.state.add.UserName)
            this.state.UserData.map((user) => {
                //console.log("Verify User")
                if (user.Username.toUpperCase() == this.state.add.UserName.toUpperCase()) {
                    validUser = false
                }
            })
        }

        // Emp code Validation
        if (this.state.add.EmpCode !== null) {
            console.log(this.state.add.EmpCode)
            this.state.UserData.map((user) => {
                console.log("Verify Empcode")
                if (user.EmpCode.toUpperCase() == this.state.add.EmpCode.toUpperCase()) {
                    validEmp = false

                }
            })
        }


        return { validUser, validRM, validEmp };

    }



    submitHandler = e => {
        e.preventDefault()
        console.log(this.state.RMID)

        this.setState({
            add: {
                ...this.state.add,
                ReportingManagerID: this.state.RMID
            }
        })

        console.log(this.state.add.UserName)

        var { validUser, validRM, validEmp } = this.handleVAlidations();
        console.log(validRM)
        console.log(validUser)
        if (!validUser || !validRM || !validEmp) {
            alert("From has a Error")

        }

        if (!validUser) {

            this.setState({

                Usererror: " * UserName Should Be unique"
            }, () => {

            })

        }

        if (!validRM) {
            this.setState({

                Reportingerror: " * Not Valid Reporting Manager"
            }, () => {

            })
        }
        if (!validEmp) {
            this.setState({

                Emperror: " * Employee Code should Be Unique"
            }, () => {

            })
        }
        if (validUser && validRM && validEmp) {
            const apiUrl = 'http://localhost/ScadaClient/api/userdetails';
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

                    })
                },
                    (error) => {
                        this.setState({ error });
                    }
                )

            this.props.history.push('/ViewUser')
            window.location.reload()

        }


    }


    setGender(event) {
        //console.log(event.target.value);

    }

    setStatus(event) {
        //console.log(event.target.value);
    }




    render() {
        return (


            <div className="page">

                <div className="card-body">


                    <ul class="nav nav-tabs page-header-tab">
                        <li class="nav-item"><Link to="/addUser" class="nav-link active show">Add User</Link></li>

                        <li class="nav-item"><Link to="/viewUser" class="nav-link inactive show" >View User</Link></li>
                    </ul>


                </div>



                <form onSubmit={this.submitHandler} width="innerwidth">

                    <br />

                    <div class="card-body" class="container"><br />

                        <div class="row clearfix" >
                            <div class="col-sm-4 col-md-4" >
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>First Name <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                    <input type="text" style={{ width: "56%" }} size="30" name="FirstName" required className="form-control"
                                        maxLength="35" value={this.state.add.FirstName} onChange={this.changeHandler} />

                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Last Name <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                    <input type="text" style={{ width: "56%" }} size="30" required maxLength="35" autoComplete="off"
                                        className="form-control" name="LastName" value={this.state.add.LastName} onChange={this.changeHandler} />


                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Employee Code <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                    <input type="text" style={{ width: "56%" }} autoComplete="off" size="10" required maxLength="15"
                                        className="form-control" name="EmpCode" value={this.state.add.EmpCode} onChange={this.changeHandler} />
                                    <span style={{ fontWeight: "", color: "red" }}>{this.state.Emperror}</span>
                                </div>
                            </div>


                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Designation</label>
                                    <select name="RoleID"
                                        className="form-control" style={{ width: "56%" }} value={this.state.add.RoleID} onChange={this.changeHandler}>
                                        <option value=""></option>
                                        <option value="1">Admin</option>
                                        <option value="2">Operator</option>

                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <div onChange={this.setGender.bind(this)} style={{ color: "black" }}>
                                        <label class="form-label" >Gender</label>
                                        {/* <input type="text" name="Gender" value={this.state.add.Gender} onChange={this.changeHandler}/> */}
                                        <label>Male<input type="radio" value={"Male"} name="Gender" onChange={this.changeHandler} style={{ marginLeft: "80px" }} /> </label>
                                        <br />
                                        <label>Female<input type="radio" value={"Female"} name="Gender" onChange={this.changeHandler} style={{ marginLeft: "60px" }} /> </label>

                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <div onChange={this.setStatus.bind(this)} style={{ color: "black" }}>
                                        <label class="form-label"> Status </label>
                                        {/* <input type="text" name="PhoneNumber" value={this.state.add.Company} onChange={this.changeHandler}/>  */}

                                        <label>Active<input type="radio" value={this.state.ActiveStatus = true} name="ActiveStatus" onChange={this.changeHandler} style={{ marginLeft: "80px" }} /> </label>



                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Date of Birth</label>

                                    <DatePicker
                                        wrapperClassName="datepicker"
                                        
                                        autoComplete="off"
                                        selected={this.state.add.DOB}
                                        onChange={this.handleChange}
                                        name="DOB"
                                        dateFormat="MM/dd/yyyy"
                                    />

                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Mobile Number <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                    <input type="text" required maxLength="10" style={{ width: "56%" }}
                                        className="form-control" size="10" name="Mobile" value={this.state.add.Mobile} onChange={this.changeHandler} />

                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Extn. No</label>
                                    <input type="text" maxLength="10" style={{ width: "56%" }}
                                        className="form-control" size="10" name="AlternatePhone" value={this.state.add.AlternatePhone} onChange={this.changeHandler} />

                                </div>
                            </div>

                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Department</label>
                                    <input type="text" style={{ width: "56%" }} maxLength="30"
                                        className="form-control" size="30" name="Department" value={this.state.add.Department} onChange={this.changeHandler} />

                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Reporting Manager <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                    <Hint options={this.state.setHintData} allowDropDown>
                                        <input type="text" style={{ width: "56%" }} maxLength="30" autoComplete="off"
                                            className="form-control" size="30" name="ReportingManager" value={this.state.add.ReportingManager} onChange={this.changeHandler} /></Hint>
                                    <span style={{ fontWeight: "", color: "red" }}>{this.state.Reportingerror}</span>
                                </div>
                            </div>


                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Username <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                    <input type="text" required maxLength="30" style={{ width: "56%" }}
                                        className="form-control" size="30" name="UserName" value={this.state.add.UserName} onChange={this.changeHandler} />
                                    <span style={{ fontWeight: "", color: "red" }}>{this.state.Usererror}</span>
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Password <span style={{ fontWeight: "bold", color: "red" }} >*</span></label>
                                    <input type="text" name="Password" style={{ width: "56%" }} required minLength={8} maxLength={20}
                                        className="form-control" value={this.state.add.Password} type="Password" onChange={this.changeHandler} />

                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Email ID</label>
                                    <input type="email" style={{ width: "56%" }} className="form-control" maxLength="20" name="EmailID" value={this.state.add.EmailID} onChange={this.changeHandler} />

                                </div>
                            </div>


                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}} >
                                    <label class="form-label" style={{ color: "black" }}>Date of Joining</label>
                                    <DatePicker
                                        wrapperClassName="datepicker"
                                        autoComplete="off"
                                        selected={this.state.add.DateofJoining}
                                        onChange={this.handleChange1}
                                        name="DateofJoining"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </div>
                            </div>
                            <div class="col-sm-4 col-md-4">
                                <div class="form-group" style={{}}>
                                    <label class="form-label" style={{ color: "black" }}>Address</label>
                                    <textarea type="text" required style={{ width: "56%" }}
                                        className="form-control" rows="2" cols="50" name="Address" value={this.state.add.Address} onChange={this.changeHandler} />

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="center">

                        <button className="btn btn-primary" type="submit" style={{ background: "blue" }}> Save</button>

                        <Link to={{ pathname: './Viewuser' }}> <button className="btn btn-info" style={{ background: "blue" }} >Back</button></Link>
                    </div>
                </form>


            </div>


        )
    }
}
export default addUser;
const element = <addUser></addUser>
ReactDOM.render(element, document.getElementById("root"));
