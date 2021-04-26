import React from 'react';
import { Route } from 'react-router';
import { AuthContextComponent } from './AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/Logout';
import ViewAll from './pages/ViewAll';

class App extends React.Component {

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route excct path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/viewall' component={ViewAll} />
                </Layout>
            </AuthContextComponent>
        );
    }
}

export default App;