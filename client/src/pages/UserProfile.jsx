import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useContacts } from "../Contexts/ContactsProvider";
import { FaPencilAlt } from "react-icons/fa";

const STORAGE_KEY = "profilePictures/";

const UserProfile = ({ id }) => {
  const {profileURL, setProfileURL,setUsername} = useContacts();
  const [fileInputFile, setFileInputFile] = useState();
  const [profileDetails, setProfileDetails] = useState();
  const [isEditing, setIsEditing] = useState({username: false, userMotherTongues: false, userLearningLanguages: false, userAddress: false, hobbies: false, bio: false});  
  const [tempValues, setTempValues] = useState({username: "", userMotherTongues: "", userLearningLanguages: "", userAddress: "", hobbies: "", bio: ""});  


  const getProfilePictureURL = async (userId) => {
    const storageRef = ref(storage, `${(STORAGE_KEY, userId)}`);
    const downloadURL = await getDownloadURL(storageRef);
    setProfileURL(downloadURL);
    return downloadURL;
  };

  const uploadProfilePicture = async (userId, file) => {
    const storageRef = ref(storage, `${(STORAGE_KEY, userId)}`);
    await uploadBytes(storageRef, file);
    const pfpURL = await getProfilePictureURL(id);
    await axios.post(`http://localhost:8000/users/addProfilePic`, {
      userId: userId,
      newProfileURL: pfpURL,
    });
  };

  const handleFileInput = (e) => {
    console.log(e);
    setFileInputFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadProfilePicture(id, fileInputFile);
  };

  const getUserProfileDetails = async (loginId) => {
    console.log(loginId);
    try {
      const userProfileDetails = await axios.get(
        "http://localhost:8000/users/getProfile",
        {
          params: { userId: loginId },
        }
      );
      // userProfileDetails.data.
      setProfileDetails(userProfileDetails.data);
      setProfileURL(userProfileDetails.data.imageURL);
      setUsername(userProfileDetails.data.username)
    } catch (err) {
      console.log(err);
    }
  };
  // Function to handle escape key press  
  const handleEscape = (event) => {    
    if (event.key === "Escape") {    
      setIsEditing(Object.keys(isEditing).reduce((acc, cur) => ({...acc, [cur]: false}), {}));    
    }    
  };   
  
  const handleKeyDown = (e, field) => {    
    if (e.key === 'Escape') {    
      setIsEditing({...isEditing, [field]: false});    
    } else if (e.key === 'Enter') {    
      e.preventDefault();   
      submitChange(field);  
    }    
  };   

  useEffect(() => {
    getUserProfileDetails(id);

    // Add event listener for the escape key  
    document.addEventListener("keydown", handleEscape);  
  
    // Cleanup function to remove the event listener  
    return () => {  
      document.removeEventListener("keydown", handleEscape);  
    }; 
  }, []);

  const toggleEdit = (field) => {    
    setIsEditing({...isEditing, [field]: !isEditing[field]});    
    setTempValues({...tempValues, [field]: profileDetails[field]});   
  };   
  
  const handleChange = (e, field) => {    
    setTempValues({...tempValues, [field]: e.target.value});    
  };   
  
  //edit update field API
  const submitChange = async (field) => {    
    try {    
      // await axios.put(`http://localhost:8000/users/updateProfile`, {    
      //   userId: id,    
      //   [field]: tempValues[field],    
      // });    
      setProfileDetails({ ...profileDetails, [field]: tempValues[field] });    
      setIsEditing({...isEditing, [field]: false});    
    } catch (err) {    
      console.error(err);    
      // Handle error (e.g., show an error message)    
    }    
  };  
  return (
    <>
      {profileDetails && profileURL ? (
        <div className="flex h-screen  overflow-hidden">
          <Sidebar username={profileDetails.username} pfp={profileURL} />
          <div className="flex flex-1">
            <form>
              
              {/* Name Field */}  
              <div className="flex">    
                <label className="mr-2">Name:</label>    
                <div className="px-2  hover:bg-gray-300"><FaPencilAlt onClick={() => toggleEdit('username')} /></div>    
              </div>    
              {isEditing.username ? (    
                <>    
                  <input     
                    type="text"     
                    value={tempValues.username}     
                    onChange={(e) => handleChange(e, 'username')}     
                    className="mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"   
                    onKeyDown={(e) => handleKeyDown(e, 'username')}    
                  />    
                  <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={() => submitChange('username')}>Edit</button>    
                </>    
              ) : (    
                <div className="mx-4">{profileDetails.username}</div>    
              )}    


              
              {/* Native Language Field */}  
              <div className="flex">    
                <label className="mr-4">Native Language:</label>    
                <div><FaPencilAlt onClick={() => toggleEdit('userMotherTongues')} /></div>    
              </div>  
              {/* Display userMotherTongues array */}  
              {isEditing.userMotherTongues ? (  
                <>    
                  <input  
                    type="text"   
                    value={tempValues.userMotherTongues}   
                    onChange={(e) => handleChange(e, 'userMotherTongues')}  
                    className="mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                    onKeyDown={(e) => handleKeyDown(e, 'userMotherTongues')}  
                  />  
                  <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={() => submitChange('userMotherTongues')}>Edit</button>  
                </>  
              ) : (  
                <div className="mx-4">{profileDetails.userMotherTongues.map((userMotherTongue) => (  
                  <li>{userMotherTongue.language.language}</li>  
                ))}</div>  
              )}  
              <br />

              
              {/* MAKE IT A DROP DOWN Learning Languages Field */}  
              <div className="flex">    
                <label className="mr-4">Learning Languages:</label>    
                <div><FaPencilAlt onClick={() => toggleEdit('userLearningLanguages')} /></div>    
              </div>  
              {/* Display userLearningLanguages array */}  
              {isEditing.userLearningLanguages ? (  
                <>    
                  <input  
                    type="text"   
                    value={tempValues.userLearningLanguages}   
                    onChange={(e) => handleChange(e, 'userLearningLanguages')}  
                    className="mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                    onKeyDown={(e) => handleKeyDown(e, 'userLearningLanguages')}  
                  />  
                  <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={() => submitChange('userLearningLanguages')}>Edit</button>  
                </>  
              ) : (  
                <div className="mx-4">{profileDetails.userLearningLanguages.map((userLearningLanguage) => (  
                  <li>{userLearningLanguage.language.language}</li>  
                ))}</div>  
              )}  
              <br /> 

              {/* Address Field */}  
              <div className="flex">    
                <label className="mr-4">Address:</label>    
                <div><FaPencilAlt onClick={() => toggleEdit('userAddress')} /></div>    
              </div>  
              {isEditing.userAddress ? (  
                <>    
                  <input  
                    type="text"   
                    value={tempValues.userAddress}   
                    onChange={(e) => handleChange(e, 'userAddress')}  
                    className="mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                    onKeyDown={(e) => handleKeyDown(e, 'userAddress')}  
                  />  
                  <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={() => submitChange('userAddress')}>Edit</button>  
                </>  
              ) : (  
                <div className="mx-4">{profileDetails.userAddress}</div>  
              )}  
              <br /> 

              {/* Hobbies Field */}  
              <div className="flex">    
                <label className="mr-4">Hobbies:</label>    
                <div><FaPencilAlt onClick={() => toggleEdit('hobbies')} /></div>    
              </div>  
              {/* Display hobbies array */}  
              {isEditing.hobbies ? (  
                <>    
                  <input  
                    type="text"   
                    value={tempValues.hobbies}   
                    onChange={(e) => handleChange(e, 'hobbies')}  
                    className="mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                    onKeyDown={(e) => handleKeyDown(e, 'hobbies')}  
                  />  
                  <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={() => submitChange('hobbies')}>Edit</button>  
                </>  
              ) : (  
                <div className="mx-4">{profileDetails.hobbies.map((userhobby) => (  
                  <li>{userhobby.hobby}</li>  
                ))}</div>  
              )}  
              <br />

              {/* Bio Field */}  
              <div className="flex">    
                <label className="mr-4">Tell us a bit about yourself:</label>    
                <div><FaPencilAlt onClick={() => toggleEdit('bio')} /></div>    
              </div>  
              {isEditing.bio ? (  
                <>    
                  <input  
                    type="text"   
                    value={tempValues.bio}   
                    onChange={(e) => handleChange(e, 'bio')}  
                    className="mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                    onKeyDown={(e) => handleKeyDown(e, 'bio')}  
                  />  
                  <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={() => submitChange('bio')}>Edit</button>  
                </>  
              ) : (  
                <div className="mx-4">{profileDetails.bio}</div>  
              )}  
              <br />  

              <label>Profile Picture :</label>
              <img
                className="rounded-full size-32 object-cover m-4"
                src={profileURL}
                alt="profile pic"
              />
              <input
                type="file"
                name="file"
                onChange={(e) => handleFileInput(e)}
              />
              <br />
              <button
                className="bg-buttonColor rounded-md border-4 border-buttonColor text-white"
                onClick={handleSubmit}
              >
                Upload your profile picture here!
              </button>
            </form>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
};
export default UserProfile;
