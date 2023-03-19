import React from 'react'
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';


export default function GroupChatModel(props) {
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
  

     const [users, setusers] = useState([])
  
  
     

      //const navigate=useNavigate();
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

    const getusers=async()=>{
        const config={

            headers:{
                Authorization:`Bearer ${props.token}`
            },
        }
        const{data}=await axios.get(`http://localhost:5100/api/user/g`,config)

        setusers(data.users);
        
       
        //console.log(options);   
    }

const options=[];

users.map((item)=>{
    const obj={
     value:item._id,
     label:item.name
    }
    options.push(obj);
 })
 
 

   
      
const change=(selectedOption)=>{

    const data=("change", selectedOption);
    setSelectedUsers(data);
}

const submit=async(e)=>{

    e.preventDefault();

   if (!groupChatName || selectedUsers.length<=0) {
notify("error","Please fill mandatiry feilds");
}
else{


    try {
    const config={

        headers:{
            Authorization:`Bearer ${props.token}`
        },
    }
    const{data}=await axios.post(`http://localhost:5100/api/chat/create/groupChat` ,{
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u.value)),
      },
      config );
      props.setchats([data, ...props.chats]);
      props.setmodal(false)
      notify("success","Group chat created successfully");
    
    
}
catch(error)
{
    notify("error",error.response.data.Errmsg);
}
}
}

useEffect(() => {
getusers();
}, [])


    return (

<div>
<ToastContainer />
<div
    className="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
>
   
<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
               <h2 className="text-gray-900 font-bold text-xl">Create Group chat</h2>
               <hr />
               <br />
                <form className="w-full max-w-lg" onSubmit={submit}>
                <div className="flex flex-wrap -mx-3 mb-6">
<div className="w-full px-3">
<label
className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
htmlFor="grid-password"
>
Group name*
</label>
<input
className="bg-white border border-blue-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 outline-none focus:outline-none focus:border border-gray-200 block w-full p-2.5 "
type="text"
onChange={(e) => setGroupChatName(e.target.value)}
placeholder="Chat name"
required
/>

</div>
</div>

<div className="flex flex-wrap -mx-3 mb-6">
<div className="w-full px-3">
<label
className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
htmlFor="grid-password"
>
Members*
</label>
<Select 

options={options}
 isMulti
 
onChange={change}
 />

</div>
</div>

<div className="flex flex-wrap -mx-3 mb-2">
<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

</div>
<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">



</div>
<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

</div>
</div>
<br />
<button type="submit" className="btn   bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded">
Create Group
</button>
<button type="button" className="btn   float-right  bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"

onClick={()=>props.setmodal(false)}
>
Close
</button>
</form>

                </div>
            </div>
        </div>
    </div>
    <div />

</div>
</div>
      )
}

