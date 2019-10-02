import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getFromStorage, setInStorage } from "../../utils/storage";
import { Button } from "@material-ui/core";

export default class AdminViewBooking extends React.Component {
  state = { rows: [], flag: true };

  whenCancelHandler = id => {
    const deleteId = this.state.rows.filter(row => row.receipt_id !== id);
    setInStorage("parkingBookedList", deleteId);
    this.changeState();
  };
  changeState = () => {
    this.setState({
      rows: getFromStorage("parkingBookedList")
        ? getFromStorage("parkingBookedList")
        : []
    });
  };
  UNSAFE_componentWillReceiveProps() {
    this.changeState();
  }
  componentDidMount() {
    if (this.state.rows.length === 0) {
      this.setState({ flag: false });
    }
    this.changeState();
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
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Receipt ID</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Time</TableCell>
                <TableCell align="center">Hours</TableCell>
                <TableCell align="center">Slot</TableCell>
                <TableCell align="center">{this.props.name}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!this.state.flag ? (
                this.state.rows.map(row => (
                  <TableRow key={row.receipt_id}>
                    <TableCell component="th" scope="row">
                      {row.receipt_id}
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">
                      {row.time}:00 {row.time > 11 ? "PM" : "AM"}
                    </TableCell>
                    <TableCell align="center">{row.hours}</TableCell>
                    <TableCell align="center">{row.slot}</TableCell>
                    <TableCell align="center">
                      {this.props.button ? (
                        <Button
                          id={row.receipt_id}
                          variant="outlined"
                          color="secondary"
                          onClick={() => this.whenCancelHandler(row.receipt_id)}
                        >
                          Cancel
                        </Button>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
