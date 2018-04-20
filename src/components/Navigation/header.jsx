import * as React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../../routes';
import { SignOut } from '../firebase/auth';
import AuthUserContext from '../firebase/AuthUserContext';

const NavigationAuth = ({ authUser }) => {
    return (
        <ul>
            <li>
                <Link to={Routes.LANDING}>Home</Link>
            </li>
            {authUser ? 
                <li>
                    <button
                        type="button"
                        onClick={SignOut}
                    >Sign Out
                    </button>
                </li> :
                <li>
                    <Link to={Routes.SIGN_IN}>Sign In</Link>
                </li>
            }
            
        </ul>
    );
}

class Header extends React.Component {
    /* constructor(props) {
        super(props);
    } */

    render() {
        return (
            <AuthUserContext.Consumer>
                {(authUser) => 
                    <NavigationAuth
                        authUser={authUser}
                    />
                }
            </AuthUserContext.Consumer>
        );
    }
}

export default Header;