import React , {useEffect} from "react";
import io from 'socket.io-client';

const App = () => {
  useEffect(()=>{
    const newSocket = io('http://localhost:8080')
  })
  return (
    <div className="App mt-12 flex items-center justify-center text-3xl text-gray-500">
      <h1>Welcome to Shall Wetalk</h1>
    </div>
  );
};

export default App;
