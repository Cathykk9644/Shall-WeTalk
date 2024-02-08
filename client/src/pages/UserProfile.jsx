import React, { useContext, useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';


const UserProfile=()=>{
  const [profileURL,setProfileURL] = useState();
  const [fileInputFile,setFileInputFile]=useState();

  const getProfilePictureURL = async (userId) => {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  const uploadProfilePicture = async (userId, file) => {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    await uploadBytes(storageRef, file);
  };
  
  const handleFileInput = (e) =>{
    console.log(e)
    setFileInputFile(e.target.files[0])
  }

  return(
    <div>
      <form>
        <label>Name:</label>
        <div>{"Insert User Profile Name here"}</div>
        <br/>
        <label>Native Language:</label>
        <div>{"Insert Native Language here"}</div>
        <br/>
        <label>Learning Languages:</label>
        <div>{"Insert Learning Languages here"}</div>
        <br/>
        <label>Profile Picture  :</label>
        <div>{profileURL}</div>
        <input 
          type='file'
          name='file'
          onChange={(e)=>handleFileInput(e)}
        />
        <br/>
        <button className='bg-buttonColor rounded-md border-4 border-buttonColor'>
          Upload your profile picture here!
        </button>
      </form>
    </div>
  )
}
export default UserProfile;