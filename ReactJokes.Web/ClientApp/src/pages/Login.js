import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { AuthContext } from '../AuthContext';

class Login extends React.Component {

    state = {
        user: {
            email: '',
            password: ''
        },
        isValidLogin: true
    }

    onSubmit = async (e, setUser) => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', this.state.user);
        this.setState({ isValidLogin: !!data });
        setUser(data);
        if (this.state.isValidLogin) {
            this.props.history.push('/');
        }
        else {
            this.setState({ user: { email: '', password: '' } });
        }
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.user[e.target.name] = e.target.value;
        })
        this.setState(nextState);
    }

    render() {
        const { onSubmit, onTextChange } = this;
        const { email, password } = this.state.user;
        const { isValidLogin } = this.state;

        return (
            <AuthContext.Consumer>
                {value => {
                    const { setUser } = value;
                    return (
                        <form className="col-md-6" onSubmit={e => onSubmit(e, setUser)}>
                            <h1 className="h3 mb-3 font-weight-normal" style={{ marginBottom: 20 }}>Log in</h1>
                            {!isValidLogin && <span className="textDanger">Invalid login! Please try again.</span>}
                            <input type="email" name="email" onChange={onTextChange} value={email} placeholder="Email" className="formControl" style={{ marginBottom: 10 }} />
                            <br />
                            <input type="password" name="password" onChange={onTextChange} value={password} placeholder="Password" className="formControl" style={{ marginBottom: 10 }} />
                            <br />
                            <button className="btn btn-primary">Log in</button>
                        </form>
                    )
                }}
            </AuthContext.Consumer>
        );
    }
}

export default Login;