import firebase_app from "../config";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app)

async function PasswordReset(email:string) {
    let result = null
    let error = null
    try{
        result = await sendPasswordResetEmail(auth, email)
    }catch(e){
        error = e
    }
    return({result, error})
}

export default PasswordReset