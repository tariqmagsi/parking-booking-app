import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../../utils/storage";
import {
  Paper,
  TableRow,
  TableHead,
  TableCell,
  Table,
  TableBody,
  Button,
  TextareaAutosize
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

class AdminFeedbackTable extends Component {
  state = {
    feedbacks: [],
    user: "",
    message: "",
    id: "",
    flag: false,
    messageSent: ""
  };
  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  whenSubmitHandler = () => {
    const reply = getFromStorage("feedback").filter(feedback =>
      this.state.id === feedback.id
        ? (feedback.reply = this.state.message)
        : feedback
    );

    setInStorage("feedback", reply);
    this.setState({
      message: "",
      id: "",
      flag: false,
      messageSent: "Message Sent Successfully"
    });
    setTimeout(() => this.setState({ messageSent: "" }), 1000);
    this.feedbacks();
  };
  whenSendHandler = id => {
    this.setState({ id, flag: true });
  };
  findUser = () => {
    const user = getFromStorage("db")[0].users.find(
      user => getFromStorage("token") === user.token
    );

    this.setState({
      user: user.id
    });
  };
  feedbacks = () => {
    this.setState({ feedbacks: getFromStorage("feedback") });
  };
  componentDidMount() {
    if (getFromStorage("db")) this.findUser();
    if (getFromStorage("feedback")) this.feedbacks();
  }
  render() {
    const classes = makeStyles(theme => ({
      root: {
        width: "100%"
      },
      paper: {
        marginTop: theme.spacing(3),
        width: "100%",
        overflowX: "auto",
        marginBottom: theme.spacing(2)
      },
      table: {
        minWidth: 650
      }
    }));

    return (
      <div className={classes.root} style={{ overflowX: "auto" }}>
        <br />
        <div style={{ color: "green" }}>{this.state.messageSent}</div>
        {this.state.flag ? (
          <div>
            <TextareaAutosize
              name="message"
              aria-label="maximum height"
              value={this.state.message}
              onChange={this.whenChangeHandler}
              rows={5}
              cols={50}
              placeholder="Type Your Feedback..."
              style={{
                paddingLeft: "10px",
                paddingTop: "10px",
                paddingRight: "10px"
              }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "150px",
                height: "40px",
                marginTop: "10px",
                marginRight: "10px"
              }}
              onClick={this.whenSubmitHandler}
            >
              Send
            </Button>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <br />
        <br />
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">Message</TableCell>
                <TableCell align="center">Reply</TableCell>
                <TableCell align="center">Do Reply</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.feedbacks.map(feedback => (
                <TableRow key={feedback.id}>
                  <TableCell>{feedback.date}</TableCell>
                  <TableCell align="center">{feedback.message}</TableCell>
                  <TableCell align="center">{feedback.reply}</TableCell>
                  <TableCell align="center">
                    <Button
                      id={feedback.id}
                      value={this.state.message}
                      variant="outlined"
                      color="primary"
                      onClick={() => this.whenSendHandler(feedback.id)}
                    >
                      Reply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default AdminFeedbackTable;
