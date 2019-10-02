import React, { Component } from "react";
import LoginBar from "../Login/LoginBar";
import { Container, Box } from "@material-ui/core";
import BookSlot from "../Book Slot/BookSlot";
import { withRouter } from "react-router-dom";
import { getFromStorage, setInStorage } from "../../utils/storage";

class Booking extends Component {
  state = {
    flag: true,
    parkings: {
      parking1: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
      parking2: [
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "B10",
        "B11"
      ],
      parking3: [
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "C10",
        "C11",
        "C12"
      ]
    },
    isAdmin: false
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
        this.setState({ flag: false });
        this.props.history.push("/Booking");
      }
    }, 200);
  };
  componentDidMount() {
    setInStorage("parkings", this.state.parkings);

    if (getFromStorage("token")) {
      this.routeToAnotherPage();
    } else {
      this.props.history.push("/Login");
    }
  }
  render() {
    if (!this.state.flag)
      return (
        <div className="Booking">
          <LoginBar name="Booking" />
          <Container fixed style={{ paddingTop: "100px" }}>
            <Box
              boxShadow={3}
              style={{
                textAlign: "center",
                marginBottom: "20px",
                cursor: "pointer",
                backgroundColor: "white"
              }}
              className="location-box"
            >
              <BookSlot />
            </Box>
          </Container>
        </div>
      );
    else {
      return <div></div>;
    }
  }
}

export default withRouter(Booking);
