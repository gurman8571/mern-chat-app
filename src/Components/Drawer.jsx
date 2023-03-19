import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatLoader from './ChatLoader';
import SearchResults from './SearchResults'

import axios from'axios'


export default function Drawer(props) {

const accesschat=async(userId) => {

  try {
    const config={

        headers:{
            Authorization:`Bearer ${props.token}`
        },
    }
    
    const {data}=await axios.post(`http://localhost:5100/api/chat`,{userId},config);

    if ( !props.chats.find((c) => c._id === data._id)) props.setchats([data, ...props.chats]);
        props.setselectedchat(data)
        props.setdrawer(false);
    
} 
catch (error) {
    
}

}


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

    const [search, setsearch] = useState("");
const [loading, setloading] = useState(false)
const [results, setresults] = useState([])
    const submitsearch=async(e)=>{
e.preventDefault();
        if (!search) {
           notify("error","Please fill search feild");  
        }

        try {
            const config={

                headers:{
                    Authorization:`Bearer ${props.token}`
                },
            }
            setloading(true)
            const {data}=await axios.get(`http://localhost:5100/api/user/${search}`,config)
         
            setresults(data.users);
            //console.log(results.users);
            setloading(false);
        } catch (error) {
            
        }
    }
  return (


    <div className="">
         <ToastContainer />
        <>
    {/* Hello world */}
    
    {/* drawer init and toggle */}
    
    {/* drawer component */}
    
    <div
      id="drawer-example"
      className="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform left-0 top-0 -translate-x-full"
      tabIndex={-1}
      aria-labelledby="drawer-label"
      aria-hidden="true"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
      >
        <button >
        <svg
          className="w-5 h-5 mr-2"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        </button>
        Search User
      </h5>
      <button
        type="button"
        onClick={()=>{props.setdrawer(false)}}
        data-drawer-dismiss="drawer-example"
        aria-controls="drawer-example"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="flex ">
  <div className="mb-3 xl:w-96">
    <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
     <form onSubmit={submitsearch} >

         
         <div className="flex">

         <input
        type="text"
        onChange={(e)=>{setsearch(e.target.value)}}
        className="form-control relative flex-auto min-w-0 block w-1/2  mr-2 py-1.5 px-2 text-base font-normal text-gray-700 bg-white border border-indigo-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="enter email or name"
        aria-label="Search"
        aria-describedby="button-addon2"
      />
      <button
        className="btn inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
        type="submit"
        id="button-addon2"
      >
     
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="search"
          className="w-4"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          />
        </svg>
      </button>
         </div>
     
      
   </form>
    </div>
  </div>
  

</div>


{loading?<ChatLoader/>:
(
<>
<div className="flex flex-col space-y-3">
      {results.map((item)=>{

return(

  

  <div className=" px-0.5  w-full border-gray-200 border border-green-300 text-gray-900 rounded hover:bg-green-300 hover:text-white ">
  <div className="h-full flex items-center  p-1 rounded-lg"
  onClick={()=>accesschat(item._id)}>
    <img
      alt="team"
      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
      src={item.avatar}
    />
    <div className="flex-grow">
      <h2 className="capitalize  title-font font-bold">
     {item.name}
      </h2>
      <h3 className=" font-light title-font ">
     {item.email}
      </h3>
     
     
    </div>
  </div>
</div>
)

      })}

    </div>
</>
)
}
    </div>
  </>
  </div>
  )
}
