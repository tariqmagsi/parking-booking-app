import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../../utils/storage";
import {
  Paper,
  TableRow,
  TableHead,
  TableCell,
  Table,
  TableBody,
  TextareaAutosize,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { generateId } from "../../actions/actions";

class FeedbackTable extends Component {
  state = { feedbacks: [], user: "", message: "", messageSent: "" };
  findUser = () => {
    const user = getFromStorage("db")[0].users.find(
      user => getFromStorage("token") === user.token
    );
    this.setState({
      user: user.id
    });
  };
  whenSendHandler = () => {
    const month = new Date().getMonth() + 1;
    const feedback = {
      id: generateId(),
      date: new Date().getDate() + "-" + month + "-" + new Date().getFullYear(),
      message: this.state.message,
      user_id: this.state.user,
      reply: ""
    };

    setInStorage(
      "feedback",
      getFromStorage("feedback") !== null
        ? getFromStorage("feedback").concat([feedback])
        : [feedback]
    );
    this.setState({ messageSent: "Message Sent Successfully", message: "" });
    setTimeout(() => this.setState({ messageSent: "" }), 1000);
    this.feedbacks();
  };
  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  feedbacks = () => {
    this.setState({ feedbacks: getFromStorage("feedback") });
  };
  componentDidMount() {
    if (getFromStorage("db") !== null) this.findUser();
    if (getFromStorage("feedback") !== null) this.feedbacks();
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
        <div style={{ color: "green" }}>{this.state.messageSent}</div>
        <br />
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
          onClick={this.whenSendHandler}
        >
          Send
        </Button>
        <br />
        <br />
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="center">Message</TableCell>
                <TableCell align="center">Reply</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.feedbacks.map(feedback =>
                this.state.user === feedback.user_id ? (
                  <TableRow key={feedback.id}>
                    <TableCell>{feedback.date}</TableCell>
                    <TableCell align="center">{feedback.message}</TableCell>
                    <TableCell align="center">{feedback.reply}</TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={feedback.id}></TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default FeedbackTable;
