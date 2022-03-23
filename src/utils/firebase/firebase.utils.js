// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
     getAuth,
     signInWithRedirect,
     signInWithPopup,
     GoogleAuthProvider,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     signOut,
     onAuthStateChanged
    } from "firebase/auth"

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHqZK07G0VeK6xSBUOYgvAboPQPzSCsHA",
  authDomain: "crwn-clothing-db-cd44a.firebaseapp.com",
  projectId: "crwn-clothing-db-cd44a",
  storageBucket: "crwn-clothing-db-cd44a.appspot.com",
  messagingSenderId: "50475650055",
  appId: "1:50475650055:web:4380d59fe77e3a79feeea2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider)


export const db = getFirestore()

export const createUserDocumentFromAuth = async (
    userAuth, additionalInformation={}) => {
    if(!userAuth) return
    // look if a document exists
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch(error){
            console.log('error creating user',error.message)
        }
    }
    return userDocRef
    //if user data dont exists
    //create it
    //if userdata exists
    //return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email,password) => {
     if(!email || !password) return
     return await createUserWithEmailAndPassword(auth,email,password)
}
export const signInAuthUserWithEmailAndPassword = async (email,password) => {
     if(!email || !password) return
     return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback)