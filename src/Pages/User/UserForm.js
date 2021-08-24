import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from 'moment';



import { Link } from 'react-router-dom';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DateofJoining: null,
            DateofRelieving: null,
        }
        this.state = {
            UserID: '',
            HintData: [],
            FirstName: '',
            LastName: '',
            EmpCode: '',
            DOB: null,
            Department: '',
            ReportingManager: '',
            ReportingManagerID: '',
            Username: '',
            Password: '',
            DateofJoining: null,
            DateOfReliving: null,
            Mobile: '',
            AlternatePhone: '',
            Gender: '',
            Address: '',
            EmailID: '',
            ActiveStatus: '',
            RoleID: '',
            Userdata: [],

        }

        if (props.user[0]) {
            var temp = props.user[0]

            temp.ActiveStatus = temp.ActiveStatus == null ? "true" : temp.ActiveStatus.toString()
            this.state = temp
            console.log(this.state)

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        axios.get(
            "http://localhost/ScadaClient/api/userdetail?userid=0"
        ).then((val) => {
            var hintArray = [];

            val.data.map((a) => hintArray.push(a.FirstName + " " + a.LastName));

            this.setState({ HintData: hintArray });

            this.setState({ UserData: val.data })
        })
    }


    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;
        if (name == "ReportingManager") {
            this.state.UserData.map((user) => {
                var Users = user.FirstName + " " + user.LastName

                if (Users.toUpperCase() == value.toUpperCase()) {
                    console.log(user.UserID)
                    this.setState({
                        ReportingManagerID: user.UserID
                    })


                }

            })

        }
        if (name == "Gender") {


            this.setState({
                Gender: event.target.value
            }, () => {
                console.log(this.state.Gender);
            })

        }

        if (name == "ActiveStatus") {

            console.log(event.target.value)
            this.setState({
                ActiveStatus: event.target.value
            }, () => {
                console.log(this.state.ActiveStatus);
                console.log(typeof (this.state.ActiveStatus))
            })

        }
        this.setState({
            [name]: value
        })
    }

    handleVAlidations() {

        //let validUser = true;
        let validRM = false;
        // let validEmp=true;
        // let boolPasswordError = true;
        // console.log(".....................")
        // console.log(this.state.ReportingManager)
        // console.log(this.state.UserName)
        // console.log(this.state.EmpCode)

        //Reporting Manager Validations 
        if (this.state.ReportingManager !== null) {
            this.state.UserData.map((user) => {
                // var Users = user.FirstName+" "+user.LastName
                var value = this.state.ReportingManager

                var rm = user.FirstName + " " + user.LastName;

                console.log(rm)
                console.log(value)
                if (rm.toUpperCase() == value.toUpperCase()) {
                    console.log("rm validation Success")
                    validRM = true;
                }
                //
            });
        }

        ////console.log(formIsValid)
        return { validRM };

    }


    handleSubmit(event) {
        event.preventDefault();
        var { validRM } = this.handleVAlidations();
        console.log('Before Converting ')
        console.log(this.state)
        var s = this.state
        const convertedDOB = moment(s.DOB).format('MM/DD/YYYY');
        s.DOB = convertedDOB.toString();
        const convertedDate = moment(s.DateofJoining).format('MM/DD/YYYY');
        s.DateofJoining = convertedDate.toString()
        const convertedendDate = moment(s.DateOfReliving).format('MM/DD/YYYY');
        s.DateOfReliving = convertedendDate.toString()
        this.setState({
            s
        }, () => {
            console.log('after Converting ')
            console.log(this.state)
        })


        if (!validRM) {
            alert("Not a Valid Reporting Manager");
        }


        if (validRM) {
            console.log(this.state)
            this.props.onFormSubmit(this.state);
            this.setState(this.State);
        }
    }



    setGender(event) {
        console.log(event.target.value);

    }
    handleChange1 = DateofRelieving => {
        console.log('onchange called....')
        console.log(DateofRelieving)
        this.setState({
            DateofRelieving: DateofRelieving,

        });
        
    }
    handleChange2 = DateofJoining => {
        console.log('onchange called....')


        console.log(DateofJoining)
        this.setState({
            DateofJoining: DateofJoining,

        });
    }
    handleChange3 = DOB => {
        console.log('onchange called....')


        console.log(DOB)
        this.setState({
            DOB: DOB,

        });
    }
    onClick() {
      // window.location.reload()
    }
    render() {
        console.log(this.state.DateofRelieving)
        this.state.DateofRelieving = new Date(this.state.DateofRelieving=="Mon Jan 01 1900 00:00:00 GMT+0521 (India Standard Time)"?null:this.state.DateofRelieving)
        this.state.DateofRelieving1=moment(this.state.DateofRelieving).format('MM/DD/YYYY');
        console.log(this.state.DateofRelieving1)
        console.log(this.state.DateofRelieving)
        var DateofRelieving = <DatePicker
            time={false} dateFormat="MMMM d, yyyy"
            onChange={this.handleChange1}
            selected={this.state.DateofRelieving1=="01/01/1970"?null:this.state.DateofRelieving}
            className="form-control" />

        this.state.DateofJoining = new Date(this.state.DateofJoining)
        var DateofJoining = <DatePicker
            selected={this.state.DateofJoining}
            onChange={this.handleChange2}
            dateFormat="MMMM d, yyyy"
            className="form-control" />

        this.state.DOB = new Date(this.state.DOB)
        var DOB = <DatePicker
            selected={this.state.DOB}
            onChange={this.handleChange3}
            dateFormat="MMMM d, yyyy"
            className="form-control"

        />
        return (

            <body className="font-montserrat">
                <div>

                    <div className="page" >
             <br/>
             <br/>

                        <Form onSubmit={this.handleSubmit}>
                            <div class="card-body" class="container"><br />
                                <div class="row clearfix">
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>First Name</label>
                                            <input type="text" size="30" name="FirstName" style={{ width: "63%" }}
                                                className="form-control" placeholder="FirsttName"
                                                value={this.state.FirstName} onChange={this.handleChange} />

                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}
                                        >
                                            <label class="form-label" style={{ color: "black" }}>Last Name</label>
                                            <input type="text" size="30" style={{ width: "63%" }} required onChange={this.handleChange}
                                                className="form-control" name="LastName" value={this.state.LastName} onChange={this.handleChange} />

                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: 'black' }}>Employee Code</label>
                                            <input type="text" size="30" style={{ width: "63%" }}
                                                className="form-control" disabled name="EmpCode" value={this.state.EmpCode} onChange={this.handleChange} />

                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Designation</label>
                                            <select name="RoleID"
                                                className="form-control" style={{ width: "63%" }} value={this.state.RoleID} onChange={this.handleChange}>
                                                <option value="1">Admin</option>
                                                <option value="2">Operator</option>

                                            </select>
                                        </div>
                                    </div>
                                    {/* <div class="col-sm-4 col-md-4">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>Desigination</label>
         <input type="text" name="Role" value={this.state.Role} onChange={this.changeHandler}/> 
     </div>
 </div> */}
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <div style={{ color: "black" }}>
                                                <label class="form-label" >Gender</label>
                                                <label>Male<input type="radio" name="Gender"
                                                    value="M"
                                                    checked={this.state.Gender === "M"} onChange={this.handleChange} style={{ marginLeft: "80px" }} /> </label>
                                                <br />
                                                <label>Female<input type="radio" value="F"
                                                    checked={this.state.Gender === "F"} name="Gender" onChange={this.handleChange} style={{ marginLeft: "60px" }} /> </label>


                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Date of Birth</label>
                                            {/* <input type="date" min='1960-01-01' id="dt" required onChange={this.handleChange}
         className="form-control"  name="DOB" value={this.state.DOB} onChange={this.handleChange}/> 
     */}
                                            {DOB}
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Mobile Number</label>
                                            <input type="text" required onChange={this.handleChange} style={{ width: "63%" }}
                                                className="form-control" size="10" name="Mobile" value={this.state.Mobile} onChange={this.handleChange} />

                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Extn. No</label>
                                            <input type="text" required onChange={this.handleChange} style={{ width: "63%" }}
                                                className="form-control" size="10" name="AlternatePhone" value={this.state.AlternatePhone} onChange={this.handleChange} />

                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Department</label>
                                            <input type="text" required onChange={this.handleChange} style={{ width: "63%" }}
                                                className="form-control" size="30" name="Department" value={this.state.Department} onChange={this.handleChange} />

                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Reporting Manager</label>
                                            {/* <input type="text" 
         className="form-control"  size="30" name="ReportingManager" value={this.state.add.ReportingManager} onChange={this.changeHandler}/> 
      */}
                                            {/* <code>{`[${this.state.setHintData.toString()}]`}</code> */}
                                            <Hint options={this.state.HintData != null ? this.state.HintData : []} allowDropDown>
                                                <input style={{ width: "63%" }} required
                                                    type="text" name="ReportingManager" value={this.state.ReportingManager} onChange
                                                    ={this.handleChange}

                                                />
                                            </Hint>
                                        </div>
                                    </div>
                                    {/* <div class="col-sm-4 col-md-4">
     <div class="form-group" style={{marginLeft:"30px"}}>
         <label class="form-label" style={{color:"white"}}>ReportingManagerId</label>
         <input type="text" required onChange={this.handleChange}
         className="form-control"  size="10" name="ReportingManagerID" value={this.state.ReportingManagerID} onChange={this.handleChange}/> 
     
     </div>
 </div> * */}

                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Username</label>
                                            <input type="text" required onChange={this.handleChange} style={{ width: "63%" }}
                                                className="form-control" disabled size="30" name="Username" value={this.state.Username} onChange={this.handleChange} />

                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Password</label>
                                            <input type="text" style={{ width: "63%" }} name="Password" disabled required minLength={8} maxLength={20}
                                                onChange={this.handleChange}
                                                className="form-control" value={this.state.Password} type="Password" onChange={this.handleChange} />

                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Email ID</label>
                                            <input type="email" required onChange={this.handleChange} style={{ width: "63%" }}
                                                className="form-control" name="EmailID" value={this.state.EmailID} onChange={this.handleChange} />

                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ color: "black", marginLeft: "30px" }}>
                                            <div >
                                                <label>Active<input type="radio" name="ActiveStatus"
                                                    value="true"
                                                    checked={this.state.ActiveStatus === "true"} onChange={this.handleChange} style={{ marginLeft: "80px" }} /> </label>
                                                <br />
                                                <label>In Active<input type="radio" value="false"
                                                    checked={this.state.ActiveStatus === "false"} name="ActiveStatus" onChange={this.handleChange} style={{ marginLeft: "73px" }} /> </label>


                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Date of Joining</label>
                                            {DateofJoining}
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Date of Relieving</label>
                                            {DateofRelieving}
                                        </div>
                                    </div>
                                    <div class="col-sm-4 col-md-4">
                                        <div class="form-group" style={{ marginLeft: "30px" }}>
                                            <label class="form-label" style={{ color: "black" }}>Address</label>
                                            <textarea type="text" required onChange={this.handleChange} style={{ width: "63%" }}
                                                className="form-control" rows="2" cols="50" name="Address" value={this.state.Address} onChange={this.handleChange} />

                                        </div>
                                    </div>
                                    <br />


                                    <Form.Group>

                                        <div class="row clearfix">
                                            <div className='center'>
                                                <Form.Control type="hidden" name="id" value={this.state.UserID} />
                                                <button className="btn btn-primary" type="submit" style={{ width: "9%", marginRight: "50px", marginTop: "3px", background: "blue" }} > Update</button>

                                                <Link to="Viewuser"><button className="btn btn-primary" style={{ width: "8%", height: "92%", marginRight: "50px", background: "blue" }} onClick={this.onClick} >Back</button></Link>

                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                        </Form>

                    </div>
                </div>
            </body>

        )
    }
}

export default EditUser;