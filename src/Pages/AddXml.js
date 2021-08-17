import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import {Redirect} from 'react-router-dom';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 class AddXml extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        //User Selected File
          selectedFile: null,
        //ProgressBar Indication Value
          loaded:0,
        //List of Files that Uploaded
          listOfPictires:[],
        //Error while Uploading File ex:Same Name with Existed file
          error: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		
    }

    componentDidMount(){
        //Importing All Uploading File ina Specified Location
    //    this.importingFiles();
    }
  


  //  // Dynamic Importing of Files------------------------
  //   importingFiles(){

  //       function importAll(r) {
  //        return r.keys().map(r);
  //       }

  //       //Based on Location importAll Files ---   Location /src/Pictures
  //       var images = importAll(require.context('../Pictures', false, ));
    
  //       //Setting ListFiles to state
  //       this.setState({
  //           listOfPictires:images},() => {
  //           console.log(this.state.listOfPictires)
  //         })    
  //     }


    //Form Handle Submit
    handleSubmit (evt) {
		evt.preventDefault();
	}
	
    //Change in the Choose File TextField 
	handleInputChange (evt) {
    
        //Setting State error and UserSelected File to the State
		this.setState({
            error:false,
			selectedFile: this.fileInput.value
				? this.fileInput.files[0]
				: ''
		},()=>{
            //After Setting State async
            //Map listofFiles from Folder 
            //this is to validate the Selected File that name is Existed or not 
     this.state.listOfPictires.map((listImage)=>{
        var name = listImage.default.replace("/static/media/","");
          name  =  name.split(".");
          var userIMage = this.state.selectedFile.name.split(".");
          //Checking Name is Existed or not 
          if(name[0]  === userIMage[0])
          {
              //Serring Error to State
               this.setState({error:true})
          }
         });
        });
	}


    //OnUpdate Click
    onClickHandler = () => {
        //If error false -- Post File to the Spcified Location thru Api
        if(this.state.error === false){
          const data = new FormData() 
          data.append('file', this.state.selectedFile)
        
            //Backend Url --
            // http://localhost:8080/uploadFile
            ///Local url----
            //http://localhost:8000/uploadFile

         axios.post("http://localhost:8000/uploadFile", data, { 
          onUploadProgress: ProgressEvent => {
            //ProgressBar Setting
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          }) },
            //Successfull Posting 
            }).then(res => { 
            //Update listOfFiles 
            this.importingFiles();
            console.log(res.statusText)
            //Show Toast Message
            toast.success('upload success')

            //Error in posting
            }).catch(err => { 
                //set Default Vlaues
                this.fileInput.value = null;
                this.setState({
                    selectedFile:null,
                })
                //Show toast Message
                 toast.error('Upload failed')
            })
        //Validation Error     
        }else
        {
            //Set Values to Defaults
            this.fileInput.value = null;
            this.setState({
                selectedFile:null,
            })
            //Show Validation Error Message
            toast.error('File Name is Already Existed Try another file .');
        }
    }


    //On Click Delete -----
    onClickDelete = (file) => {
      console.log(file)
      axios.post("http://localhost:8000/deleteFile",{"file":file}, { 
          }).then(res => { 
          console.log(res.data)
            if(res.data.deleted == true){
              toast.success('Deleted  successfully')
              this.importingFiles();
            }else{
              toast.error('Error in Deleting File')
             // this.importingFiles();
            }
    }).catch(err => { 
       toast.error('Delete failed')
  })
  }


    //On Click View -----
    onClickView = (val) => {
      console.log(val)
    }


    render() {
      return (
         
        <div>
        <div class="container-fluid">
      <div class="row">

        
      <div class="col-md-2 col-xs-5 orange">
      
        </div>


        <div class="col-md-10 col-xs-7 green">
        <br></br><br></br>
        <div class="card text-black bg-light mb-3">
        <div class="card-header">Upload Xml</div>
          <div class="card-body">
	  
	          <div id="root">
                <form onSubmit={this.handleSubmit}>
				    <label>
					<input  type="file" name="file"
						onChange={this.handleInputChange}
						ref={input => this.fileInput = input}
						className="form-control" /></label><br />
                {/* //Show only when user select File */}
				   {
				     	this.state.selectedFile	&&
                          <div>
                            <br></br>
                            <br></br>
                               <div class="form-group" style={{width:400}}>
                                   <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
                                </div><br></br>
                            <button className="btn btn-primary btn-lg"onClick={() => this.onClickHandler()}>Upload </button>
                          </div>
				   }

			      </form>
            </div></div></div>



{/* 
                         <br></br><br></br><br></br>
                          <h4>List of Files in /src/Pictures...   {this.state.listOfPictires.length}</h4>
                           <div><table class="table table-bordered">
                             <th scope="col">Sl.no</th> 
                             <th scope="col">File Name</th>
                             <th scope="col">Type</th> 
                             <th scope="col">View</th>
                             <th scope="col">Delete</th>
                             {this.state.listOfPictires.length == 0 ?  null : this.state.listOfPictires.map((item, i) => {
                 var name = item.default.replace("/static/media/","");
                 //   name = name.replace(".pagex","");
                  name  =  name.split(".");
                 return  (  
                 <tr><th scope="row">{i+1}</th><td>{name[0]}</td><td>{name[2]}</td>
                 <td><button className="btn btn-secondary btn-sm"onClick={() => this.onClickView(name[0])}>View</button></td>
                 <td className='opration'> <button  className="btn btn-secondary btn-sm"  onClick={() => this.onClickDelete(name[0]+ "."+name[2])}>Delete</button></td></tr>)
       })}

                                  </table></div> */}
                           
                          
                         <div class="form-group"><ToastContainer/></div></div></div></div></div>
                         
      
      );
    }
  }



  export default AddXml;
