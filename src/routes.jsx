import * as React from 'react';
import { BrowserRouter as Router ,Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Admin from './components/AdminPanel';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PasswordForget from './components/PasswordForget';
import PasswordReset from './components/PasswordReset';
import NoPage from './components/NoPage';

export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const LANDING = '/';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/forgot';
export const PASSWORD_RESET = '/passReset';
export const ADMIN = '/adminpanel';
export const NO_PAGE = '/nopage';

const RoutingComponent = () =>
    <Router>
        <div>
            <Navigation/>
            <Switch>
                <Route
                    exact 
                    path={LANDING}
                    component={() => <Landing/>}
                />

                <Route
                    exact 
                    path={HOME}
                    component={() => <Home/>}
                />

                <Route
                    exact 
                    path={ADMIN}
                    component={() => <Admin/>}
                />

                <Route
                    exact 
                    path={SIGN_IN}
                    component={() => <SignIn/>}
                />

                <Route
                    exact 
                    path={SIGN_UP}
                    component={() => <SignUp/>}
                />

                <Route
                    exact 
                    path={PASSWORD_FORGET}
                    component={() => <PasswordForget/>}
                />

                <Route
                    exact 
                    path={PASSWORD_RESET}
                    component={() => <PasswordReset/>}
                />

                <Route
                    component={() => <NoPage/>}
                />
            </Switch>
        </div>
    </Router>

export default RoutingComponent;