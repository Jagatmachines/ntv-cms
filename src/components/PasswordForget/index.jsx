import * as React from 'react'
import { ResetPassword } from '../firebase/auth';
import { Link } from 'react-router-dom';
import * as routeRouter from '../../routes';
import Formsy from 'formsy-react';
import MyInput from '../usableComponents/input';
// import { PasswordResetLink } from '../PasswordReset';

class PasswordForget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            canSubmit: false,
            message: '',
            redirect: false            
        };
    }

    submit = (data) => {
        /* const { history } = this.props; */
        
        ResetPassword(data.username).then(() => {
            this.setState({
                message: 'Password Reset url has been sent to your email',
                canSubmit: false,
                redirect: true
            });
        }).catch((error) => {
            this.setState({
                message: error.message
            })
        });
    }
    
    enableButton = () => {
        this.setState({ canSubmit: true });
    }
    
    disableButton = () => {
        this.setState({ canSubmit: false });
    }
    
    PasswordForgetForm = () => {
        const { message, canSubmit, redirect } = this.state;
        return (
            <div>
                { message.length ? message : '' }
                {redirect ? 
                    <div>
                        {/* <PasswordResetLink/> */}
                    </div> :
                    <Formsy 
                        onValidSubmit={this.submit} 
                        onValid={this.enableButton} 
                        onInvalid={this.disableButton} >
                        
                        <label htmlFor="fullname">User Name</label>
                        <MyInput
                            name="username" 
                            title="Username"
                            type="email" 
                            validations="isEmail" 
                            validationError="This is not a valid email" 
                            required 
                        />
                        <button type="submit" disabled={!canSubmit}>Reset Password</button>
                    </Formsy>                    
                }
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.PasswordForgetForm()}
            </div>
        );
    }
}

export default PasswordForget;

export const PasswordForgetLink = () => {
    return (
        <Link to={routeRouter.PASSWORD_FORGET}>Forget Password
        </Link>
    )
}