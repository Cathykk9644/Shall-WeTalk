import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import axios from 'axios';

const ChatMessagesContext = React.createContext();

export function useChatMessages() {
  return useContext(ChatMessagesContext);
}

export function ChatMessageProvider({ id, children }) {
  const [chatMessages, setChatMessages] = useState([])
  const {contacts }= useContacts(); 
  const socket = useSocket();

  console.log("from chatmessage provider",socket)

  const getChatMessages = async (id) => {
    try{
      const response = await Promise.all([
        axios.get(`http://localhost:8000/messages/getMessages`,
        {params:
          {userId:id}
        }
      ),
      axios.get(`http://localhost:8000/chatrooms/getChatrooms`,
        {params:
          {userId:id}
        }
      )
      ]);
      const messages = response[0].data;
      const chatrooms = response[1].data;
      console.log("before .map",messages)


    let chatList = Object.entries(chatrooms).map(([chatroomId, chatroom]) => {    
      let chatroomName = chatroom.filter(user => user.id !== 1).map(user => user.username);    
      let recipients = chatroom.map(user => user.username);   
      // Get the messages for the chatroom  
      let indivChatMessages = messages[chatroomId] || [];    
        
      return {    
        chatroomName: chatroomName.join(', '), // Join the names with a comma    
        recipients: recipients,    
        messages: indivChatMessages, // Add messages to the chatroom    
      };    
    });   

        
      console.log("chats:",chatList);  

    }catch(err){
      console.log(err);
    }
  }; 



  useEffect(() => {
    getChatMessages(id)
  },[])
  const value ={
    chatMessages:chatMessages
  }
  return (
    <ChatMessagesContext.Provider value={value}>
      {children}
    </ChatMessagesContext.Provider>
  )
}