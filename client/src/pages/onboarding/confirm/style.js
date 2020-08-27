const ConfirmPageStyle = (theme) => ({
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
        "padding-left" : "50px",
        "padding-right" : "50px",
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
        width : "60%",
        "background-color" : "#F78104",
        "border-radius" : "25px"
    },
    belowDivider_firstDiv : {
        position : "relative",
        height : "18%",
        "text-align" : "left",
        "top" : "30px"
    },
    belowDivider_secondDiv : {
        position : "relative",
        height : "18%",
        '& div' : {
            fontWeight : "normal",
            position : "relative",
            width: "80%",
            "top" : "20px"
        },
        display : "flex",
        "text-align" : "left",
        "padding-left" : "30px",
    },
    belowDivider_thirdDiv : {
        position : "relative",
        height : "18%",
        '& div' : {
            fontWeight : "normal",
            position : "relative",
            width: "80%",
            "top" : "20px"
        },
        display : "flex",
        "text-align" : "left",
        "padding-left" : "30px",
    },
    belowDivider_fourthDiv : {
        position : "relative",
        height : "46%"
    },
    belowDivider_secondDiv_button : {
        position : "relative",
        width: "20%",
        height: "100%",
    },
    belowDivider_fourthDiv_continueButton : {
        "width" : "30%",
        fontSize : "13px",
        "position" : "relative",
        fontWeight : "bold",
        "top" : "80px",
        "background-color" : "#F78104",
        "color" : "white",
        "padding" : "13px"
    }
});

export default ConfirmPageStyle;