import { useState } from "react"
import './sign-in-form.styles.scss'
import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import { signInWithGooglePopup, 
        createUserDocumentFromAuth, } from "../../utils/firebase/firebase.utils"

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
            const {response} = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
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
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    return (
        <div className='sign-in-form-container'>
            <h2>I Already Have An Account</h2>
            <span>Sign in with your email and password</span>
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                    <div className='buttons-container'>
                        <Button type='submit'>Sign In</Button>
                        <Button type='button' onClick={logGoogleUser} buttonType='google'>Google Sign In</Button>
                    </div>
                
            </form>

        </div>
    )
}

export default SignInForm