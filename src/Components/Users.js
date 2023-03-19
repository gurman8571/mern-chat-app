import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from'axios'
import { useEffect } from 'react';

export default function Users(props) {
const [loading, setloading] = useState(false)
const fetchchats=async()=>{
  setloading(true); 

  try {
    const config={

        headers:{
            Authorization:`Bearer ${props.token}`
        },
    }
  
    const {data}=await axios.get(`http://localhost:5100/api/chat/chats`,config)
      
     
   props. setchats(data.chats);
   setloading(false); 
   
  
} 
catch (error) {
    
}


}
useEffect(() => {
  fetchchats();
}, [props.fetch])


  return (
    <><>
    <div className="flex flex-col  h-full p-4 w-1/3">
  <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-10">
    <div className="flex flex-col h-full overflow-x-auto mb-4">
    {

      loading?

      <ul>
  <li className="text-xl font-bold py-2 px-4">Chats<button onClick={()=>props.setmodal(true)} className="float-right button bg-green-600 text-white px-6 py-1 rounded"> <i className="fa-solid fa-plus"></i> create group</button> </li>
         
  <br />
        <hr/>
  <li >
    <br /><br /><br /><br /><br />

  <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20">
    <div className="flex animate-pulse flex-row items-center h-full space-x-5">
      <div className="flex flex-col space-y-3">
        <div className="w-64 bg-gray-300 h-16 rounded-md "></div>
        <div className="w-64 bg-gray-300 h-16 rounded-md "></div>
        <div className="w-64 bg-gray-300 h-16 rounded-md "></div>
        <div className="w-64 bg-gray-300 h-16 rounded-md "></div>
        <div className="w-64 bg-gray-300 h-16 rounded-md "></div>
    
      </div>
    </div>
  </div> 

          </li>
      </ul>
  
   :<ul>
  <li className="text-xl font-bold py-2 px-4">Chats<button onClick={()=>props.setmodal(true)} className="float-right button bg-green-600 text-white px-6 py-1 rounded"> <i className="fa-solid fa-plus"></i> create group</button> </li>
        
        
        
        <br />
        <hr/>
        
      
        <br />
         {props.chats.map((chat)=>{

          return(

            <li className={`flex justify-between items-center  mt-2 w-96 p-2 hover:shadow-lg rounded cursor-pointer transition
                    ${chat._id === props.selectedchat?._id ?"bg-green-400 text-white":"bg-white"}
            
            ` }
            
            
            key={chat._id}>
            <div className="flex ml-2"
         
            >
              {" "}
              <img
                src={
                  chat.isGroupChat?
                      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvltzhUkRmPc2DPUXGMoV7x5YOCEJBqwrXA&usqp=CAU`
                      :
                  

                    props.userId===chat.users[1]._id?chat.users[0].avatar:chat.users[1].avatar
                  }


                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col ml-2"
                 onClick={()=>{  
                console.log(props.selectedchat);
                  props.setselectedchat(chat)}}
              >
                {" "}
                <span className="font-medium ">
                 { chat.isGroupChat ==false ?
                 props.userId===chat.users[1]._id?chat.users[0].name:chat.users[1].name
                 
                 
                 :chat.chatName}
                </span>{" "}
                <span className={`text-sm truncate w-32 ${chat._id === props.selectedchat?._id ?"text-white":"text-gray-500"}}`}>
                        {chat._id === props.selectedchat?._id ?"" :chat.latestMessage?.content?chat.latestMessage.content:"tap to chat!"}     
                </span>{" "}
              </div>
            </div>
            <div className="flex flex-col items-center">
              {" "}
             
              <i className="fa fa-star text-green-400" />{" "}
            </div>
          </li>
          )
         })} 
         
      
        </ul>
}
    </div>
  </div>
</div>
                         
    {/**/}
  </>
  
    
  </>
  )
}
