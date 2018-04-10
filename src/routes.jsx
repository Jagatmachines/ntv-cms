import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import Admin from './components/AdminPanel';

export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const LANDING = '/';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/forgot';
export const NO_PAGE = '/nopage';

const RoutingComponent = () => 
    <Router>
        
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
            path={Admin}
            component={() => <Admin/>}
        />
    </Router>


export default RoutingComponent;