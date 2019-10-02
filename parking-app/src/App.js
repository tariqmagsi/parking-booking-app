import React from "react";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import "./components/styles/styles.css";
import Booking from "./components/Booking/Booking";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import AdminBooking from "./components/Booking/AdminBooking";

class App extends React.Component {
  render() {
    const ComponentToHide = props => {
      const { location } = props;
      switch (location.pathname) {
        case "/Login":
          return null;
        case "/Signup":
          return <Signup />;
        case "/Booking":
          return <Booking />;
        case "/AdminBooking":
          return <AdminBooking />;
        default:
          return <Login />;
      }
    };

    const ComponentThatHides = withRouter(ComponentToHide);

    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <Route path="/Login" component={Login} name="active" />
            <ComponentThatHides />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
