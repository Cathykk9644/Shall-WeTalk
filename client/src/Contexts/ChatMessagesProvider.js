import React ,{useContext,useState} from 'react';

const ChatMessagesContext = React.createContext();

export function useChatMessages() {
  return useContext(ChatMessagesContext);
}

export function ChatMessagesProvider({id,children}){
  const [chatMessages, setChatMessages] = useState([]);

  const value = {
    //return some functions here to send and receive messages  
  };

  return(
    <ChatMessagesContext.Provider value = {value}>
      {children}
    </ChatMessagesContext.Provider>
  )
}