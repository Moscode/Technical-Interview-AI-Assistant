import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export interface authDataType{
    email: string
    password:string
}

async function SignUp({email, password}:authDataType){
    let result = null
    let error = null
    try{
        result = await createUserWithEmailAndPassword(auth, email, password)
    }catch(e){
        error = e
    }

    return({result, error})
}

export default SignUp