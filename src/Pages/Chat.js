import React, { useState } from 'react'
import Header from '../Components/Header'
import Chatbox from '../Components/Chatbox'
import Users from '../Components/Users'
import Drawer from '../Components/Drawer'
import GroupChatModel from '../Components/GroupChatModel'
import EmptyBox from '../Components/EmptyBox'
//import { Chatstate } from '../Context/Chatprovider'
export default function Chat() {
    const {data}=JSON.parse(localStorage.getItem("userInfo"));


const [drawer, setdrawer] = useState(false)
const [groupmodel, setgroupmodel] = useState(false)
const [selectedchat, setselectedchat] = useState();
const [chats, setchats] = useState([])
const [fetch, setfetch] = useState(false)
const [notifications, setnotifications] = useState([]);
  return (
    <>


    <Header name={data.name} avatar={data.avatar} email={data.email} setselectedchat={setselectedchat} userId={data._id} notifications={notifications} setnotifications={setnotifications}  setdrawer={setdrawer}/>
    {drawer&&<Drawer setdrawer={setdrawer} setselectedchat={setselectedchat} chats={chats} setchats={setchats}  token={data.token}/>} 
<div className="flex h-screen antialiased text-gray-800">

<div className="flex flex-row h-full w-full overflow-x-hidden">
<Users  token={data.token} userId={data._id} setmodal={setgroupmodel} selectedchat={selectedchat} setselectedchat={setselectedchat} fetch={fetch}  chats={chats} setchats={setchats} />
{selectedchat?< Chatbox selected={selectedchat} fetch={fetch} token={data.token} userId={data._id} user={data} notifications={notifications} setnotifications={setnotifications}  setfetch={setfetch}/>:<EmptyBox/>}
{ groupmodel && <GroupChatModel token={data.token} userId={data._id} chats={chats} setchats={setchats}  setmodal={setgroupmodel}/>}
</div>
<ul className="colorlib-bubbles2">
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

  

    </>
  )
}
