import React, { useState } from 'react'
import { useEffect } from 'react'
import '../css/Chatbox.css'
import axios from 'axios'
import io from 'socket.io-client'

const EndPoint = "http://localhost:5100";
var socket, selectedchatCompare;

export default function Chatbox(props) {
  const [messages, setmessages] = useState([]);
  const [newmessage, setnewmessage] = useState("");
  const [socketConnected, setsocketConnected] = useState(false)
  const [typing, settyping] = useState(false);
  const [istyping, setistypting] = useState(false);
  const [loading, setloading] = useState(false)

  //fetchmesages func
  const fetchchats = async () => {
setloading(true);
    const config = {

      headers: {
        Authorization: `Bearer ${props.token}`
      },
    }


    const { data } = await axios.get(`http://localhost:5100/api/message/${props.selected?._id}`, config);
    setmessages(data);
    setloading(false);
    socket.emit('join chat', props.selected?._id);
  }


  //send mesage func
  const sendmessage = async (e) => {
    socket.emit("stop typing", props.selected._id)
    //e.preventDefault();
    const config = {

      headers: {
        Authorization: `Bearer ${props.token}`
      },
    }


    const { data } = await axios.post(`http://localhost:5100/api/message/`,

      {
        chatId: props.selected._id,
        content: newmessage
      },
      config);
    socket.emit("new message", data);
    setmessages([...messages, data]);

    setnewmessage("");
  }


  //useeffects
  useEffect(() => {

    socket = io(EndPoint);
    socket.emit("setup", props.user);
    socket.on('connected', () => setsocketConnected(true))
    socket.on('typing', () => setistypting(true));
    socket.on('stop typing', () => setistypting(false));

  }, []);

  useEffect(() => {
    fetchchats()
    selectedchatCompare = props.selected
  }, [props.selected])


  useEffect(() => {


    socket.on("message recieved", (newMessageRecieved) => {

      if (!selectedchatCompare || // if chat is not selected or doesn't match current chat
        selectedchatCompare._id !== newMessageRecieved.chat._id) {
       
          //setit in the notifications 
          if (!props.notifications.includes(newMessageRecieved)) {
            props.setnotifications([newMessageRecieved, ...props.notifications]);
            props.setfetch(!props.fetch);
            console.log(`noti`);
            console.log(props.notifications);
            
          }

      }
      // if chat is not selected or doesn't match current chat

      else {
        //console.log('new one');
        setmessages([...messages, newMessageRecieved]);
      }

    })
  })

  const typingHandler = (e) => {

    setnewmessage(e.target.value);
    //typing indicator logic 
    if (!socketConnected) {
      return;
    }
    if (!typing) {
      settyping(true);
      socket.emit("typing", props.selected._id);
    }
    //debounce if inactivity call the socket not typing
    let lastTypingTime = new Date().getTime();
    var timerLength = 4000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      //if diff is more than timer length call scket stop typing
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", props.selected._id);
        settyping(false);
      }
    }, timerLength);

  }

  return (
    <>
      <>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        {
        
        loading?
        <>
        <div class="lds-ring m-auto"><div></div><div></div><div></div><div></div></div>
        </>
        :
        <>
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-1 col-end-12 p-3 rounded-lg">
                    <div className="text-xl font-bold py-2 px-4">
                      <div className="flex flex-row mb-2">
                        <img className="h-8 w-8 rounded-full" src={
                          props.selected?.isGroupChat ?
                            `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvltzhUkRmPc2DPUXGMoV7x5YOCEJBqwrXA&usqp=CAU`
                            :
                            props.userId === props.selected?.users[1]._id ? props.selected?.users[0].avatar : props.selected?.users[1].avatar}

                          alt="" />
                        <span className="px-4 pt-1">
                          {
                            props.selected.isGroupChat ?
                              props.selected?.chatName
                              : props.userId === props.selected?.users[1]._id ? props.selected?.users[0].name : props.selected?.users[1].name
                          }
                        </span>
                      </div>
                      <hr className="text-gray-500 " /></div>
                  </div>
                  {messages.map((item) => {
                    return <>
                      <div className={item.sender._id === props.userId ? `col-start-6 col-end-13 p-3 rounded-lg` : `col-start-1 col-end-8 p-3 rounded-lg`}>
                        <div className={item.sender._id === props.userId ? `flex items-center justify-start flex-row-reverse` : `flex flex-row items-center`}>
                          <img className="h-8 w-8 rounded-full" src={
                            item.sender.avatar}
                            alt="" />
                          <div className={item.sender._id === props.userId ? `relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl` : `relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl`}>
                            <div>{item?.content}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  })}
                </div>
              </div>
            </div>
            {istyping

              ?

              (
                <div>
                  <> <div class="typingIndicatorContainer my-2 mx-1">
                    <div class="typingIndicatorBubble">
                      <div class="typingIndicatorBubbleDot"></div>
                      <div class="typingIndicatorBubbleDot"></div>
                      <div class="typingIndicatorBubbleDot"></div>
                    </div>
                  </div></>
                </div>
              ) : (
                <></>
              )}
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    value={newmessage}
                    onChange={typingHandler}


                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button onClick={sendmessage} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
        </>
      
      }
          </div>
        </div>
      </>












    </>
  )
}
