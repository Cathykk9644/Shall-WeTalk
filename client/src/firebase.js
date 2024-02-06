
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

try {  
  const storageTest = getStorage(firebaseApp);  
  console.log("successfully deployed firebaseApp")
  console.log(storageTest)
} catch (e) {  
  console.error(`Firebase storage isn't initialized! ${e}`);  
} 

export const storage = getStorage(firebaseApp);

//test