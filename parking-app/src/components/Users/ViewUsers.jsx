import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getFromStorage } from "../../utils/storage";

export default class ViewUsers extends React.Component {
  state = { rows: [] };

  changeState = () => {
    this.setState({
      rows: getFromStorage("db")[0].users ? getFromStorage("db")[0].users : []
    });
  };
  componentDidMount() {
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
                <TableCell>User ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Age</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map(row =>
                !row.isAdmin ? (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.age}</TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={row.id}></TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
