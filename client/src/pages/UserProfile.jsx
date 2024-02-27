import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useContacts } from "../Contexts/ContactsProvider";
import { FaPencilAlt } from "react-icons/fa";
import Select from 'react-select';

const STORAGE_KEY = "profilePictures/";

const UserProfile = ({ id }) => {
  const {profileURL, setProfileURL,setUsername} = useContacts();
  const [fileInputFile, setFileInputFile] = useState();
  const [profileDetails, setProfileDetails] = useState();
  const [isEditing, setIsEditing] = useState({username: false, userMotherTongues: false, userLearningLanguages: false, userAddress: false, hobbies: false, bio: false});  
  const [tempValues, setTempValues] = useState({username: "", userMotherTongues: "", userLearningLanguages:{id:"",language:"",proficiency:""} , userAddress: "", hobbies: "", bio: ""});
  const [languageOptions,setLanguageOptions]= useState([  
  { value: 'English', label: 'English', id:1  },  
  { value: 'Spanish', label: 'Spanish', id:2 },  
  { value: 'French', label: 'French', id: 3 },  
  { value: 'German', label: 'German', id: 4 },  
  { value: 'Chinese', label: 'Chinese', id: 5 },
  ])  
  const [hobbiesOptions,setHobbiesOptions]= useState([   
  { value: 'Painting', label: 'Painting', id:1  },  
  { value: 'Sleeping', label: 'Sleeping', id:2 },  
  { value: 'Eating', label: 'Eating', id: 3 },  
  { value: 'Travelling', label: 'Travelling', id: 4 },  
  { value: 'Reading', label: 'Reading', id: 5 },
  ])  
  const proficiencyOptions = [  
    { value: 'Beginner', label: 'Beginner' },  
    { value: 'Intermediate', label: 'Intermediate' },  
    { value: 'Advanced', label: 'Advanced' },  
 
  ];  

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
    // console.log(loginId);
    try {
      const userProfileDetails = await axios.get(
        "http://localhost:8000/users/getProfile",
        {
          params: { userId: loginId },
        }
      );
      // userProfileDetails.data => map to arrays so that can do immediate update

      setProfileDetails({
        username:userProfileDetails.data.username,
        userMotherTongues: userProfileDetails.data.userMotherTongues.map((userMotherTongue)=>{
          return {id: userMotherTongue.id, language:userMotherTongue.language.language}
        }), //may need map function here
        userLearningLanguages:userProfileDetails.data.userLearningLanguages.map((userLearningLanguage)=>{
          return {id:userLearningLanguage.id,language:userLearningLanguage.language.language, proficiency:userLearningLanguage.proficiency}
        }), //need map
        userAddress:userProfileDetails.data.userAddress,
        hobbies:userProfileDetails.data.hobbies.map((hobby)=>{
          return {id:hobby.id,hobby:hobby.hobby}
        }), //need map
        bio:userProfileDetails.data.bio,
        imageURL:userProfileDetails.data.imageURL //optional
      });

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
  
  const handleChange = (selectedOptionOrEvent, field) => {  
    if (selectedOptionOrEvent.target) {  
      // It's a normal event from a text input  
      setTempValues({ ...tempValues, [field]: selectedOptionOrEvent.target.value });  
    } else {  
      // It's a selected option object from the dropdown  
      if (field === 'userLearningLanguages') {  
        // may have to hard code to incorporate both language and proficiency options
        console.log(selectedOptionOrEvent)
        setTempValues({ ...tempValues, [field]: { ...tempValues[field], ...selectedOptionOrEvent } });  
      } else {  
        setTempValues({ ...tempValues, [field]: selectedOptionOrEvent });  
      }  
    }  
  };  
  
  //edit update field API
  const submitChange = async (event,field) => {
    event.preventDefault()    
    try {
      const selectedOption = tempValues[field];
      console.log(selectedOption)    
      // await axios.put(`http://localhost:8000/users/updateProfile`, {    
      //   userId: id,    
      //   [field]: tempValues[field],    
      // });   
       if (field === 'userLearningLanguages') {  
          //process the userLearningLanguages field > may cause error
          setProfileDetails({ ...profileDetails, [field]: 
            [...profileDetails[field], {
            id:selectedOption.id,
            language:selectedOption.language,
            proficiency:selectedOption.proficiency
          }] });  
        } else if(field === 'userMotherTongues'||"hobbies"){
          setProfileDetails({   
            ...profileDetails,   
            [field]: [...profileDetails[field], selectedOption]  
          });  
        }
        else {  
          setProfileDetails({ ...profileDetails, [field]: selectedOption });  
          
        }  
        setIsEditing({ ...isEditing, [field]: false });   
    } catch (err) {    
      console.error(err);    
      // Handle error (e.g., show an error message)    
    }    
  };  

  useEffect(()=>{
    console.log("tempVal",tempValues)
    console.log("profileDetails",profileDetails)
  },[tempValues])
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
                    onClick={(event) => submitChange(event,'username')}>Edit</button>    
                </>    
              ) : (    
                <div className="mx-4">{profileDetails.username}</div>    
              )}    
              <br/>

              
              {/* Native Language Field */}  
              <div className="flex">    
                <label className="mr-2">Native Language:</label>    
                <div className="px-2  hover:bg-gray-300"><FaPencilAlt onClick={() => toggleEdit('userMotherTongues')} /></div>    
              </div>  
              {/* Display userMotherTongues array */}  
              {isEditing.userMotherTongues ? (  
                <div className="flex">    
                  <Select
                    styles={{    
                      control: (provided) => ({    
                        ...provided,    
                        width: 160,
                        height: 30,
                        minHeight:30,   
                        margin: 8,   
                      }),    
                      menu: (provided) => ({  
                        ...provided,  
                        width: 150, // Set a different width for the menu  
                        minHeight:30,
                      }),  
                    }}      
                    value={tempValues.userMotherTongues}   
                    onChange={({ value, id }) =>  
                      handleChange({ id, language: value }, 'userMotherTongues')}  
                    options={languageOptions} // languageOptions should be an array of options for the user to select from, testing with a random list  
                    className="w-fit mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                  />  
                  <button className=" bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={(event) => submitChange(event,'userMotherTongues')}>Add
                  </button>  
                </div>  
              ) : (  
                <div className="mx-4">{profileDetails.userMotherTongues.map((userMotherTongue) => (  
                  <li>{userMotherTongue.language}</li>  
                ))}</div>  
              )}  
              <br />

              
              {/*Learning Languages Field */}  
              <div className="flex">    
                <label className="mr-2">Learning Languages:</label>    
                <div className="px-2  hover:bg-gray-300"><FaPencilAlt onClick={() => toggleEdit('userLearningLanguages')} /></div>    
              </div>  
              {/* Display userLearningLanguages array */}  
              {isEditing.userLearningLanguages ? (  
                <div className="flex">    
                  <Select  
                    styles={{  
                      control: (provided) => ({  
                        ...provided,  
                        width: 160,  
                        height: 30,  
                        minHeight: 30,  
                        margin: 8,  
                      }),  
                      menu: (provided) => ({  
                        ...provided,  
                        width: 150,  
                        minHeight: 30,  
                      }),  
                    }}  
                    value={tempValues.userLearningLanguages.language}  
                     onChange={({ value, id }) =>  
                      handleChange({ id, language: value }, 'userLearningLanguages')  
                    }  
                    options={languageOptions}  
                    className="w-fit mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                  />  
                  <Select  
                    styles={{  
                      control: (provided) => ({  
                        ...provided,  
                        width: 160,  
                        height: 30,  
                        minHeight: 30,  
                        margin: 8,  
                      }),  
                      menu: (provided) => ({  
                        ...provided,  
                        width: 150,  
                        minHeight: 30,  
                      }),  
                    }}  
                    value={tempValues.userLearningLanguages.proficiency}  
                    onChange={(selectedOption) =>  
                      handleChange({ proficiency: selectedOption.value }, 'userLearningLanguages')  
                    }  
                    options={proficiencyOptions}  
                    className="w-fit mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                  />  
                  <button  
                    className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={(event) => submitChange(event,'userLearningLanguages')}  
                  >  
                    Add  
                  </button>    
                </div>    
              ) : (  
                <div className="mx-4">{profileDetails.userLearningLanguages.map((userLearningLanguage) => (  
                  <li>{`${userLearningLanguage.language} - ${userLearningLanguage.proficiency}`}</li>  
                ))}</div>  
              )}  
              <br /> 

              {/* Address Field */}  
              <div className="flex">    
                <label className="mr-2">Address:</label>    
                <div className="px-2  hover:bg-gray-300"><FaPencilAlt onClick={() => toggleEdit('userAddress')} /></div>    
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
                    onClick={(event) => submitChange(event,'userAddress')}>Edit</button>  
                </>  
              ) : (  
                <div className="mx-4">{profileDetails.userAddress}</div>  
              )}  
              <br /> 

              {/* Hobbies Field */}  
              <div className="flex">    
                <label className="mr-2">Hobbies:</label>    
                <div className="px-2  hover:bg-gray-300"><FaPencilAlt onClick={() => toggleEdit('hobbies')} /></div>    
              </div>  
              {/* Display hobbies array */}  
              {isEditing.hobbies ? (  
                <div className="flex">    
                  <Select
                    styles={{    
                      control: (provided) => ({    
                        ...provided,    
                        width: 160,
                        height: 20,
                        minHeight:20,   
                        margin: 8,   
                      }),    
                      menu: (provided) => ({  
                        ...provided,  
                        width: 150, // Set a different width for the menu  
                        minHeight:30,
                      }),  
                    }}      
                    value={tempValues.hobbies}   
                    onChange={({ value, id }) =>  
                      handleChange({ id, hobby: value },  'hobbies')}  
                    options={hobbiesOptions} // languageOptions should be an array of options for the user to select from, testing with a random list  
                    className="w-fit mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                  />  
                  <button className=" bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={(event) => submitChange(event,'hobbies')}>Add
                  </button>  
                </div>    
              ) : (  
                <div className="mx-4">{profileDetails.hobbies.map((userhobby) => (  
                  <li>{userhobby.hobby}</li>  
                ))}</div>  
              )}  
              <br />

              {/* Bio Field */}  
              <div className="flex">    
                <label className="mr-2">Tell us a bit about yourself:</label>    
                <div className="px-2  hover:bg-gray-300"><FaPencilAlt onClick={() => toggleEdit('bio')} /></div>    
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
                    onClick={(event) => submitChange(event,'bio')}>Edit</button>  
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
