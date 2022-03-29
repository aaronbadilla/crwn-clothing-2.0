import {
    initializeApp
} from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDCQT3SUi1sj7MJmwvOxMT8EQ3OiPP6iA8",
    authDomain: "crwn-clothing-2-0.firebaseapp.com",
    projectId: "crwn-clothing-2-0",
    storageBucket: "crwn-clothing-2-0.appspot.com",
    messagingSenderId: "596462549649",
    appId: "1:596462549649:web:05f74d578f797819ca1d30"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot)

    if (!userSnapshot.exists()) {
        const {
            displayName,
            email
        } = userAuth
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
};