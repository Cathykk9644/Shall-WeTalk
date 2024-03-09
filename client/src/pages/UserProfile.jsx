import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { useContacts } from "../Contexts/ContactsProvider";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Select from 'react-select';
import { PiCodesandboxLogoDuotone } from "react-icons/pi";

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
  const selectedMotherLanguageOption = languageOptions.find(option => option.value === tempValues.userMotherTongues?.language);
  const selectedLearningLanguageOption = languageOptions.find(option => option.value === tempValues.userLearningLanguages.language);  
  const selectedLearningProficiencyOption = proficiencyOptions.find(option => option.value === tempValues.userLearningLanguages.proficiency); 
  const selectedHobbyOption = hobbiesOptions.find(option => option.value === tempValues.hobbies); 

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
      

      setProfileDetails({
        username:userProfileDetails.data.username,
        userMotherTongues: userProfileDetails.data.userMotherTongues.map((userMotherTongue)=>{
          return {id: userMotherTongue.id, language:userMotherTongue.language.language}
        }), 
        userLearningLanguages:userProfileDetails.data.userLearningLanguages.map((userLearningLanguage)=>{
          return {id:userLearningLanguage.id,language:userLearningLanguage.language.language, proficiency:userLearningLanguage.proficiency}
        }),
        userAddress:userProfileDetails.data.userAddress,
        hobbies:userProfileDetails.data.hobbies.map((hobby)=>{
          return {id:hobby.id,hobby:hobby.hobby}
        }), 
        bio:userProfileDetails.data.bio,
        imageURL:userProfileDetails.data.imageURL 
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
      submitChange(e,field);  
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
          console.log("in if (userLearningLanguages",selectedOption) 
          setProfileDetails({ ...profileDetails, [field]: 
            [...profileDetails[field], {
            id:selectedOption.id,
            language:selectedOption.language,
            proficiency:selectedOption.proficiency
          }] });
          await axios.post(`http://localhost:8000/userProfiles/userLearningLanguagesUpdate`,{
            userId: id,
            userLearningLanguages:{ ...profileDetails, [field]: 
            [...profileDetails[field], {
            id:selectedOption.id,
            language:selectedOption.language,
            proficiency:selectedOption.proficiency
          }] }[field]
          })

          console.log(field,{ ...profileDetails, [field]: 
            [...profileDetails[field], {
            id:selectedOption.id,
            language:selectedOption.language,
            proficiency:selectedOption.proficiency
          }] }[field])  
        } else if(field === "userMotherTongues"|| field === "hobbies"){   
          setProfileDetails({   
            ...profileDetails,   
            [field]: [...profileDetails[field], selectedOption]  
          }); 
          await axios.post(`http://localhost:8000/userProfiles/${field}Update`,{
            userId:id,
            [field]: {   
            ...profileDetails,   
            [field]: [...profileDetails[field], selectedOption]  
          }[field]
          })
        }
        else {
          setProfileDetails( {...profileDetails, [field] : selectedOption} );  
          await axios.put(`http://localhost:8000/userProfiles/updateUser`,{
            userId:id,
            [field]:selectedOption
          })
        }  
        setIsEditing({ ...isEditing, [field]: false });
        setTempValues({username: "", userMotherTongues: "", userLearningLanguages:{id:"",language:"",proficiency:""} , userAddress: "", hobbies: "", bio: ""})
    } catch (err) {    
      console.error(err);    
      // Handle error (e.g., show an error message)    
    }    
  };  

  // =====================================Implement List editable components ==================================
  // for mother languages
  // Function to initialize an edit operation  
  const startEdit = (index) => {  
    const languageToEdit = profileDetails.userMotherTongues[index];  
    // Assuming tempValues can hold the item to edit  
    setTempValues({ ...tempValues, userMotherTongues: languageToEdit });  
    setIsEditing({ ...isEditing, userMotherTongues: true });  
    // Note: You might need a way to remember the index or id of the item being edited  
  };  
    
  // Function to delete a language from the list  
  const deleteLanguage = async (index) => {  
    const updatedLanguages = profileDetails.userMotherTongues.filter((_, i) => i !== index);  
    // Directly update the local state  
    setProfileDetails({ ...profileDetails, userMotherTongues: updatedLanguages });  
    // Call submitChange or directly update the backend here  
    // For simplicity, we'll assume submitChange can handle this operation  
    // Note: You might need to adjust submitChange to support deleting operation  
    // This example directly calls an imagined API update function for deletion  
    try {  
      await axios.put(`http://localhost:8000/userProfiles/updateUser`, {  
        userId: profileDetails.id, // Assuming profileDetails has an id field  
        userMotherTongues: updatedLanguages.map(lang => ({ id: lang.id, language: lang.language })),  
      });  
      // Handle post-update logic here if necessary  
    } catch (err) {  
      console.error(err);  
      // Handle error  
    }  
  };  

  // for learning languages
  const startEditLearningLanguage = (index) => {  
    const languageToEdit = profileDetails.userLearningLanguages[index];  
    setTempValues({ ...tempValues, userLearningLanguages: languageToEdit });  
    setIsEditing({ ...isEditing, userLearningLanguages: true });  
    // Optionally, you might want to keep track of the index being edited  
    // setEditingIndex(index); // Assuming you have a state [editingIndex, setEditingIndex]  
  };  
  const deleteLearningLanguage = (index) => {  
    const updatedLanguages = profileDetails.userLearningLanguages.filter((_, i) => i !== index);  
    setProfileDetails({ ...profileDetails, userLearningLanguages: updatedLanguages });  
    // Here, you should also update the backend to reflect this deletion  
  };  

  //for hobbies
  const startEditHobby = (index) => {  
    // Assuming hobbies are simple strings, update accordingly if they are objects  
    const hobbyToEdit = profileDetails.hobbies[index];  
    setTempValues({ ...tempValues, hobbies: hobbyToEdit });  
    setIsEditing({ ...isEditing, hobbies: true });  
    // Set editing index if necessary  
  };  
    
  const deleteHobby = (index) => {  
    const updatedHobbies = profileDetails.hobbies.filter((_, i) => i !== index);  
    setProfileDetails({ ...profileDetails, hobbies: updatedHobbies });  
    // Update backend as needed  
  };  

  // ==========================================================================================================
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
                <div className="px-2  hover:bg-gray-300 cursor-pointer duration-100"><FaPencilAlt onClick={() => toggleEdit('username')} /></div>    
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
                <div className="px-2  hover:bg-gray-300 cursor-pointer duration-100"><FaPencilAlt onClick={() => toggleEdit('userMotherTongues')} /></div>    
              </div>  
              {/* Always display the userMotherTongues array with edit and delete buttons */}  
              <div className="mx-4">  
                {profileDetails.userMotherTongues.map((userMotherTongue, index) => (  
                  <div key={index} className="flex items-center">  
                    <li>{userMotherTongue.language}</li>  
                    {/* Conditionally display Edit and Delete Buttons */}  
                    {/* {isEditing.userMotherTongues && (  
                      <>  
                        <button onClick={() => startEdit(index)} className="ml-2">  
                          <FaPencilAlt />  
                        </button>  
                        <button onClick={() => deleteLanguage(index)} className="ml-2">  
                          <FaTrash />  
                        </button>  
                      </>  
                    )}   */}
                  </div>  
                ))}  
              </div>  
              {/* Conditionally display the dropdown for editing/adding languages below the list */}  
              {isEditing.userMotherTongues && (  
                <div className="flex">  
                  <Select  
                    styles={{  
                      control: (provided) => ({  
                        ...provided,  
                        width: 200,  
                        height: 40,  
                        minHeight: 30,  
                        margin: 8,  
                      }),  
                      menu: (provided) => ({  
                        ...provided,  
                        width: 160, // Adjust width as needed  
                        minHeight: 40,  
                      }),  
                    }}  
                    value={selectedMotherLanguageOption}  
                    onChange={({ value, id }) =>  
                      handleChange({ id, language: value }, 'userMotherTongues')}  
                    options={languageOptions} // Assuming languageOptions is an array of options  
                    className="w-fit mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                  />  
                  <button className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={(event) => submitChange(event, 'userMotherTongues')}>Add  
                  </button>  
                </div>  
              )}  
              <br />  

              
              {/*Learning Languages Field */}  
              <div className="flex">    
                <label className="mr-2">Learning Languages:</label>    
                <div className="px-2  hover:bg-gray-300 cursor-pointer duration-100"><FaPencilAlt onClick={() => toggleEdit('userLearningLanguages')} /></div>    
              </div>  
              {/* Display userLearningLanguages array */}
              <div className="mx-4">  
                {profileDetails.userLearningLanguages.map((userLearningLanguage, index) => (  
                  <div key={index} className="flex items-center justify-between">  
                    <li>{`${userLearningLanguage.language} - ${userLearningLanguage.proficiency}`}</li>  
                    {/* <div>  
                      <FaPencilAlt   
                        className="mx-2 hover:text-blue-500 cursor-pointer"   
                        onClick={() => startEditLearningLanguage(index)}   
                      />  
                      <FaTrash   
                        className="hover:text-red-500 cursor-pointer"   
                        onClick={() => deleteLearningLanguage(index)}   
                      />  
                    </div>   */}
                  </div>  
                ))}  
              </div>    
              {/* Conditional dropdown for editing/adding learning languages */}  
              {isEditing.userLearningLanguages && (  
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
                    value={selectedLearningLanguageOption}    
                    onChange={({ id, value }) => handleChange({ id, language: value }, 'userLearningLanguages')}    
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
                    value={selectedLearningProficiencyOption}    
                    onChange={(selectedOption) => handleChange({ proficiency: selectedOption.value }, 'userLearningLanguages')}    
                    options={proficiencyOptions}    
                    className="w-fit mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"    
                  />    
                
                  <button    
                    className="bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"    
                    onClick={(event) => submitChange(event, 'userLearningLanguages')}    
                  >    
                    Add    
                  </button>      
                </div>      
              )}  
                
              <br />  

              {/* Address Field */}  
              <div className="flex">    
                <label className="mr-2">Address:</label>    
                <div className="px-2  hover:bg-gray-300 cursor-pointer duration-100"><FaPencilAlt onClick={() => toggleEdit('userAddress')} /></div>    
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
                <div className="px-2  hover:bg-gray-300 cursor-pointer duration-100"><FaPencilAlt onClick={() => toggleEdit('hobbies')} /></div>    
              </div>  
              {/* Display hobbies array */}
              <div className="mx-4">  
                {profileDetails.hobbies.map((userHobby, index) => (  
                  <div key={index} className="flex justify-between items-center">  
                    <li>{userHobby.hobby}</li>  
                    {/* add when implementing individual entry edits */}
                    {/* <div>  
                      <FaPencilAlt   
                        className="mx-2 hover:text-blue-500 cursor-pointer"   
                        onClick={() => startEditHobby(index)}   
                      />  
                      <FaTrash   
                        className="hover:text-red-500 cursor-pointer"   
                        onClick={() => deleteHobby(index)}   
                      />  
                    </div>   */}
                  </div>  
                ))}  
              </div>  
              {/* display the dropdown */}  
              {isEditing.hobbies && (  
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
                    value={selectedHobbyOption}  
                    onChange={({ value, id }) =>  
                      handleChange({ id, hobby: value },  'hobbies')}  
                    options={hobbiesOptions} // languageOptions should be an array of options for the user to select from, testing with a random list  
                    className="w-fit mx-4 border-2 border-blue-500 focus:outline-none focus:border-blue-700"  
                  />  
                  <button className=" bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded"  
                    onClick={(event) => submitChange(event,'hobbies')}>Add
                  </button>  
                </div>    
              ) }  
              <br />

              {/* Bio Field */}  
              <div className="flex">    
                <label className="mr-2">Tell us a bit about yourself:</label>    
                <div className="px-2  hover:bg-gray-300 cursor-pointer duration-100"><FaPencilAlt onClick={() => toggleEdit('bio')} /></div>    
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
