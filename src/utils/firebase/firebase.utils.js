import {
    initializeApp
} from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    createUserWithEmailAndPassword,
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

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef);

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
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}