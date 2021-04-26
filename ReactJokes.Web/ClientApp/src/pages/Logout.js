import React from 'react';
import { AuthContext } from '../AuthContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Logout extends React.Component {

    componentDidMount = async () => {
        await axios.post('/api/account/logout');
    }

    render() {
        return (
            <AuthContext.Consumer>
                {value => {
                    value.logout();
                    return <Redirect to='/' />
                }}
            </AuthContext.Consumer>
        );
    }
}

export default Logout;