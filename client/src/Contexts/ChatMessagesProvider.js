import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const ChatMessagesContext = React.createContext();

export function useChatMessages() {
  return useContext(ChatMessagesContext);
}

export function ChatMessageProvider({ id, children }) {
  const [chatMessages, setChatMessages] = useState()

  useEffect(() => {
    
  },[])

  return (
    <ChatMessagesContext.Provider value={value}>
      {children}
    </ChatMessagesContext.Provider>
  )
}