import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState()
  console.log('Creating a new socket connection for id:', id); 
  useEffect(() => {
    const newSocket = io(
      'http://localhost:8000',
      { query: { id } }  
    )
    setSocket(newSocket);
    // console.log("from socketprovider:",socket)
    return () => {
      console.log('Disconnecting socket for id:', id); 
      newSocket.disconnect()
    };
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}