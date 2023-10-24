import firebase_app from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { authDataType } from "./signup";

const auth = getAuth(firebase_app)

async function SignIn({email, password}:authDataType) {
    let result = null
    let error = null
    try{
        result = await signInWithEmailAndPassword(auth, email, password)
    }catch(e){
        error = e
    }
    return({result, error})
}

export default SignIn