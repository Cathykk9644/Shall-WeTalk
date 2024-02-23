import React, { useContext, useEffect, useState , useCallback} from 'react'
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import axios from 'axios';

const ChatMessagesContext = React.createContext();

export function useChatMessages() {
  return useContext(ChatMessagesContext);
}

export function ChatMessageProvider({ id, children }) {
  const [chatMessages, setChatMessages] = useState()
  const {contacts} = useContacts(); 
  const socket = useSocket();

  const getChatMessages = async (id,contacts) => {
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

      // console.log("contacts inside getChatMessage",contacts)
      let chatList = Object.entries(chatrooms).map(([chatroomId, chatroom]) => {    
        let chatroomName = chatroom.filter(user => user.id !== 1).map(user => user.username);    
        let recipients = chatroom.map(user => {
          //format the recipients
          const contact = contacts.find(contact => contact.id === user.id);
          return contact ? { id: user.id, name: contact.name } : { id: id, name: `user ${user.id}` };  
        });   
        // Get the messages for the chatroom  
        let indivChatMessages = messages[chatroomId] || [];    
        
          // Format messages  
          indivChatMessages = indivChatMessages.map(message => {  
            const contact = contacts.find(contact => contact.id === message.senderId);  
            const name = (contact && contact.name) || `user${message.senderId}`; // if no contact found, use 'user' + id  
            const fromMe = id === message.senderId;  
            return { message:message.messageText, senderName: name, fromMe };  
          });  
        return {    
          chatroomName: chatroomName.join(', '), // Join the names with a comma    
          recipients: recipients,    
          messages: indivChatMessages, // Add messages to the chatroom    
        };    
      });   

        
      console.log("chats:",chatList);  
      setChatMessages(chatList);
    }catch(err){
      console.log(err);
    }
  }; 


  //INCOMPLETE!!!!
  const addMessageToChat = useCallback(({ recipients, messageBody, senderId }) => {
    setChatMessages(prevChatMessages => {
      let madeChange = false
      const newMessage = { senderId, messageBody }
      const newChatMessages = prevChatMessages.map(chatMessages => {
        if (arrayEquality(chatMessages.recipients, recipients)) {
          madeChange = true
          return {
            ...chatMessages,
            messages: [...chatMessages.messages, newMessage]
          }
        }

        return chatMessages
      })

      if (madeChange) {
        return newChatMessages
      } else {
        return [
          ...prevChatMessages,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setChatMessages])


  //add send Message function INCOMPLETE!!!
  function sendMessage(recipients, messageBody) {
    socket.emit('send-message', { recipients, messageBody })
    addMessageToChat({ recipients, messageBody, senderId: id })
  }
  function testSocket(load){
    socket.emit("test-receive",{load:"world!"})
    socket.on("test-emit",()=>{
      console.log("this is the server's " ,load)
    })
  }

  useEffect(() => {  
    if (contacts) {  
      getChatMessages(id,contacts)  
    }  
    if (socket == null) return;

    socket.on('receive-message', addMessageToChat);

    return () => socket.off('receive-message')
  }, [id, contacts,addMessageToChat])  

  const value ={
    chatMessages:chatMessages,
    testSocket
  }
  return (
    <ChatMessagesContext.Provider value={value}>
      {children}
    </ChatMessagesContext.Provider>
  )
}

// outside the component
function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}