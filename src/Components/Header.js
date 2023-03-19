import React, { useState } from 'react'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

import ProfileModal from './ProfileModal'

export default function Header(props) {

const [menu, setmenu] = useState(false)
const [popup, setpopup] = useState(false);
const [notishow, setnotishow] = useState(false);


  return (
    <>
    <>
{/*modal*/}
{popup?<ProfileModal name={props.name} email={props.email} avatar={props.avatar} setpopup={setpopup}/>:<></>}

  {/* Nav menu with user information */}
  <>
  {/* Required meta tags */}
 
  {/* Bootstrap CSS */}

  <nav className="bg-gray-100 text-black m-2">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* Mobile menu button*/}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {/*
      Icon when menu is closed.

      Heroicon name: outline/bars-3

      Menu open: "hidden", Menu closed: "block"
    */}
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          {/*
      Icon when menu is open.

      Heroicon name: outline/x-mark

      Menu open: "block", Menu closed: "hidden"
    */}
          <svg
            className="hidden h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex flex-shrink-0 items-center">
          <img
            className="block h-8 w-auto lg:hidden"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <img
            className="hidden h-8 w-auto lg:block"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <button
            onClick={()=>{

           props.setdrawer(true);
            }}
              href="#"
              className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
              aria-current="page"
            >
             <i className="fa-solid fa-magnifying-glass"></i> Search
            </button>
            
          </div>
        </div>
        <div className="text-center lg:text-2xl font-bold py-1 lg:mx-96 md:text-xl md:mx-64 sm:mx-32">Chat-A-Five</div>
      </div>
    
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    
        <button
          type="button"
          onClick={()=>setnotishow(!notishow)}
          className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
            <NotificationBadge count={props.notifications.length} effect={Effect.ROTATE_X}/>
          
          <span className="sr-only">View notifications</span>
          {/* Heroicon name: outline/bell */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
         
        </button>
        
        {/* Profile dropdown */}

      {
        notishow
        
        && 
        
        <>
        {
          <div
  className="absolute right-0 z-10 mt-32 w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  role="menu"
  aria-orientation="vertical"
  aria-labelledby="user-menu-button"
  tabIndex={-1}
>


  {
  
  props.notifications.length>0?
  props.notifications?.map((item)=>{
    return(


!item.chat.isGroupChat?

<span key={item.chat._id} className="p-2 flex justify-center cursor-pointer"

onClick={()=>{props.setselectedchat(item.chat)}}
>
   {props.userId===item.chat.users[1]._id?item.chat.users[0].name:item.chat.users[1].name} send a message </span>:<><span  key={item.chat._id} className="p-2 flex justify-center"> {item.chat.chatName} send a message </span></>


    )

  })
  :
  <b className="p-2 flex justify-center cursor-pointer">No notifications </b>
  }
 
 

  
</div>
}
        </>

        
      }

        <div className="relative ml-3">
          <div>
            <button
              type="button"
             onClick={()=>{setmenu(!menu)}}
              className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"

                src= {props.avatar} alt=""
              />
            </button>
          </div>
          {/*
      Dropdown menu, show/hide based on menu state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    */}

    {menu?
<>   <div
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-100 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex={-1}
          >
            {/* Active: "bg-gray-100", Not Active: "" */}
            <button
              href="#"
              onClick={()=>setpopup(true)}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
             
              id="user-menu-item-0"
              
            >
              Your Profile
            </button>
           
            <button
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-2"
            >
              Sign out
            </button>
          </div></>:
          <span></span>    
}
       
        </div>
      </div>
    </div>
  </div>
  {/* Mobile menu, show/hide based on menu state. */}
  <div className="sm:hidden" id="mobile-menu">
    <div className="space-y-1 px-2 pt-2 pb-3">
      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
      <a
        href="#"
        className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
        aria-current="page"
      >
        Dashboard
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Team
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Projects
      </a>
      <a
        href="#"
        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      >
        Calendar
      </a>
    </div>
  </div>
</nav>

  

  

  {/* Optional JavaScript */}
  {/* jQuery first, then Popper.js, then Bootstrap JS */}
</>

</>

    </>
  )
}
