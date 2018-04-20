import * as React from 'react';
import Formsy from 'formsy-react';
import MyInput from '../usableComponents/input';
import { CreateUser } from '../firebase/auth';
/* import { doCreateUser } from '../firebase/db/users'; */
import { withRouter } from 'react-router-dom';
import * as routeRoute from '../../routes';
import { /* db, */ base } from '../firebase/firebase';

const SignUpPage = ({ history }) => {
    return (
        <div>
            <SignUp
                history={history}
            />
        </div>
    )
}

export class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            canSubmit: false,
            message: '' 
        };
    }

    submit = (data) => {
        const { history } = this.props;
        console.log(base);

        CreateUser(data.username, data.password).then((authUser) => {
            let userDetails = {
                fullname: data.fullName,
                username: data.username
            }
            base.addToCollection('users', userDetails, authUser.id).then(() => {
                this.setState({
                    message: 'User has been created successfully'
                });
                history.push(routeRoute.SIGN_IN);
            }).catch((err) => {
                debugger;
                this.setState({
                    message: err.message
                });
            });
            /* doCreateUser(authUser.id, data.fullname, data.username).then(() => {
                this.setState({
                    message: 'User has been created successfully'
                });
                history.push(routeRoute.SIGN_IN);
            }).catch((error) => {
                this.setState({
                    message: error.message
                });
            }) */
        }).catch((error) => {
            this.setState({
                message: error.message
            });
        })
    }
    
    enableButton = () => {
        this.setState({ canSubmit: true });
    }
    
    disableButton = () => {
        this.setState({ canSubmit: false });
    }
    
    SignUpForm = () => {
        const { message } = this.state;
        return (
            <div>
                { message.length ? message : '' }
                <Formsy 
                    onValidSubmit={this.submit} 
                    onValid={this.enableButton} 
                    onInvalid={this.disableButton} >
                    <label htmlFor="fullname">Full Name</label>
                    <MyInput
                        name="fullName" 
                        title="Full Name"
                        type="text" 
                        validations="isExisty"
                        validationError="Required" 
                        required 
                    />
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
                    <label htmlFor="fullname">Confirm Password</label>
                    <MyInput 
                        name="confirmPass" 
                        title="Confirm Password" 
                        type="password"
                        validations="equalsField:password"
                        validationError="Password not same"
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
                {this.SignUpForm()}
            </div>
        );
    }
}

export default withRouter(SignUpPage);