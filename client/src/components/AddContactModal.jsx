// AddContactModal.jsx  
import React, { useRef } from 'react';  
import { useContacts } from '../Contexts/ContactsProvider';  
  
const AddContactModal = ({ closeModal }) => {  
  const idRef = useRef();  
  const nameRef = useRef();  
  const { createContact } = useContacts();  
  
  function handleSubmit(e) {  
    e.preventDefault();  
    createContact(idRef.current.value, nameRef.current.value);  
    closeModal();  
  }  
  
  return (  
    <div className='w-full'>  
      <h3 className="font-bold text-lg">Create Contact</h3>  
      <form onSubmit={handleSubmit} className="py-4">  
        <div className="form-control">  
          <label className="label" htmlFor="id">  
            <span className="label-text">Id</span>  
          </label>  
          <input type="text" id="id" ref={idRef} required className="input input-bordered" />  
        </div>  
        <div className="form-control">  
          <label className="label" htmlFor="name">  
            <span className="label-text">Name</span>  
          </label>  
          <input type="text" id="name" ref={nameRef} required className="input input-bordered" />  
        </div>  
        <div className="modal-action">  
          <button type="submit" className="btn btn-primary">Create</button>  
        </div>  
      </form>  
    </div>  
  );  
};  
  
export default AddContactModal;  
