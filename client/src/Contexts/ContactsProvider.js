import React, {useContext,useEffect,useState} from 'react'
import axios from 'axios';
import { FaRegThumbsDown } from 'react-icons/fa6';

const ContactsContext = React.createContext()

// can export it
export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({id, children}) {
  // create a state
  const [contacts, setContacts] = useState([]);
  const getFriends = async (id) => {
    try{
      const response = await axios.get(`http://localhost:8000/userFriends/getAllFriends/`,
      {params:
        {userId:id}
      });
      console.log(response.data);
      const friends=response.data;
      let contactList = [];
      contactList = friends.map((friend)=>{
        return  {id:friend.friendId,name:friend.friendNickname, imageURL:friend.friend.imageURL}
      })
      setContacts(contactList)
      console.log("contacts:",contactList)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getFriends(id);
  },[])

  // appending contact
  async function createContact (friendId, name) {
    try{
      const response = await axios.post(`http://localhost:8000/userFriends/addFriend`,{
        userId: id,  
        friendId:friendId,
        friendNickname:name,
        isAccepted: false
      })
    }catch(err){
      console.log(err);
    }
    setContacts(prevContacts => {
      return [...prevContacts, {id, name} ]
    })
  }

  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
      {children}
    </ContactsContext.Provider>
  )
}
