import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

class Layout extends React.Component {

    render() {
        return (
            <AuthContext.Consumer>
                {value => {
                    const { user } = value;
                    const isLoggedIn = !!user;
                    return (
                        <>
                            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                                <div className="container-fluid">
                                    <div className="collapse navbar-collapse">
                                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                            <li><Link className="nav-link" to="/">Home</Link></li>
                                            {!isLoggedIn && <li><Link className="nav-link" to="/login">Log in</Link></li>}
                                            {!isLoggedIn && <li><Link className="nav-link" to="/signup">Sign up</Link></li>}
                                            {isLoggedIn && <li><Link className="nav-link" to="/logout">Log out</Link></li>}
                                            <li><Link className="nav-link" to="/viewall">View All</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            <div className="container" style={{ marginTop: 60 }}>
                                {this.props.children}
                            </div>
                        </>
                    );
                }
                }
            </AuthContext.Consumer>
        );
    }
}

export default Layout;
