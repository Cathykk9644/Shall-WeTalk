import React, { Profiler, useContext, useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import axios from 'axios';

const STORAGE_KEY = "profilePictures/"

const UserProfile=({id})=>{
  const [profileURL,setProfileURL] = useState();
  const [fileInputFile,setFileInputFile]=useState();
  const [profileDetails,setProfileDetails] = useState();

  const getProfilePictureURL = async (userId) => {
    const storageRef = ref(storage,`${STORAGE_KEY,userId}`);
    const downloadURL = await getDownloadURL(storageRef);
    setProfileURL(downloadURL);
    return downloadURL;
  }

  const uploadProfilePicture = async (userId, file) => {
    const storageRef = ref(storage,`${STORAGE_KEY,userId}`);
    await uploadBytes(storageRef, file);
  };
  
  const handleFileInput = (e) =>{
    console.log(e)
    setFileInputFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProfilePicture("test",fileInputFile);
    getProfilePictureURL("test");
  }

  const getUserProfileDetails = async (loginId) =>{
    console.log(loginId)
    try{
      const userProfileDetails = await axios.get('http://localhost:8000/users/getProfile',{
        params:{userId:loginId}
      })
      console.log(userProfileDetails)
      setProfileDetails(userProfileDetails.data)
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    getUserProfileDetails(id);
  },[])
  
  return(
    <div>
      {profileDetails?<form>
        <label>Name:</label>
        <div>{profileDetails.username}</div>
        <br/>
        <label>Native Language:</label>
        <div>{profileDetails.userMotherTongues}</div>
        <br/>
        <label>Learning Languages:</label>
        <div>{profileDetails.userLearningLanguages}</div>
        <br/>
        <label>Hobbies:</label>
        <div>{profileDetails.useHobbies}</div>
        <br/>
        <label>Profile Picture  :</label>
        <img className='rounded-full' src={profileURL} alt='profile pic' />
        <input 
          type='file'
          name='file'
          onChange={(e)=>handleFileInput(e)}
        />
        <br/>
        <button 
          className='bg-buttonColor rounded-md border-4 border-buttonColor text-white'
          onClick={handleSubmit}  
        >
          Upload your profile picture here!
        </button>
      </form>:"Loading"}
    </div>
  )
}
export default UserProfile;