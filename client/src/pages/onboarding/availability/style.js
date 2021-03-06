const AvailabilityPageStyle = (theme) => ({
    title : {
      display : "flex",
      fontSize : "20px",
      fontWeight : "bold",
      justifyContent : "center",
      margin : "50px"
    },
    timezoneContainer : {
      margin  :   "auto",
      width : "700px",
      height : "480px",
      "-webkit-box-shadow" : "1px 1px 10px 3px rgba(196,196,196,1)",
      font : "Arial, Helvetica, sans-serif",
      fontWeight : "bold",     
      "text-align" : "center"
    },
    aboveDivder : {
      position : "relative",
      height : "20%",
      display : "flex"
    },
    belowDivider : {
      position : "relative",
      height : "80%",
    },
    aboveDivider_firstDiv : {
      position : "relative",
      width : "50%",
    },
    aboveDivider_secondDiv : {
      position : "relative",
      width : "50%",
      display : "flex",
      justifyContent : "flex-start",
    },
    aboveDivider_firstDiv_p : {
      position : "relative",
      top : "20%"
    },
    aboveDivider_secondDiv_firstDiv : {
      position : "relative",
      width : "266px",
      height: "10px",
      top: "40%",
      left: "10%",
      "background-color" : "lightgray",
      "border-radius" : "25px"
    },
    aboveDivider_secondDiv_firstDiv_divs : {
      position : "relative",
      height: "100%",
      width : "90%",
      "background-color" : "#F78104",
      "border-radius" : "25px"
    },
    belowDivider_firstDiv : {
      position : "relative",
      height: "30%",
      "padding-left" : "50px",
      "text-align" : "left"
    },
    belowDivider_secondDiv : {
      position : "relative",
      height: "30%",
      "padding-left" : "50px",
      "padding-right" : "95px",
      "text-align" : "left"
    }, 
    belowDivider_thirdDiv : {
      position : "relative",
      height: "40%",
    },
    belowDivider_thirdDiv_continueButton : {
      "width" : "30%",
      fontSize : "13px",
      "position" : "relative",
      fontWeight : "bold",
      "top" : "10px",
      "background-color" : "#F78104",
      "color" : "white",
      "padding" : "13px"
    },
    belowDivider_firstDiv_form : {
      display : "flex",
      "& *" : {
        "margin-right" : "10px",
      },
      "& p" : {
        "text-align" : "left",
        "width" : "30px"
      }
    },
    belowDivider_secondDiv_secondDiv : {
      display : "flex",
      border : "1px solid lightgray",
      "justify_content" : "space-around",
      "& div" : {
      }
    }
});

export default AvailabilityPageStyle;