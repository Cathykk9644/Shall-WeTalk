import React, { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const STORAGE_KEY = "profilePictures/"

const UserProfile=({id})=>{
  const [profileURL,setProfileURL] = useState();
  const [fileInputFile,setFileInputFile]=useState();
  const [profileDetails,setProfileDetails] = useState();

  const getProfilePictureURL = async (userId) => {
    const storageRef = ref(storage,`${STORAGE_KEY, userId}`);
    const downloadURL = await getDownloadURL(storageRef);
    setProfileURL(downloadURL);
    return downloadURL;
  }

  const uploadProfilePicture = async (userId, file) => {
    const storageRef = ref(storage,`${STORAGE_KEY,userId}`);
    await uploadBytes(storageRef, file);
    const pfpURL = await getProfilePictureURL(id);
    await axios.post(`http://localhost:8000/users/addProfilePic`,{
      userId:userId,
      newProfileURL: pfpURL
    })
  };
  
  const handleFileInput = (e) =>{
    console.log(e)
    setFileInputFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProfilePicture(id,fileInputFile);
  }

  const getUserProfileDetails = async (loginId) =>{
    console.log(loginId)
    try{
      const userProfileDetails = await axios.get('http://localhost:8000/users/getProfile',{
        params:{userId:loginId}
      })
      setProfileDetails(userProfileDetails.data)
      setProfileURL(userProfileDetails.data.imageURL);
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect(()=>{
    getUserProfileDetails(id);
  },[])
  
  return(
    <>
    {profileDetails&&profileURL?<div className="flex h-screen  overflow-hidden">
      <Sidebar username={profileDetails.username} pfp={profileURL}/>
      <div className="flex flex-1">
      <form>
        <label>Name:</label>
        <div>{profileDetails.username}</div>
        <br/>
        <label>Native Language:</label>
        <div>{profileDetails.userMotherTongues}</div>
        <br/>
        <label>Learning Languages:</label>
        <div>{profileDetails.userLearningLanguages}</div>
        <br/>
        <label>Address:</label>
        <div>{profileDetails.userAddress}</div>
        <br/>
        <label>Hobbies:</label>
        <div>{profileDetails.useHobbies}</div>
        <br/>
        <label>Tell us a bit about yourself:</label>
        <div>{profileDetails.bio}</div>
        <br/>
        <label>Profile Picture  :</label>
        <img className='rounded-full size-32 object-cover' src={profileURL} alt='profile pic' />
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
      </form>
      </div>
    </div>:"Loading"}
    </>
  )
}
export default UserProfile;