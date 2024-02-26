import React, { useEffect, useState,useCallback } from "react";
import { IoSend, IoVideocam, IoCall } from "react-icons/io5";
import { IoMdHappy } from "react-icons/io";
import { AiFillAudio } from "react-icons/ai";
import {useChatMessages} from "../Contexts/ChatMessagesProvider"
import { useContacts } from "../Contexts/ContactsProvider";


const TextInterface = ({id}) => {
  const [message, setMessage] = useState("");
  const {sendMessage,sendNewMessage,allMessages,selectedChat,chatIndex,setSearchValue} = useChatMessages();
  const {contacts} = useContacts();


  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const handleSendMessage =  () => {

    if (message.trim()) {
      const newMessage = {
        senderId: id,
        message: message,
        fromMe: true,
      };

      setMessage("");
      if(chatIndex<allMessages.length){
        const sendMessageLoad = {
          chatroomId:selectedChat.chatroomId,
          recipients:selectedChat.recipients.map(r=>r.id),
          message:newMessage.message
        }
        console.log('send-message-load',sendMessageLoad)
        sendMessage(sendMessageLoad);        
      }else{

        const newChatLoad={
          recipients: [id, contacts[chatIndex - allMessages.length].id ],
          message:newMessage.message
        }
        sendNewMessage(newChatLoad)
        setSearchValue("")
      }

    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // useEffect(()=>{
  //   if(allMessages){setSelectedChat(allMessages[0]);}
  // },[allMessages  ])
  

  return (
    <div className="flex flex-col flex-1 h-full">
      {/* Top bar */}
      <div className="flex justify-between items-center p-2 border-b">
        {/* Left side: Profile and 'You' */}
        <div className="flex items-center ">
          <img
            src={selectedChat?selectedChat.chatroomURL:"https://firebasestorage.googleapis.com/v0/b/shallwetalk-1b7bf.appspot.com/o/addpfpIcon.png?alt=media&token=7428d2c4-6209-48f2-b282-67c7895a51ae"}
            alt="chatroom image"
            className="w-8 h-8 rounded-full object-cover ml-2 "
          />
          <span className="font-semibold text-sm text-gray-500 ml-2">
            {selectedChat?selectedChat.chatroomName:"Group Name"}
          </span>
        </div>

        {/* Right side: Call buttons */}
        <div>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none mr-2">
            <IoCall size={18} />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none mr-2">
            <IoVideocam size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        {/* Chat messages will be displayed here */}
{selectedChat && (selectedChat.messages.length !==0)?selectedChat.messages.map((msg,index) => {  
      const lastMessage = selectedChat.messages.length - 1 === index;  
      return(
          <div
            ref={lastMessage?setRef:null}
            key={index}
            className={`flex my-2 ${
              msg.fromMe ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={` px-4 py-2 rounded-full text-sm font-semibold ${
                msg.fromMe
                  ? "bg-sky-400 text-white "
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {msg.message?msg.message:<AiFillAudio size={15} />}
            </div>
          </div>
        )}):"Send message to start chatting!"}
      </div>
      <div className="border-t p-4 flex items-center">
        {/* Emoji button */}
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <IoMdHappy size={20} />
        </button>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <AiFillAudio size={20} />
        </button>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
          <IoVideocam size={20} />
        </button>
        {/* Message Input */}
        <input
          type="text"
          placeholder="Type messages here..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 mx-4 my-2  p-2 border rounded-full focus:outline-none focus:ring-1 focus:border-sky-400 shadow-sm text-sm"
        />
        {/* Send Message Button */}
        <button
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default TextInterface;
