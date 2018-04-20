import React from 'react';
import { withRouter } from 'react-router-dom';
import * as routeRouter from '../../routes';
import { auth } from './firebase';
import AuthUserContext from './AuthUserContext';

const withAuthentorization = (authCondition) => (Component) => {
    class withAuthentorization extends React.Component {
        /* constructor(props) {
            super(props);
        } */

        componentDidMount() {
            auth.onAuthStateChanged((authUser) => {
                if (!authCondition(authUser)) {
                    this.props.history.push(routeRouter.SIGN_IN);
                }
            })
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {(authUser) =>
                        authUser ? <Component/> : null 
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return withRouter(withAuthentorization);
}

export default withAuthentorization;