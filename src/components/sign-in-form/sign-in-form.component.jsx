import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';

import { signInWithGooglePopup, signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import { SignUpContainer, SignUpHeader, ButtonContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
    email: '',
    password: '',
}

const FormSignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup(); //we are destructuring user from the response since this is all we want
        // setCurrentUser(user); replaced with observer pattern
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); //don't want form to submit, just tell us when form has been submitted
        try {
            const { user } = await signInUserWithEmailAndPassword(email, password);
            //setCurrentUser(user);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password': 
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('that email account does not exist');
                    break;
                default:
                    console.log(error);
            } 
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };
    return (
        <SignUpContainer>
            <SignUpHeader>Already have an account?</SignUpHeader>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput  label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button 
                        type="button" 
                        buttonType={BUTTON_TYPES_CLASSES.google} 
                        onClick={signInWithGoogle}
                        >
                            Google Sign In
                    </Button>
                </ButtonContainer>
            </form>
        </SignUpContainer>
    );
};

export default FormSignIn;