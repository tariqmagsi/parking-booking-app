import React, { Component } from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { Button, Container, Grid, Box } from "@material-ui/core";
import LoginBar from "./LoginBar";
import "../styles/styles.css";
import { getFromStorage, setInStorage } from "../../utils/storage";
import { generateId } from "../../actions/actions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    flag: true,
    user: "",
    isAdmin: false,
    dbArray: [
      {
        users: []
      }
    ],
    parkings: {
      parking1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      parking2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      parking3: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  };
  notFound = () => {
    const found = this.state.dbArray[0].users.find(user => {
      return (
        user.email.toLowerCase() === this.state.email.toLowerCase() &&
        user.password === this.state.password
      );
    });

    if (found !== undefined) {
      return true;
    } else {
      this.setState({ error: "Email/Password Wrong" });
      return false;
    }
  };
  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: "" });
  };
  whenLoginHandler = e => {
    e.preventDefault();
    if (getFromStorage("token")) {
      this.routeToAnotherPage();
      alert("User already logged in..");
    } else if (this.notFound()) {
      const users = {
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

      let found = this.state.dbArray[0].users.filter(user =>
        user.email.toLowerCase() === this.state.email.toLowerCase() &&
        user.password === this.state.password
          ? (user.token = users.token)
          : user.token
      );

      this.setState({
        dbArray: [{ users: found }]
      });

      setInStorage("token", users.token);
      setInStorage("db", [{ users: found }]);
      this.setState({ email: "", password: "" });
      this.routeToAnotherPage();
    }
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
  findUser = () => {
    const user = getFromStorage("db")[0].users.find(
      user => getFromStorage("token") === user.token
    );
    this.setState({
      isAdmin: user.isAdmin
    });
  };
  componentDidMount() {
    setInStorage("parkings", this.state.parkings);
    this.setState({
      dbArray: getFromStorage("db") ? getFromStorage("db") : this.state.dbArray
    });
    const obj = getFromStorage("token");

    if (obj) {
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
        <div className="Login">
          <Container fixed>
            <LoginBar name="Login" />
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
                  <form
                    className={useStyles.container}
                    noValidate
                    autoComplete="off"
                  >
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
                        color="primary"
                        style={{ width: "300px", height: "50px" }}
                        onClick={this.whenLoginHandler}
                      >
                        Login
                      </Button>

                      <br />
                      <span style={{ color: "red", textAlign: "center" }}>
                        {this.state.error}
                      </span>
                      <br />
                      <strong style={{ fontSize: "30px" }}>OR</strong>
                      <br />
                      <br />

                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: "300px", height: "50px" }}
                        onClick={() => this.props.history.push("/Signup")}
                      >
                        Sign Up
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
export default withRouter(Login);
