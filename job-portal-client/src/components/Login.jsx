import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.config';


import { getAuth } from "firebase/auth";


const Login = () => {
    const googleprovider = new GoogleAuthProvider();
    const auth = getAuth();
    const handleChange = () =>{
        signInWithPopup(auth, googleprovider).then((result) => {
        
            const user = result.user;
            
        
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
   
            const email = error.customData.email;
   
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

    }

  return (
    <div className='h-screen w-full flex items-center justify-center'>
        <button className='bg-blue-600 px-8 py-2 text-white' onClick={handleChange}>Login</button>
      
    </div>
  )
}

export default Login
