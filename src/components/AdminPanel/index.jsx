import * as React from 'react';
import withAuthorization from '../firebase/withAuthorization';

/* import AdBanner from './AdBanner';
import Gallery from './AdBanner/gallery'; */

// import HeadLines from './Headlines';

const authCondition = (authUser) => !!authUser;

class AdminPanel extends React.Component {

    render() {
        return (
            <div>
                <div>Admin Panel</div>

                {/* <AdBanner/>
                <Gallery/> */}

                {/* <HeadLines/> */}
            </div>
        );
    }
}

export default withAuthorization(authCondition)(AdminPanel);