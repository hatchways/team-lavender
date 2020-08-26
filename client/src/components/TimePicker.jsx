import React, {PropTypes} from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Box, Typography, Tab, Tabs } from "@material-ui/core"


const TimePicker = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(5);

  let button = <Tab label={<Button className={classes.button} variant="outlined" size="large">Time</Button>} />
  let items = []
  let i;
  for (i = 0; i < 10; i++) {
    items.push(button);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        { items }
      </Tabs>
    </div>
  );
};


const useStyles = makeStyles((theme) => ({
    button : {
      width: "100%",
      "& *" : {
        "font-size" : "18px"
      },
      "border-color" : "#F77102",
      "font-color" : "#F77102"
    },
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: "100%",
      width: "100%"
    },
    tabs: {
      width: "100%"
    },
}));
  
export default TimePicker;