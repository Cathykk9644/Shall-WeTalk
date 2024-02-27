import React, {useState} from "react";
import {useContacts} from "../Contexts/ContactsProvider"
import { useChatMessages } from "../Contexts/ChatMessagesProvider";
import SuggestedFriendModal from "./SuggestedFriendModal";


const SuggestedFriendList = () => {
  const [modalOpen,setModalOpen]= useState(false);
  const [suggestFriendIndex,setSuggestedFriendIndex]= useState(0)
  
  const closeModal = ()=>{
    setModalOpen(false)
  }

  const handleClick = (e) => {
    setModalOpen(true);
  };
  const {suggestedFriendList} = useContacts();
  const {allMessages,setChatIndex,searchValue,setSearchValue,selectedChat} = useChatMessages();
  

 

  return (
    <div className="">
      <label className="object-fit">Suggested Friends that you can learn from!</label>
      <br/>
      {suggestedFriendList?
      <>
      <div className="flex-1 overflow-y-auto scrollbar-hide cursor-pointer duration-100 ">
        {suggestedFriendList.map((suggestedFriend, index) => (
          <div
            key={index}
            onClick={()=>{
                handleClick();
                setSuggestedFriendIndex(index)
              }}
            className="flex items-center justify-between p-4 hover:bg-gray-50 text-gray-500 text-sm "
          >
            <div className="flex items-center ">
              <img
                src={suggestedFriend.imageURL}
                alt={suggestedFriend.name}
                className="rounded-full h-10 w-10 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // prevents looping
                  e.target.src = "https://via.placeholder.com/150"; // default image
                }}
              />
              <span className="ml-4 font-medium">{suggestedFriend.name}</span>
              <span className="ml-4 font-medium">{`${suggestedFriend.userMotherTongues[0].language} Native`}</span>
            </div>
            {/* <div className="text-xs text-gray-500">{friend.lastActive}</div> */}
          </div>
        ))}
        
      </div>
      <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>  
        <div className="modal-box w-1/2 h-1/3 flex flex-col justify-center items-center">  
          <SuggestedFriendModal closeModal={closeModal} suggestedFriend={suggestedFriendList[suggestFriendIndex]} />  
          <div className="modal-action">  
            <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>✕</button>  
          </div>  
        </div>  
      </div> 
      </>
      :
      
      "Loading ..."       
      }
    </div>
  );
};

export default SuggestedFriendList;

 