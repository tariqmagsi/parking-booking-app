import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Container, Grid, Box } from "@material-ui/core";
import LoginBar from "../Login/LoginBar";
import "../styles/styles.css";
import { withRouter } from "react-router-dom";
import validator from "validator";
import { setInStorage, getFromStorage } from "../../utils/storage";
import { generateId } from "../../actions/actions";

const initialState = {
  name: "",
  email: "",
  age: "",
  password: "",
  secretKey: "",
  reEnterPass: "",
  errorName: "",
  errorEmail: "",
  errorPass: "",
  errorAge: "",
  required: "",
  uniqueEmail: "",
  flag: true,
  token: "",
  dbArray: [
    {
      users: []
    }
  ],
  parkings: {
    parking1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    parking2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    parking3: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  isAdmin: false
};
class Signup extends Component {
  state = initialState;
  nameError = () => {
    for (let i = 0; i < 10; i++) {
      if (this.state.name.includes(i)) {
        this.setState({ errorName: "Name cannot be a number" });
        return false;
      }
    }
    return true;
  };
  emailError = () => {
    if (!validator.isEmail(this.state.email)) {
      this.setState({ errorEmail: "Email not valid" });
      return false;
    }
    return true;
  };
  passError = () => {
    if (this.state.password !== this.state.reEnterPass) {
      this.setState({ errorEmail: "Passwords are not equal" });
      return false;
    }
    return true;
  };
  ageError = () => {
    if (this.state.age < 18) {
      this.setState({ errorAge: "You are underage for parking" });
      return false;
    }
    return true;
  };
  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errorAge: "",
      errorEmail: "",
      errorName: "",
      errorPass: "",
      required: "",
      uniqueEmail: ""
    });
  };
  errorRequire = () => {
    if (
      this.state.name.trim() === "" ||
      this.state.email.trim() === "" ||
      this.state.age.trim() === "" ||
      this.state.password.trim() === "" ||
      this.state.reEnterPass.trim() === ""
    ) {
      this.setState({ required: "All Fields Required" });
      return false;
    }
    return true;
  };
  uniqueEmail = () => {
    const find = this.state.dbArray[0].users.find(email => {
      return email.email === this.state.email;
    });
    if (find) {
      this.setState({ uniqueEmail: "Email Already Exists" });
      return false;
    }
    return true;
  };
  findUser = () => {
    const user = getFromStorage("db")[0].users.find(
      user => getFromStorage("token") === user.token
    );
    this.setState({
      isAdmin: user.isAdmin
    });
  };
  routeToAnotherPage = () => {
    this.findUser();
    setTimeout(() => {
      if (this.state.isAdmin) {
        this.props.history.push("/AdminBooking");
      } else {
        this.props.history.push("/Booking");
      }
    }, 200);
  };
  whenSubmitHandler = e => {
    e.preventDefault();
    if (getFromStorage("token")) {
      this.routeToAnotherPage();
      alert("User already logged in..");
    } else if (
      this.uniqueEmail() &&
      this.errorRequire() &&
      this.nameError() &&
      this.ageError() &&
      this.emailError() &&
      this.passError()
    ) {
      const users = {
        id: generateId(),
        name: this.state.name,
        age: this.state.age,
        email: this.state.email,
        password: this.state.password,
        isAdmin: this.state.secretKey === "admin" ? true : false,
        token:
          generateId() +
          generateId() +
          "." +
          generateId() +
          generateId() +
          "." +
          generateId() +
          generateId()
      };

      this.setState({
        dbArray: this.state.dbArray[0].users.push(users)
      });

      setInStorage("token", users.token);
      setInStorage("db", this.state.dbArray);
      this.setState(initialState);
      this.routeToAnotherPage();
    }
  };
  componentDidMount() {
    setInStorage("parkings", this.state.parkings);

    this.setState({
      dbArray: getFromStorage("db") ? getFromStorage("db") : this.state.dbArray
    });

    if (getFromStorage("token")) {
      this.routeToAnotherPage();
    } else {
      this.setState({ flag: false });
    }
  }
  render() {
    const useStyles = makeStyles(theme => ({
      container: {
        display: "flex",
        flexWrap: "wrap"
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
      }
    }));
    if (!this.state.flag) {
      return (
        <div className="Login" style={{ height: "auto" }}>
          <LoginBar name="Signup" />
          <Container fixed>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ marginTop: "50px" }}
            >
              <div
                style={{
                  overflowX: "auto",
                  margin: "20px",
                  padding: "20px"
                }}
              >
                <Box boxShadow={5} style={{ backgroundColor: "white" }}>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    <span color="red">{this.state.uniqueEmail}</span>
                    <span color="red">{this.state.required}</span>
                    <span color="red">{this.state.errorName}</span>
                    <span color="red">{this.state.errorAge}</span>
                    <span color="red">{this.state.errorEmail}</span>
                    <span color="red">{this.state.errorPass}</span>
                  </div>
                  <form
                    className={useStyles.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      style={{ width: "300px" }}
                      className={useStyles.textField}
                      id="outlined-name-input"
                      label="Name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      margin="normal"
                      variant="outlined"
                      value={this.state.name}
                      onChange={this.whenChangeHandler}
                      required
                    />
                    <br />
                    <TextField
                      style={{ width: "300px" }}
                      className={useStyles.textField}
                      id="outlined-age-input"
                      label="Age"
                      type="number"
                      name="age"
                      autoComplete="age"
                      margin="normal"
                      variant="outlined"
                      value={this.state.age}
                      onChange={this.whenChangeHandler}
                      required
                    />
                    <br />
                    <TextField
                      style={{ width: "300px" }}
                      className={useStyles.textField}
                      id="outlined-email-input"
                      label="Email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      margin="normal"
                      variant="outlined"
                      value={this.state.email}
                      onChange={this.whenChangeHandler}
                      required
                    />
                    <br />
                    <TextField
                      style={{ width: "300px" }}
                      id="outlined-pass-input"
                      label="Password"
                      type="password"
                      name="password"
                      autoComplete="password"
                      margin="normal"
                      variant="outlined"
                      value={this.state.password}
                      onChange={this.whenChangeHandler}
                      required
                    />
                    <br />
                    <TextField
                      style={{ width: "300px" }}
                      className={useStyles.textField}
                      id="outlined-reEnterPass-input"
                      label="Re-Enter Password"
                      type="password"
                      name="reEnterPass"
                      autoComplete="reEnterPass"
                      margin="normal"
                      variant="outlined"
                      value={this.state.reEnterPass}
                      onChange={this.whenChangeHandler}
                      required
                    />
                    <br />
                    <TextField
                      style={{ width: "300px" }}
                      className={useStyles.textField}
                      id="outlined-admin-input"
                      label="Secret Key (Incase you are admin)"
                      type="password"
                      name="secretKey"
                      autoComplete="secretKey"
                      margin="normal"
                      variant="outlined"
                      value={this.state.secretKey}
                      onChange={this.whenChangeHandler}
                    />
                    <br />
                    <br />
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: "300px", height: "50px" }}
                        onClick={this.whenSubmitHandler}
                      >
                        Register
                      </Button>
                    </Grid>
                  </form>
                </Box>
              </div>
            </Grid>
          </Container>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default withRouter(Signup);
