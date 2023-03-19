
import {Link} from 'react-router-dom'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';

export default function Register() { 
const [name, setname] = useState("")
const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [cnfrmpass, setcnfrmpass] = useState("")
const navigate=useNavigate();
  const notify = (type,msg) => {

    if (type==="error") {
      toast.error(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
      
    }
    else if(type==="success"){
      toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  }

const onsubmit=async(e)=>{
e.preventDefault();

if (!email||!password||!name||!cnfrmpass) {
  notify("error","Please fill mandatiry feilds");
  }

   if(password !== cnfrmpass ){

    notify("error","Password and confirm password not  match");
  }
  else{
    //notify("success",`${email},${password}`);

    try {

      
const formdata=new FormData();

formdata.append("name",name);

formdata.append("email",email);
formdata.append("password",password);

        console.log(formdata);
const {data}= await axios.post("http://localhost:5100/api/user/register", {
    name,
    email,
    password,

  })
  localStorage.setItem("userInfo", JSON.stringify(data));
  navigate("/chats");
//localStorage.setItem("user",JSON.stringify(data)); 
    } catch (error) {

    notify("error",error.response.data.ErrorMsg);
    }
  }

}

if (localStorage.getItem("userInfo")) {
  return  <Navigate to="/chats" />
 }
  return (

    <>
 
 <ToastContainer />
  <div className="main-w3layouts wrapper">
    <h1>Register to start chat </h1>
    <div className="main-agileinfo">
      <div className="agileits-top">
      <form onSubmit={onsubmit} >
        
            <label className="text-white my-2 ">Username*  </label>
          <input
            className="text form-control"
            type="text"
            name="Username"
            placeholder="Username"
            required=""
            onChange={(e)=>{setname(e.target.value)}}
          />
        
        <label className="text-white my-2 ">  Email*  </label>
          
        <input
            className="text form-control"
            type="email"
            name="email"
            placeholder="Email"
            required=""
            onChange={(e)=>{setemail(e.target.value)}}
          />
         

         <label className="text-white my-2 ">Password*  </label>
        
          <input
            className="text form-control"
            type="password"
            name="password"
            placeholder="Password"
            required=""
            onChange={(e)=>{setpassword(e.target.value)}}

          />
           <label className="text-white my-2 ">Confirm Password*  </label>
        
        <input
          className="text form-control"
          type="password"
          name="password"
          placeholder="Password"
          required=""
          onChange={(e)=>{setcnfrmpass(e.target.value)}}

        />
          
          <br />
          <div className="wthree-text">
            <label className="anim">
              <input type="checkbox" className="checkbox" required />
              <span>I Agree To The Terms &amp; Conditions</span>
            </label>
            <div className="clear"> </div>
          </div>
          <input type="submit" defaultValue="SIGNUP" />
        </form>
        <span className="text-white">
          Already have an Account? <Link to="/login"> Login Now!</Link>
        </span>
      </div>
    </div>
    {/* copyright */}
    <div className="colorlibcopy-agile">
      <span>
        © 2022 Chat-A-Five All rights reserved | 
      
      </span>
    </div>
    {/* //copyright */}
    <ul className="colorlib-bubbles">
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
      <li />
    </ul>
  </div>
  {/* //main */}
</>

  )
}
