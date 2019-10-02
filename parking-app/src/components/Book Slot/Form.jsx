import React, { Component } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button
} from "@material-ui/core";

import ScrollableTabsButtonAuto from "./Tabss";

export default class BookSlot extends Component {
  state = {
    date: "",
    time: "",
    hours: "",
    dateError: "",
    flag: false,
    error: ""
  };
  dateError = () => {};
  whenChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, dateError: "", error: "", flag: false });
  };
  dateError = () => {
    const CurrentDate = new Date();
    const GivenDate = new Date(this.state.date);

    if (CurrentDate.setHours(0, 0, 0, 0) === GivenDate.setHours(0, 0, 0, 0)) {
      return true;
    } else if (CurrentDate > GivenDate) {
      this.setState({ dateError: "selected date is a past date" });
      return false;
    }
    return true;
  };
  requireError = () => {
    if (
      this.state.hours === "" ||
      this.state.time === "" ||
      this.state.date === ""
    ) {
      this.setState({ error: "All Fields Required" });
      return false;
    }
    return true;
  };
  whenClickHandler = () => {
    if (this.requireError() && this.dateError()) {
      this.setState({ flag: true, error: "" });
    } else if (!this.requireError()) {
      this.setState({ flag: false });
    }
  };
  render() {
    const array = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    let count = 0;
    let count1 = 0;
    return (
      <div>
        <br />
        <span style={{ color: "red" }}>{this.state.error}</span>
        <br />
        <form>
          <TextField
            style={{ width: "300px" }}
            value={this.state.date}
            onChange={this.whenChangeHandler}
            id="outlined-date-input"
            label="Select Date"
            type="date"
            name="date"
            autoComplete="date"
            margin="normal"
            variant="outlined"
          />
          <br />
          <span style={{ color: "red" }}>{this.state.dateError}</span>
          <br />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-time-simple">Select Time</InputLabel>
            <Select
              value={this.state.time}
              style={{ width: "300px" }}
              onChange={this.whenChangeHandler}
              inputProps={{
                name: "time",
                id: "outlined-time-simple"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {//Here if we select past date then no time will be shown
              //if we select current date then only that time will be shown which are currently available
              //if we select future date then all time will be shown
              array.map(item =>
                new Date() < new Date(this.state.date) ||
                (new Date().setHours(0, 0, 0, 0) ===
                  new Date(this.state.date).setHours(0, 0, 0, 0) &&
                  new Date().getHours() < item) ? (
                  <MenuItem value={item} key={item}>
                    {item}:00 {item > 11 ? "PM" : "AM"}
                  </MenuItem>
                ) : (
                  <span value={item} key={item}></span>
                )
              )}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginLeft: "10px" }}>
            <InputLabel htmlFor="outlined-hours-simple">
              Select Hours
            </InputLabel>
            <Select
              value={this.state.hours}
              style={{ width: "300px" }}
              onChange={this.whenChangeHandler}
              inputProps={{
                name: "hours",
                id: "outlined-hours-simple"
              }}
              className="form-select2"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {//Here if we select past date then no hours will be shown
              //if we select current date then only that hours will be shown which are currently available
              //if we select future date then all hours will be shown
              array.map(item =>
                (new Date() < new Date(this.state.date) ||
                  (new Date().setHours(0, 0, 0, 0) ===
                    new Date(this.state.date).setHours(0, 0, 0, 0) &&
                    new Date().getHours() < item)) &&
                parseInt(this.state.time) <= item ? (
                  <MenuItem value={++count1} key={item}>
                    {++count}:00 {count > 1 ? "Hrs" : "Hr"}
                  </MenuItem>
                ) : (
                  <span value={item} key={item}></span>
                )
              )}
            </Select>
          </FormControl>
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
              onClick={this.whenClickHandler}
            >
              Select Slot
            </Button>
          </Grid>
        </form>
        <br />
        {this.state.flag ? (
          <ScrollableTabsButtonAuto
            date={this.state.date}
            time={this.state.time}
            hours={this.state.hours}
          />
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}
