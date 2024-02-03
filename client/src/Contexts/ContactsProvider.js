import React, {useContext,useEffect,useState} from 'react'
import axios from 'axios';

const ContactsContext = React.createContext()

// can export it
export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({id, children}) {
  // create a state
  const [contacts, setContacts] = useState([]);
  const getFriends = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/users/friends/${id}`)
      const friends=response.data;
      let contactList = [];
      contactList = friends.map((friend)=>{
        return  {id:friend.friendId,name:friend.friendName}
      })
      setContacts(contactList)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getFriends();
  },[])

  // appending contact
  async function createContact (friendId, name) {
    try{
      const response = await axios.post(`http://localhost:8080/users/friends`,{
        friendId:friendId,
        friendName:name,
        userId: id
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
