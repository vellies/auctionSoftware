import React, { Component } from 'react';
import axios from "axios";
import Alert from './common/Alert'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import logo from './asLogonew.png';
import LogoutImg from './logout.png';
import url from "./common/Config";
import {
  Row,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Label, UncontrolledPopover, PopoverHeader, PopoverBody
} from "reactstrap";

class App extends Component {
  state = {
    changePasswordModal: false,
    Data: {
      password: "",
      confirmPassword: ""
    }

  };


  changePassword() {
    let data = {
      password: this.state.Data.password
    }
    let userData = JSON.parse(localStorage.getItem("user"));
    if (this.state.Data.password !== "") {


      if (this.state.Data.password === this.state.Data.confirmPassword && userData.userId !== null) {
        axios
          .put(url + "changePassword/" + userData.userId, JSON.stringify(data), {
            method: "PUT",
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: "same-origin"
          })
          .then(res => {
            this.setState({
              changePasswordModal: !this.state.changePasswordModal
            });
            Alert.succesAlert("Password changed successfully", 1000);
          })
          .catch(err => {
            console.log(err)
          });
      } else {
        Alert.errorAlert("Error", "Both password is not same.");
      }
    } else {
      Alert.errorAlert("Error", "Please enter valid password.");
    }
  }
  // change password modal open and close
  toggleChangePasswordModal() {

    this.setState({
      changePasswordModal: !this.state.changePasswordModal
    });
  }
  render() {
    let userData = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        {/* Change Password Modal Start */}
        <Modal
          className="changePassword"
          isOpen={this.state.changePasswordModal}
          toggle={this.toggleChangePasswordModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleChangePasswordModal.bind(this)}>
            Change Password
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={this.state.Data.password}
                onChange={e => {
                  let { Data } = this.state;
                  Data.password = e.target.value;
                  this.setState({ Data });
                }}
              /><br></br>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="daconfirmPasswordta"
                value={this.state.Data.confirmPassword}
                onChange={e => {
                  let { Data } = this.state;
                  Data.confirmPassword = e.target.value;
                  this.setState({ Data });
                }}
              />
            </FormGroup>
          </ModalBody>
          <hr />
          <Row className="custom-footer">
            <Col xs="6">
              <Button
                className="c-button"
                color="primary"
                onClick={this.toggleChangePasswordModal.bind(this)}
              >
                Close
              </Button>
            </Col>
            <Col xs="6">

              <Button
                className="float-right"
                color="primary"
                onClick={this.changePassword.bind(this)}
              >
                Update
              </Button>
            </Col>
          </Row>
        </Modal>
        {/* Change Password Modal End */}


        <Router>
          <div className="h-list">

            <ul classname="">

              {
                <img className="carecomLogo" src={logo} />
              }
              {
                <li className="headerApplication">Auction Software</li>
              }
              {

                userData != null ? (<Link to={'/logout'}><img className="ProfileImg" src={LogoutImg} /></Link>) : ''
              }
              {
                userData != null ? (<li className="headerUserName">{userData.userName}</li>) : ''
              }


            </ul>
            <hr />
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/logout' component={Logout} />
            </Switch>

          </div>
        </Router>
      </div>

    );
  }
}

export default App;