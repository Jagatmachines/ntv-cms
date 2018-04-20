import * as React from 'react'
import { PasswordResetUpdate } from '../firebase/auth';
import { Link } from 'react-router-dom';
import * as routeRouter from '../../routes';
import Formsy from 'formsy-react';
import MyInput from '../usableComponents/input';
import AuthUserContext from '../firebase/AuthUserContext';

class PasswordReset extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            canSubmit: false,
            message: '' 
        };
    }

    submit = (data) => {
        /* const { history } = this.props; */
        PasswordResetUpdate(data.password).then(() => {
            debugger;
            this.setState({
                message: 'Password has been Resetted successfully'
            })
        }).catch((error) => {
            this.setState({
                message: error.message
            })
        })
    }
    
    enableButton = () => {
        this.setState({ canSubmit: true });
    }
    
    disableButton = () => {
        this.setState({ canSubmit: false });
    }
    
    PasswordResetForm = () => {
        const { message, canSubmit } = this.state;
        return (
            <div>
                { message.length ? message : '' }
                <Formsy 
                    onValidSubmit={this.submit} 
                    onValid={this.enableButton} 
                    onInvalid={this.disableButton} >
                    
                    <label htmlFor="fullname">Password</label>
                    <MyInput 
                        name="password" 
                        title="Password" 
                        type="password"
                        validations="isLength:8" 
                        validationError="Password length is less than 8"                      
                        required 
                    />
                    <label htmlFor="fullname">Confirm Password</label>
                    <MyInput 
                        name="confirmPass" 
                        title="Confirm Password" 
                        type="password"
                        validations="equalsField:password"
                        validationError="Password not same"
                        required 
                    />
                    <button type="submit" disabled={!canSubmit}>Reset Password</button>
                </Formsy>
            </div>
        );
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {(authUser) => (
                    <div>
                        {authUser ? <h1>Account: {authUser.email}</h1> : ''}
                        {this.PasswordResetForm()}
                    </div>
                )}
                
            </AuthUserContext.Consumer>
        );
    }
}

export default PasswordReset;

export const PasswordResetLink = () => {
    return (
        <Link to={routeRouter.PASSWORD_RESET}>Reset Password Now
        </Link>
    );
}