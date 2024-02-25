import React, {useState} from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import AddContactModal from "./AddContactModal";

const AddFriendBar = () => {
  const [modalOpen,setModalOpen]= useState(false);
  
  const closeModal = ()=>{
    setModalOpen(false)
  }

  const handleClick = (e) => {
    setModalOpen(true);
  };
  return (
  <>
    <div 
      className="p-4 flex bg-bgColor1 border-t justify-center hover:bg-gray-50"
      onClick={handleClick}
    > 
      <div  className="font-semibold text-sm text-gray-500 mx-4 ">Add a friend
      </div>
      <div className="flex"> 
        <IoPersonAddOutline />
      </div>
    </div>

    <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>  
      <div className="modal-box w-1/2 h-1/3 flex flex-col justify-center items-center">  
        <AddContactModal closeModal={closeModal} />  
        <div className="modal-action">  
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeModal}>✕</button>  
        </div>  
      </div>  
    </div> 

   </> 
  );
};

export default AddFriendBar;
