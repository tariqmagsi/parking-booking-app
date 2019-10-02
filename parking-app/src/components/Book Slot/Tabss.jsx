import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SlotTable from "./SlotTable";
import { getFromStorage } from "../../utils/storage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ScrollableTabsButtonAuto(props) {
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
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Parking Area A" {...a11yProps(0)} />
          <Tab label="Parking Area B" {...a11yProps(1)} />
          <Tab label="Parking Area C" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SlotTable
          date={props.date}
          time={props.time}
          hours={props.hours}
          parking={getFromStorage("parkings").parking1}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SlotTable
          date={props.date}
          time={props.time}
          hours={props.hours}
          parking={getFromStorage("parkings").parking2}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SlotTable
          date={props.date}
          time={props.time}
          hours={props.hours}
          parking={getFromStorage("parkings").parking3}
        />
      </TabPanel>
    </div>
  );
}
