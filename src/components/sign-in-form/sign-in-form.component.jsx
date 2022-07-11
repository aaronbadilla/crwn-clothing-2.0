import { useState} from "react"

import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component"
import FormInput from "../form-input/form-input.component"

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils"
import { ButtonsContainer, SignInFormContainer } from "./sign-in-form.styles.jsx"
const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    const handleChange = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]:value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields()
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log(error)
            }
            console.log(error)
        };
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup()
    }

    return (
        <SignInFormContainer>
            <h2>I Already Have An Account</h2>
            <span>Sign in with your email and password</span>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                    <ButtonsContainer>
                        <Button buttonType={BUTTON_TYPE_CLASSES.base}>Sign In</Button>
                        <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>Google Sign In</Button>
                    </ButtonsContainer>
            </form>
        </SignInFormContainer>
    )
}

export default SignInForm