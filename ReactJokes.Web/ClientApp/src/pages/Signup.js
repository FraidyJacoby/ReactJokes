import React from 'react';
import axios from 'axios';
import produce from 'immer';

class Signup extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''

    }

    onSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/account/signup', this.state);
        this.props.history.push('/login');
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        })
        this.setState(nextState);
    }

    render() {
        const { onSubmit, onTextChange } = this;
        const { firstName, lastName, email, password } = this.state;

        return (
            <form className="col-md-6" onSubmit={onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal" style={{ marginBottom: 20 }}>Sign up</h1>
                <input type="text" name="firstName" onChange={onTextChange} value={firstName} placeholder="First Name" className="formControl" style={{ marginBottom: 10 }} />
                <br />
                <input type="text" name="lastName" onChange={onTextChange} value={lastName} placeholder="Last Name" className="formControl" style={{ marginBottom: 10 }} />
                <br />
                <input type="email" name="email" onChange={onTextChange} value={email} placeholder="Email" className="formControl" style={{ marginBottom: 10 }} />
                <br />
                <input type="password" name="password" onChange={onTextChange} value={password} placeholder="Password" className="formControl" style={{ marginBottom: 10 }} />
                <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default Signup;