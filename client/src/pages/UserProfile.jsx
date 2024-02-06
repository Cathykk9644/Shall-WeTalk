import React, { useContext, useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';


const UserProfile=()=>{
  const [] = useState();
  const getProfilePictureURL = async (userId) => {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  const uploadProfilePicture = async (userId, file) => {
    const storageRef = ref(storage, `profilePictures/${userId}`);
    await uploadBytes(storageRef, file);
  };

  return(
    <div>
      <form>
        
      </form>
    </div>
  )
}
export default UserProfile;