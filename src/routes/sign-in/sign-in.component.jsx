
import { auth,signInWithGooglePopup,signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {


    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef =  await createUserDocumentFromAuth(user)
        console.log(user)
    }
 
    return(
        <>
            <h1> Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm/>

        </>
    )

}

export default SignIn