import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } from 'firebase/auth';
  
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyAi_1wmwDbuAOSN84vREHlrbx1G-FfNh6Y",
  
    authDomain: "shoes-n-shirts-db.firebaseapp.com",
  
    projectId: "shoes-n-shirts-db",
  
    storageBucket: "shoes-n-shirts-db.appspot.com",
  
    messagingSenderId: "378670916120",
  
    appId: "1:378670916120:web:03f43bffd47574dd3b196d"
  
  };
  
  
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if (!userAuth) return; // if we do not receive any of these arguments then don't run this function
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
      
    };

    return userDocRef;
    //if user data exists

    //if user data does not exist

    //create/set document with the data from userAuth in my collection

    //return userDocRef

  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  //create another interface layer with a helper function

  export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);