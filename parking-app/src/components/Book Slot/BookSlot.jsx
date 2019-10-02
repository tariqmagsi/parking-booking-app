import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  LocalParkingRounded,
  CancelScheduleSend,
  Feedback,
  VerifiedUser
} from "@material-ui/icons";

import Form from "./Form";
import Logout from "../Logout/Logout";
import ViewBooking from "../View Booking/ViewBooking";
import FeedbackTable from "../Feedback/FeedbackTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Book Parking"
            icon={<LocalParkingRounded />}
            {...a11yProps(0)}
          />
          <Tab
            label="View Booking"
            icon={<PersonPinIcon />}
            {...a11yProps(1)}
          />
          <Tab label="Feedback" icon={<Feedback />} {...a11yProps(2)} />
          <Tab
            label="Cancel Booking"
            icon={<CancelScheduleSend />}
            {...a11yProps(3)}
          />
          <Tab label="Logout" icon={<VerifiedUser />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <h1>Book a Slot</h1>
        <Form />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Bookings List</h1>
        <ViewBooking />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Feedback</h1>
        <FeedbackTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h1>Cancel Booking</h1>
        <ViewBooking name="Cancel Booking" button={true} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <h1>Profile</h1>
        <Logout />
      </TabPanel>
    </div>
  );
}
