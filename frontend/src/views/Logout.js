import React, { Component } from 'react';

class Logout extends Component {
    state = {
        user: {
            userName: '',
            password: '',
            email: '',
            userId: ''
        }
    }
    // React Life Cycle
    componentDidMount() {
        localStorage.clear();
        window.location = '/';
    }
    render() {
        return (
            <div>
                {/* <h1>Logout</h1> */}
            </div>
        );
    }
}
export default Logout;