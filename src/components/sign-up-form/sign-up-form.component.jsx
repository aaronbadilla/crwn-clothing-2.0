import {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    const [errorMessage, setErrorMessage] = useState(false)

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            return setErrorMessage(true)} 
            
        try {
           const {user} = await createAuthUserWithEmailAndPassword(email, password);
           const {userDocRef} = await createUserDocumentFromAuth(user, {displayName});
           console.log(userDocRef);

            setErrorMessage(false)
            resetFormFields()
        } catch (error) {
            console.log('user creation encountered an error', error)
        }


    }

    const handleChange = (event) => {
        const {name, value} = event.target

        setFormFields({...formFields, [name]:value})
    }
        
    return (
        <div className='sign-up-container'>
            {errorMessage ? 
                (<h2>Passwords Don't Match Please Check Your Passwords And Try Again</h2>)
                 : null}
            <h2>Don't have an account?</h2>
            <span>Sign Up With Email And Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Name' type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm