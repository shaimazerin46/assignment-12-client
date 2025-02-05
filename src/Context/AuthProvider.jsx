import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {auth} from '../Firebase/firebase.config'
import { signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext()
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user,setuser] = useState(null);
    const [loading,setLoading] = useState(true)

    // register with email password
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // update profile
    const updateUserProfile = (name,photo)=>{
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
        .then(()=>{
            setuser({...auth.currentUser})
        })
    }
   
    // login
    const login = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = ()=>{
        return signOut(auth)
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setuser(currentUser);
            setLoading(false);
        })
        return ()=> unsubscribe();
    },[])
   
    const authInfo = {
        createUser,
        updateUserProfile,
        user,
        loading,
        login,
        logout,
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;