import React, { useContext, useEffect, useState , useCallback} from 'react'
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import axios from 'axios';

const ChatMessagesContext = React.createContext();

export function useChatMessages() {
  return useContext(ChatMessagesContext);
}

export function ChatMessageProvider({ id, children }) {
  const [chatMessages, setChatMessages] = useState([])
  const [chatIndex,setChatIndex] = useState(0)
  const [searchValue,setSearchValue] = useState("")
  const {contacts} = useContacts(); 
  const socket = useSocket();

  const getUsername = (userId) => {  
  const contact = contacts.find(contact => contact.id === userId);  
  return contact   
    ?  contact.name  
    :  `user ${userId}`;  
  };  

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

      // console.log("contacts inside getChatMessage",contacts)
      let chatList = Object.entries(chatrooms).map(([chatroomId, chatroom]) => {    
        let chatroomName = chatroom.filter(user => user.id !== id).map(user => getUsername(user.id));
        let chatroomURL =  chatroom.length===2?chatroom.filter(user => user.id !== id).map(user=>user.imageURL):"https://firebasestorage.googleapis.com/v0/b/shallwetalk-1b7bf.appspot.com/o/addpfpIcon.png?alt=media&token=7428d2c4-6209-48f2-b282-67c7895a51ae"   
        let recipients = chatroom.map(user => {
          //format the recipients
          const contactName = getUsername(user.id)
          return contactName ? { id: user.id, name: contactName } : { id: id, name: `user ${user.id}` };  
        });   
        // Get the messages for the chatroom  
        let indivChatMessages = messages[chatroomId] || [];    
        
          // Format messages  
          indivChatMessages = indivChatMessages.map(message => {  
            const contactName = getUsername(message.senderId);  
            const name = (contactName) || `user${message.senderId}`; // if no contact found, use 'user' + id  
            const fromMe = id === message.senderId;  
            if (message.messageType === "text"){
              return { message:message.messageText, senderName: name, fromMe };  
            }else if (message.messageType === "voice"){
              return { audio:message.voiceNoteFileURL, senderName: name, fromMe };  
            }
          });  
        return {
          chatroomId,
          chatroomName: chatroomName.join(', '), // Join the names with a comma,
          chatroomURL,    
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


  const addMessageToChat = useCallback(({ chatroomId,recipients, message, senderId }) => {
    console.log('contacts inside addMessage',contacts)
    console.log('recipients passed into addMessage',recipients)
    const contactName = getUsername(senderId);
    let senderName = contactName ? { id: senderId, name: contactName } : { id: id, name: `user ${senderId}` }
    const formattedRecipients = recipients.map(id => {  
      const contactName = getUsername(id);  
      return contactName ? { id: id, name: contactName } : { id: id, name: `user ${id}` };  
    });  
    const fromMe = id === senderId;  
    setChatMessages(prevChatMessages => {
      let madeChange = false
      const newMessage = { senderName, message, fromMe }
      const newChatMessages = prevChatMessages.map(chatMessages => {
        if (arrayEquality(chatMessages.recipients, formattedRecipients)) {
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
        let chatroomName =[];
        let chatroom = recipients.filter(r=>r!==id).map((r)=>{
          const contact = contacts.find(contact => contact.id === r);
          let username = contact ? { id: r, name: contact.name } : { id: r.id, name: `userId ${r}` }
        let chatroomURL =  recipients.length===2?contact.imageURL:"https://firebasestorage.googleapis.com/v0/b/shallwetalk-1b7bf.appspot.com/o/addpfpIcon.png?alt=media&token=7428d2c4-6209-48f2-b282-67c7895a51ae"
          return(
            {chatroomName:[...chatroomName,username.name],chatroomURL}
          )
        }); 
        console.log(chatroom)
        return [
          ...prevChatMessages,
          {chatroomId, chatroomURL:chatroom[0].chatroomURL,chatroomName: chatroom[0].chatroomName.join(', '), recipients, messages: [newMessage] }
        ]
      }
    })

  }, [setChatMessages,contacts])


  //add send Message function
  function sendMessage({chatroomId,recipients, message}) {
      socket.emit('send-message', { 
        chatroomId, recipients, message 
      })
      console.log("recipients inside emit",recipients)
      addMessageToChat({ chatroomId,recipients, message, senderId: id })
  }

  useEffect(() => {  
    console.log('chatMessages after add',chatMessages)  
  }, [chatMessages]);  

    useEffect(() => {  
      if (contacts) {  
        getChatMessages(id,contacts)  
      }  
      if (socket == null) return;

      socket.on('receive-message', addMessageToChat);

      return () => socket.off('receive-message')
    }, [id, contacts, addMessageToChat])  



  function sendNewMessage({recipients, message}) {
    const formattedRecipients = recipients.map(id => {  
      const contactName = getUsername(id);  
      return contactName ? { id: id, name: contactName } : { id: id, name: `user ${id}` };  
    });  
    console.log(formattedRecipients)
    const existChatIndex = chatMessages.findIndex((chatMessage)=>{
      return arrayEquality(chatMessage.recipients,formattedRecipients);
    })  
    console.log("exist index",existChatIndex)
    if (existChatIndex !== -1 ){
      const existChat = chatMessages[existChatIndex]
      console.log("exist chat",existChat)
      sendMessage({chatroomId:existChat.chatroomId,recipients,message})
      setChatIndex(existChatIndex)
      }else{
        console.log("in else statement")
        // socket.emit('send-new-message', { 
        //         recipients, message 
        // })
      } 
  }

    const handleNewChat = ({chatroomId,recipients,message}) => {  
      addMessageToChat({ chatroomId, recipients, message, senderId: id });  
      setChatIndex(chatMessages.length)
    };  

  
  useEffect(() => {
    if(socket == null) return;    
    socket.on('created-new-chat', handleNewChat);  

    // Cleanup the event listener  
    return () => socket.off('created-new-chat', handleNewChat);  
  }, [socket, addMessageToChat, chatMessages.length, id]); 


  // use this as an example on how to emit and listen
  // function testSocket(load){
  //   socket.emit("test-receive",{load:"world!"})
  //   socket.on("test-emit",()=>{
  //     console.log("this is the server's" ,load)
  //   })
  // }



  const value ={
    allMessages:chatMessages,
    sendMessage,
    sendNewMessage,
    setChatIndex,
    selectedChat: chatMessages[chatIndex],
    chatIndex,
    searchValue,
    setSearchValue,
  }
  return (
    <ChatMessagesContext.Provider value={value}>
      {children}
    </ChatMessagesContext.Provider>
  )
}

// outside the component
function arrayEquality(a, b) {  
  if (a.length !== b.length) return false;  
  
  const sortedA = a.sort((a, b) => a.id - b.id);  
  const sortedB = b.sort((a, b) => a.id - b.id);  
  
  return sortedA.every((element, index) => {  
    return element.id === sortedB[index].id;  
  });  
}  