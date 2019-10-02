import React, { Component } from "react";
import parking from "../../images/parking1.jpg";
import Button from "@material-ui/core/Button";
import {
  deleteTaskAction,
  createTaskAction,
  deleteAllTasks
} from "../../actions/actions";
import { connect } from "react-redux";
import { getFromStorage, setInStorage } from "../../utils/storage";

class SlotTable extends Component {
  state = {
    color: "",
    parking: [1, 2, 3],
    found: {},
    isAvailable: true,
    array: [],
    tasks: [],
    isNull: true,
    booking: "",
    flag: false,
    flag1: true,
    classA:
      "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary",
    classB:
      "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary",
    classC: "yellow-color",
    slotArray: []
  };

  whenClickHandler = (e, slot) => {
    const className = e.target.className;

    if (className === this.state.classA) {
      e.target.className = this.state.classB;

      this.addToDoTask(
        slot,
        this.props.date,
        this.props.time,
        this.props.hours,
        slot,
        this.state.found.id
      );
    } else if (e.target.className === this.state.classB) {
      e.target.className = this.state.classA;
      this.deleteTask(slot);
    } else {
      alert("This slot is booked try another slot");
    }
  };
  addToDoTask = (id, date, time, hours, slot, user_id) => {
    this.props.dispatch(createTaskAction(id, date, time, hours, slot, user_id));
  };
  deleteTask = task_id => {
    this.props.dispatch(deleteTaskAction(task_id));
  };

  whenSaveHandler = () => {
    if (!this.state.isNull) {
      setInStorage(
        "parkingBookedList",
        getFromStorage("parkingBookedList").concat(this.props.tasks)
      );
    } else {
      setInStorage("parkingBookedList", this.props.tasks);
    }
    if (getFromStorage("parkingBookedList") !== null)
      this.checkSlotAvailability();

    if (this.props.tasks.length !== 0) {
      this.setState({ booking: "Slots Booked Successfully" });
      this.props.dispatch(deleteAllTasks());
    }
    setTimeout(() => {
      this.setState({ booking: "", flag1: false });
    }, 1000);
  };

  dateTimeChecker = item => {
    const startDate = new Date(new Date(item.date).getTime());
    startDate.setHours(item.time);
    startDate.setMinutes("00");
    startDate.setSeconds("00");

    const endDate = new Date(new Date(item.date).getTime());
    endDate.setHours(item.time + item.hours);
    endDate.setMinutes("00");
    endDate.setSeconds("00");

    const selectedStartDate = new Date(new Date(this.props.date).getTime());
    selectedStartDate.setHours(this.props.time);
    selectedStartDate.setMinutes("00");
    selectedStartDate.setSeconds("00");

    const selectedEndDate = new Date(new Date(this.props.date).getTime());
    selectedEndDate.setHours(this.props.time + this.props.hours);
    selectedEndDate.setMinutes("00");
    selectedEndDate.setSeconds("00");

    if (startDate < selectedEndDate && endDate > selectedStartDate) {
      this.state.slotArray.push(item.slot);
    }
  };
  checkSlotAvailability = () => {
    getFromStorage("parkingBookedList").forEach(item =>
      this.dateTimeChecker(item)
    );
  };
  componentDidMount() {
    if (
      getFromStorage("parkingBookedList") !== null &&
      this.props.tasks.length === 0
    ) {
      this.setState({ isNull: false });
    } else {
      this.setState({ isNull: true });
    }

    if (getFromStorage("parkingBookedList") !== null)
      this.checkSlotAvailability();

    this.setState({
      found: getFromStorage("db")[0].users.find(item => {
        return item.token === getFromStorage("token");
      })
    });
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ color: "green" }}>{this.state.booking}</div>
        <div
          style={{
            backgroundImage: `url("${parking}")`,
            paddingBottom: "10px"
          }}
        >
          {this.props.parking.map(item => (
            <button
              className={
                this.state.slotArray.find(item1 => item1 === item)
                  ? this.state.classC
                  : this.state.classA
              }
              id={item}
              onClick={e => this.whenClickHandler(e, item)}
              style={{
                width: "150px",
                height: "40px",
                marginTop: "10px",
                marginRight: "10px",
                marginLeft: "10px"
              }}
              key={item}
            >
              Slot {item}
            </button>
          ))}
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            style={{
              width: "300px",
              height: "40px",
              marginTop: "10px",
              marginRight: "10px"
            }}
            onClick={this.whenSaveHandler}
          >
            Save
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
export default connect(state => ({
  tasks: state.tasks
}))(SlotTable);
