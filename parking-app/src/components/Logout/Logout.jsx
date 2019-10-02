import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { removeFromStorage, getFromStorage } from "../../utils/storage";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  Table,
  TableBody
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

class Logout extends Component {
  state = { rows: [] };
  findUser = () => {
    const user = getFromStorage("db")[0].users.find(
      user => getFromStorage("token") === user.token
    );
    this.setState({
      rows: user
    });
  };

  componentDidMount() {
    if (getFromStorage("db") !== null) {
      this.findUser();
    }
  }
  whenLogout = () => {
    removeFromStorage("token");
    this.props.history.push("/Login");
  };

  render() {
    const { rows } = this.state;
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
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{rows.id}</TableCell>
                <TableCell align="center">{rows.name}</TableCell>
                <TableCell align="center">{rows.email}</TableCell>
                <TableCell align="center">{rows.age}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <br />
        <Button
          variant="contained"
          color="secondary"
          style={{ width: "300px", height: "50px" }}
          onClick={this.whenLogout}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default withRouter(Logout);
