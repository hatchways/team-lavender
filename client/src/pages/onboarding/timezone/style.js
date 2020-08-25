const TimezonePageStyle = (theme) => ({
      title : {
        display : "flex",
        fontSize : "20px",
        fontWeight : "bold",
        "justify-content" : "center",
        "margin" : "50px"
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
        display : "flex",
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
        "justify-content" : "flex-start",
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
        width : "30%",
        "background-color" : "#F78104",
        "border-radius" : "25px"
      },
      //below divider
      belowDivider_firstDiv : {
        position : "relative",
        height : "25%",
        display : "flex",
        "justify-content" : "center",

      },
      belowDivider_firstDiv_firstDiv : {
        position : "relative",
        width : "40%",
        "padding-top" : "35px",
      },
      belowDivider_firstDiv_secondDiv : {
        position : "relative",
        width : "60%",
        display : "flex",
        "justify-content" : "start",
        "padding-top" : "20px",
      },
      belowDivider_firstDiv_secondDiv_textFieldWrapper : {
        display : "flex",
        position : "relative",
        width: "90%",
        height : "50px",
        "border" : "1px solid #C4C4C4",
        "border-radius" : "5px",
        '& p' : {
            width : "40%",
            color : "gray"
        },
      },
      belowDivider_firstDiv_secondDiv_textFieldWrapper_TextField : {
        position : "relative",
        top : "4px",
        left : "10px"
      },
      belowDivider_secondDiv : {
        position : "relative",
        height : "25%",
        display : "flex",
        "justify-content" : "center",
      },
      belowDivider_secondDiv_firstDiv : {
        position : "relative",
        width : "40%",
        "padding-top" : "35px",
      },
      belowDivider_secondDiv_secondDiv : {
        position : "relative",
        width : "60%",
        display : "flex",
        "justify-content" : "start",
        "padding-top" : "20px",
      },
      belowDivider_secondDiv_secondDiv_FormControl : {
        position: "relative",
        width : "30%",
      },
      belowDivider_firstDiv_secondDiv_FormControl : {
        position: "relative",
        width : "60%",
      },
      belowDivider_thirdDiv : {
        position : "relative",
        height : "50%",
      },
      belowDivider_thirdDiv_continueButton : {
        "width" : "30%",
        fontSize : "13px",
        "position" : "relative",
        fontWeight : "bold",
        "top" : "80px",
        "background-color" : "#F78104",
        "color" : "white",
        "padding" : "13px"
      },
});

export default TimezonePageStyle;