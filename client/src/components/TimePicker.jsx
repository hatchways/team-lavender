import React from "react";
import { makeStyles } from "@material-ui/core";
import { Button, Tab, Tabs } from "@material-ui/core"



const DivInTabs = ({ className, onClick, children }) => {
  return <div className={className} onClick={onClick} children={children} />;
};

const TimePicker = (props) => {
  const classes = useStyles();
  const [clickedTime, setClickedTime] = React.useState("");
  const [clickedTimeIndex, setClickedTimeIndex] = React.useState();

  function onChoose(index, time) {
    setClickedTimeIndex(index);
    setClickedTime(time)
  }


  let items = []
  let i;

  for (i = 0; i < props.availability.length; i++) {
    const index = i;
    const time = props.availability[i];
    if (clickedTimeIndex === index) {
      items.push(<DivInTabs  key={i}>
                  <Tab className={classes.tabClicked} onClick={() => onChoose(index)} key={i} label={props.availability[i]} />
                  <Button key={i + 100} className={classes.confirmButtonActive} onClick={()=> props.toConfirmAppointmentPage(clickedTime)}>Confirm
                  </Button>
                </DivInTabs>);
    } else {
      items.push(<DivInTabs  key={i}>
                  <Tab className={classes.tabNotClicked} onClick={() => onChoose(index, time)} key={i} label={props.availability[i]} />
                  <Button key={i + 100} className={classes.confirmButtonNotActive}>
                  </Button>
                </DivInTabs>);
    }
  }

  return (
    <div className={classes.root}>
      <Tabs
        value={false}
        orientation="vertical"
        variant="scrollable"
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
    },
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: "100%",
      width: "100%"
    },
    tabs: {
      width: "100%",
    },
    tabNotClicked: {
      width: "100%",
      margin: "5px",
      fontSize: "20px",
      border : "1px solid #F77102",
      color : "#F77102",
      "border-radius" : "5px",
      "transition": "width 0.3s"
    },
    tabClicked: {
      "margin-left" :"0px",
      width: "60%",
      margin: "5px",
      fontSize: "20px",
      border : "1px solid gray",
      color : "white",
      "border-radius" : "5px",
      backgroundColor : "gray",
      "transition": "width 0.3s"
    },
    confirmButtonActive : {
      border : "1px solid #F77102",
      backgroundColor : "#F77102",
      fontSize : "15px",
      width : "35%",
      height : "100%",
      padding : "11px",
      color : "white",
      "&:hover" : {
        border: "1px solid #F79000",
        backgroundColor : "#F79000"
      },
      "transition": "width 0.3s"
    },
    confirmButtonNotActive : {
      width:"0px",
      "transition": "width 0.3s"
    }
}));
  
export default TimePicker;