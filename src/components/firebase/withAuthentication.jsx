import React from 'react';
import { auth } from './firebase';
import AuthUserContext from './AuthUserContext';

const withAuthentication = (Component) => {
    class withAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                authUser: null
            }
        }

        componentDidMount() {
            auth.onAuthStateChanged((authUser) => {
                authUser ? this.setState({authUser}) : this.setState({authUser: null})
            })
        }

        render() {
            const { authUser } = this.state;

            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component/>
                </AuthUserContext.Provider>
            )
        }
    }

    return withAuthentication;
}

export default withAuthentication;