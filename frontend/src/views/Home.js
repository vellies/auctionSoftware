import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import {
  InputGroup,
  InputGroupAddon,
  Card,
  Row,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Collapse,
  CardBody,
  Label
} from "reactstrap";
import "../App.css";
import Swal from "sweetalert2";
import Alert from "../common/Alert";
import url from "../common/Config";
import TextField from "@material-ui/core/TextField";
import $ from "jquery";

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import ArrowUpwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';

let _this = null;

class Home extends Component {

  state = {
    page: 0,
    rowsPerPage: 2,
    projects: [],
    recentProject: [],
    addProjectModal: false,
    data: {
      projectTitle: "",
      cat_id: "",
      editId: ''
    },
    loginId: '',
    modalTitle: "New Project",
    saveProject: "Add",
    catList: [],
    userToken: ''
  };

  // React Lifecycle 
  componentDidMount() {
    _this = this;
    let userData = JSON.parse(localStorage.getItem("user"));
    console.log("userdata", userData)
    if (userData == null) {
      window.location = "/";
    }

    this.setState({
      loginId: userData.user.userName,
      userToken: userData.token
    }, () => {
      this.getProjectList();
      this.getCategoryList();
    });
  }

  getProjectList() {
    axios
      .get(url + `project`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "authorization":"Bearer "+this.state.userToken
        },
        withCredentials: true,
        credentials: "same-origin"
      })
      .then(results => {
        if (results.data.length > 0) {
          this.setState({
            projects: results.data,
            recentProject: results.data
          });
        } else {

        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  getCategoryList() {
    axios
      .get(url + `category`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        withCredentials: true,
        credentials: "same-origin"
      })
      .then(results => {
        if (results.data.length > 0) {
          this.setState({
            catList: results.data
          });
        } else {

        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  toggleProjectModal() {
    let { data } = this.state;
    data.projectTitle = ''
    data.catId = ''
    this.setState({
      modalTitle: "New Project",
      saveProject: "Add",
      addProjectModal: !this.state.addProjectModal
    })
  }
  addProject() {
    let addData = {
      projectTitle: this.state.data.projectTitle,
      catId: this.state.data.cat_id,
      userId: this.state.loginId,
      active: 1
    }
    axios
      .post(url + `project`, JSON.stringify(addData), {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "authorization":"Bearer "+this.state.userToken
        },
        withCredentials: true,
        credentials: "same-origin"
      })
      .then(results => {
        if (results.data.project_id !== null) {
          this.getProjectList()
          this.setState({
            modalTitle: "New Project",
            saveProject: "Add",
            addProjectModal: !this.state.addProjectModal
          });
        } else {
          
        }

      })
      .catch(err => {
        console.log(err)
      })
  }
  editProject(id) {
    axios
      .get(url + `project/` + id, {
        method: "GET",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        withCredentials: true,
        credentials: "same-origin"
      })
      .then(results => {
        if (results.data.project_id !== null) {
          let data = this.state;
          data.projectTitle = results.data.projectTitle
          data.cat_id = results.data.cat_id
          data.editId = results.data.project_id
          this.setState({
            modalTitle: "Edit Project",
            saveProject: "Update",
            addProjectModal: !this.state.addProjectModal,
            data
          });
          $('select option[value=' + results.data.cat_id + ']').attr("selected", true);
        } else {

        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  updateProject() {
    let updateData = {
      projectTitle: this.state.data.projectTitle,
      cat_id: this.state.data.cat_id,
      user_id: this.state.loginId,
      active: 1
    }
    axios
      .put(url + `project/` + this.state.editId, JSON.stringify(updateData), {
        method: "PUT",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        withCredentials: true,
        credentials: "same-origin"
      })
      .then(results => {
        console.log("add", results)
        if (results.data.project_id !== null) {
          this.getProjectList()
          this.setState({
            modalTitle: "New Project",
            saveProject: "Add",
            addProjectModal: !this.state.addProjectModal
          });
        } else {

        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  deleteProject(id, title) {
    Swal.fire({
      title: "Delete " + title + "?",
      text: "You won't be recover the data after deletion!",
      icon: "warning",
      showCancelButton: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok"
    }).then(result => {
      if (result.value) {
        axios
          .put(`${url}projectStatus/${id}`, {
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
            if (res.project_id !== null) {
              this.getProjectList()
            } else { }

            Alert.succesAlert("Data delete successfully", 1500);
          });
      }
    });
  }


  handleOnChange = (event) => {
    console.log("event", event.target.value); // here I'm receiving only the value selected (1 or 2)
    let { data } = this.state;
    data.cat_id = event.target.value;
    this.setState({
      data
    });
  }
  orderOne(orderOne) {
    this.getProjectList()
  }
  orderOther(orderId) {
    if (orderId === '2') {
      var newArr = _.sortBy(this.state.projects, 'catName', function (n) {
        return Math.sin(n);
      });
    } else if (orderId === '3') {
      var newArr = _.sortBy(this.state.projects, 'username', function (n) {
        return Math.sin(n);
      });
    } else if (orderId === '4') {
      var newArr = _.sortBy(this.state.projects, 'projectTitle', function (n) {
        return Math.sin(n);
      });
    }
    this.setState({
      projects: newArr
    });

  }
  handleOnChangeOrder = (event) => {
    const orderId = event.target.value;
    if (orderId === '1') {
      this.orderOne()
    } else {
      this.orderOther(orderId)
    }
  }


  // render UI data
  render() {
    // Record page change event
    const handleChangePage = (event, newPage) => {
      this.setState({
        page: newPage
      });
    };

    // Rows per page change event
    const handleChangeRowsPerPage = event => {
      this.setState({
        rowsPerPage: +event.target.value
      });
    };
    let dropdownOption = this.state.catList.map((cat, v) => {
      return (
        <option value={cat.cat_id}>{cat.catName}</option>
      )
    })
    let listData = this.state.projects.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((project, v) => {
      let rowId = this.state.page * this.state.rowsPerPage
      let idRow = rowId + v + 1
      return (
        <TableRow key={v} >
          <TableCell className="th1">{idRow}</TableCell>
          <TableCell className="th4">{project.projectTitle}</TableCell>
          <TableCell className="th4">{project.username}</TableCell>
          <TableCell className="th4">{project.catName}</TableCell>
          <TableCell className="th4">{project.productName} / {project.price}</TableCell>
          <TableCell className="th4">

            <button
              className='editButton'
              onClick={() => {
                this.editProject(
                  project.project_id
                );
              }}
            > Edit</button>
            <button
              className='deleteButton'
              onClick={() => {
                this.deleteProject(
                  project.project_id, project.projectTitle
                );
              }}
            >Delete</button>
          </TableCell>
        </TableRow>
      );
    });



    return (
      <div>
        <div className="headerBottom"></div>
        <Row>
          <Col>
            <Col><select onChange={this.handleOnChangeOrder} name="orderBy" class="form-control" id="orderBy">
              <option value="" disabled selected="selected">Please select</option>
              <option value="1">Recent Projects</option>
              <option value="2">Order By Category Name ASC</option>
              <option value="3">Order By Username Asc</option>
              <option value="4">Order By Project Title Asc</option>
            </select>
            </Col>
            <Col></Col>
          </Col>
          <Col>
            <Button
              className="addRecord"
              color="primary"
              onClick={this.toggleProjectModal.bind(this)}
            >Add Project
                    </Button>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        {/* Create Record Modal End */}
        <Modal
          isOpen={this.state.addProjectModal}
          toggle={this.toggleProjectModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleProjectModal.bind(this)}>
            {this.state.modalTitle}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Project Title: </Label>
              <Input
                type="text"
                name="projectTitle"
                id="projectTitle"
                value={this.state.data.projectTitle}
                onChange={e => {
                  let { data } = this.state;
                  data.projectTitle = e.target.value;
                  this.setState({ data });
                }}
              />
              <Label>Category: </Label>
              <select onChange={this.handleOnChange} name="cat_id" class="form-control" id="cat_id">
                <option value="" disabled selected="selected">Please select Category</option>
                {dropdownOption}
              </select>
            </FormGroup>
          </ModalBody>
          <hr />
          <Row className="custom-footer">
            <Col xs="6">
              <Button
                className="c-button"
                color="primary"
                onClick={this.toggleProjectModal.bind(this)}
              >
                Close
              </Button>
            </Col>
            <Col xs="6">
              <Button
                className="float-right"
                color="primary"
                onClick={this.state.saveProject === "Add" ? this.addProject.bind(this) : this.updateProject.bind(this)}
              >
                {this.state.saveProject}
              </Button>
            </Col>
          </Row>
        </Modal>
        {/* Create Record Modal End */}
        <Paper >
          <TableContainer >
            <Table aria-label="sticky table" id="myTable">
              {/* Table Header */}
              <TableRow className="TableHead tableTextColor">
                <TableCell className="th4" id="th11"
                > #
                  </TableCell>
                <TableCell className="th4" id="th12"
                >
                  Project Title
                  </TableCell>
                <TableCell className="th4" id="th12"
                >
                  UserName
                  </TableCell>
                <TableCell className="th4" id="th13"
                >Category</TableCell>

                <TableCell className="th4"
                >
                  Product Name / Price
                </TableCell>
                <TableCell className="th4"
                >
                  Action
                </TableCell>
              </TableRow>
              <div className="recordDataBottom"></div>
              {/* Table Body */}
              <TableBody className="recordBody">
                {listData}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="footerMargin"></div>
        </Paper>
        <div className="footerRecordBackground">
          {/* Table Footer Row */}
          <Row>
            <Col className="bottonRecord ab">
              <h3 className="" >&nbsp;&nbsp;&nbsp;&nbsp;  {this.state.complectedRecordCount}  {this.state.totalRecordCount}</h3>
            </Col>
            <Col className="bottonRecord cd">
              <TablePagination
                rowsPerPageOptions={[2, 5, 20, 50, 100]}
                component="div"
                count={this.state.projects.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Home;
