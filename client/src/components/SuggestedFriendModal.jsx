// AddContactModal.jsx  
import React, { useRef } from 'react';  
import { useContacts } from '../Contexts/ContactsProvider';  
  
const SuggestedFriendModal = ({ closeModal,suggestedFriend, suggestFriendIndex }) => {  
  const { createContact , setSuggestedFriendList} = useContacts();  
  
  function handleSubmit(e) {  
    e.preventDefault();  
    createContact(suggestedFriend.id,suggestedFriend.name);  
    // setSuggestedFriendList((currentList) => [  
    //   ...currentList.slice(0, suggestFriendIndex),  
    //   ...currentList.slice(suggestFriendIndex + 1)  
    // ]);
    closeModal();  
  }  
  
  return (
      
    <>  
      {suggestedFriend && (  
        <div className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md">  
          {/* User Info */}  
          <div className="flex items-center space-x-4 mb-4">  
            <img  
              src={suggestedFriend.imageURL}  
              alt={suggestedFriend.name}  
              className="rounded-full h-10 w-10 object-cover"  
              onError={(e) => {  
                e.target.onerror = null; // Prevents looping  
                e.target.src = "https://via.placeholder.com/150"; // Default image  
              }}  
            />  
            <h4 className="font-bold text-lg">{suggestedFriend.name}</h4>  
          </div>  
      
          {/* Mother Tongue */}  
          <div className="mb-4">  
            <h3 className="font-bold text-lg">Mother Tongue</h3>  
            <p className="text-lg">{suggestedFriend.userMotherTongues[0].language}</p>  
          </div>  
      
          {/* Learning Languages */}  
          <div className="mb-4">  
            <h3 className="font-bold text-lg">Languages I want to learn!</h3>  
            {suggestedFriend.userLearningLanguages.map((userLearningLanguage, index) => (  
              <div key={index} className="text-lg">  
                {`${userLearningLanguage.language} -- ${userLearningLanguage.proficiency}`}  
              </div>  
            ))}  
          </div>  
      
          {/* Hobbies */}  
          <div className="mb-4">  
            <h3 className="font-bold text-lg">Some of my hobbies!</h3>  
            {suggestedFriend.hobbies.map((hobby, index) => (  
              <div key={index} className="text-lg">  
                {hobby.hobby}  
              </div>  
            ))}  
          </div>  
      
          {/* Action Button */}  
          <form onSubmit={handleSubmit}>  
            <div className="modal-action text-right">  
              <button type="submit" className="btn btn-primary">  
                Add to Friends to start chatting!  
              </button>  
            </div>  
          </form>  
        </div>  
      )}  
    </>  

  );  
};  
  
export default SuggestedFriendModal;  
