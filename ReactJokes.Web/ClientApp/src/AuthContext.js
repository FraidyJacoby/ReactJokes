import React from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

class AuthContextComponent extends React.Component {
    state = {
        user: null,
        isLoading: true
    }

    componentDidMount = async () => {
        const { data } = await axios.get('/api/account/getcurrentuser');
        this.setUser(data);
        this.setState({ isLoading: false });
    }

    setUser = async (user) => {
        this.setState({ user });
    }

    logout = () => {
        this.setState({ user: null });
    }

    render() {
        const value = {
            user: this.state.user,
            setUser: this.setUser,
            logout: this.logout
        }

        return (
            <AuthContext.Provider value={value}>
                {this.state.isLoading ? <span></span> : this.props.children}
            </AuthContext.Provider>
            );
    }
}

export { AuthContext, AuthContextComponent };