import React, { Component } from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import { Button } from 'reactstrap';
import Alert from '../common/Alert'
import url from '../common/Config'
import { Alert as Toggle } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
        // this.closeModal = this.closeModal.bind(this);
        this.state = {
            alert: false,
            user: {
                userName: false,
                password: false,
                email: '',
                userId: ''
            }
        };
    }

    // React Life Cycle
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));
        let userData = JSON.parse(localStorage.getItem("user"));
        if (userData != null) {
            window.location = "/home";
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            this.logInUser();
        } else { }
    }

    // authenticate login user
    logInUser() {
        let { user } = this.state;
        user.userName && user.password != false ? (
            axios.post(url + 'login', JSON.stringify(this.state.user), {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'same-origin',
            })
                .then((results) => {
                    // console.log("ll",results.data.)
                    if (results.data!=="error") {
                        Alert.succesAlert("Login successfully", 1000);
                        this.setState({
                            userName: results.data.username,
                            password: '',
                            email: results.data.email,
                            userId: results.data.user_id
                        })
                        this.componentDidMount();
                        window.location = '/home';
                    } else {
                        this.setState({ alert: "Please Enter Valid Username and Password " })
                    }
                })
        ) : (
                user.userName === false ? (this.setState({ alert: "Please Enter all required fields" })) : (console.log())
            )


    }

    handleValidSubmit(event, values) {
        let { user } = this.state;
        user.userName = values.userName;
        user.password = values.password;
        this.setState({ user });
    }



    handleInvalidSubmit(event, errors, values) {
        let { user } = this.state;
        user.userName = values.userName;
        user.password = values.password;
        this.setState({ user });
        this.setState({ user, error: true });
    }

    render() {
        return (
            <div className="backColor">
                <div className="container signinBody">
                    <h2>Sign In</h2>
                    {
                        this.state.alert != false ? (
                            <Toggle color="primary">
                                {this.state.alert}
                            </Toggle>
                        ) : (
                                console.log("alert")
                            )
                    }

                    <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>

                        <AvField
                            type="text"
                            name="userName"
                            id="userName"
                            label="User Name:"
                            value={this.state.user.userName} onChange={(e) => {
                                let { user } = this.state;
                                user.userName = e.target.value;
                                this.setState({ user });
                            }}
                            onKeyPress={this.enterPressed.bind(this)}
                            required />
                        <AvField
                            type="password"
                            name="password"
                            id="password"
                            label="Password:"
                            value={this.state.user.password} onChange={(e) => {
                                let { user } = this.state;
                                user.password = e.target.value;
                                this.setState({ user });
                            }}
                            onKeyPress={this.enterPressed.bind(this)}
                            required />
                        <Button color="primary" onClick={this.logInUser.bind(this)}>SIGN IN</Button>
                    </AvForm>
                </div>
            </div>
        );
    }
}
export default Login;