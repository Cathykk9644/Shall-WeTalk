import React, {useContext,useEffect,useState} from 'react'
import axios from 'axios';

const ContactsContext = React.createContext()

// can export it
export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({id, children}) {
  // create a state
  const [contacts, setContacts] = useState();
  const [profileURL, setProfileURL] = useState();
  const [username,setUsername]= useState();
  const [suggestedFriendList, setSuggestedFriendList]= useState();
  const getFriends = async (id) => {
    try{
      const response = await axios.get(`http://localhost:8000/userFriends/getAllFriends/`,
      {params:
        {userId:id}
      });
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

  const getSuggestedFriends = async (id) => {
    try{
      const response = await axios.get(`http://localhost:8000/userFriends/getSuggestedFriends/`,
      {params:
        {userId:id}
      });
      const suggestedFriends=response.data;
      setSuggestedFriendList(suggestedFriends)
      console.log("suggestedFriends:",suggestedFriends)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
     getFriends(id);
     getSuggestedFriends(id);
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
      return [...prevContacts, {id, name, imageURL:"https://firebasestorage.googleapis.com/v0/b/shallwetalk-1b7bf.appspot.com/o/addpfpIcon.png?alt=media&token=7428d2c4-6209-48f2-b282-67c7895a51ae"} ]
    })
  }

  return (
    <ContactsContext.Provider value={{
      contacts, 
      createContact,
      profileURL,
      setProfileURL,
      username,
      setUsername,
      suggestedFriendList
    }}>
      {children}
    </ContactsContext.Provider>
  )
}
