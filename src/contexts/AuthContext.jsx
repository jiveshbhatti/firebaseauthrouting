import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { auth } from '../firebase';
import { createContext } from 'react';

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState() 

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    //firebase has a built in state management so we dont need to set user aboveinstead


    useEffect(()=>{

      const unsubscribe =  auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
        })

        return unsubscribe

    },[])

    const value = {
        currentUser,
        signup,
    }


  return( 
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
