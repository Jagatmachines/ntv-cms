import * as React from 'react';
import Formsy from 'formsy-react';
import MyInput from '../usableComponents/input';
import { UserSignIn } from '../firebase/auth';
import { withRouter, /* Link */ } from 'react-router-dom';
import * as routeRouter from '../../routes';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = ({ history }) => {
    return (
        <div>
            <h1>Sign In</h1>
            <SignIn history={history}/>
            {/* <Link to={routeRouter.SIGN_UP}>Sign Up</Link> */}
        </div>
    )
}

export class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            canSubmit: false,
            message: '' 
        };
    }

    submit = (data) => {
        const { history } = this.props;
        
        UserSignIn(data.username, data.password)
        .then(() =>{
            this.setState({
                message: 'User Sign In Successful'
            });
            history.push(routeRouter.ADMIN);
        })
        .catch((error) => {
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
    
    SignInForm = () => {
        const { message } = this.state;
        return (
            <div>
                { message.length ? message : '' }
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
                    <label htmlFor="fullname">Password</label>
                    <MyInput 
                        name="password" 
                        title="Password" 
                        type="password"
                        validations="isLength:8" 
                        validationError="Password length is less than 8"                      
                        required 
                    />
                    
                    <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </Formsy>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.SignInForm()}
                <PasswordForgetLink/>
            </div>
        );
    }
}

export default withRouter(SignInPage);