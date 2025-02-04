import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import {auth} from '../Firebase/firebase.config'

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
   
    const authInfo = {
        createUser,

       
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;