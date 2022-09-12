
import FormSignUp from '../../components/sign-up-form/sign-up-form.component';
import FormSignIn from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {

    return (
        <div className="authentication-container">
            <FormSignIn />
            <FormSignUp />
        </div>
    )
}

export default Authentication;