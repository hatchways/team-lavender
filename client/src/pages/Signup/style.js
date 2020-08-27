const SignupPageStyle = () => ({
    //step 1
      signupContainer: {
        margin  :   "auto",
        width : "400px",
        height : "480px",
        "-webkit-box-shadow" : "1px 1px 10px 3px rgba(196,196,196,1)",
        font : "Arial, Helvetica, sans-serif",
        fontWeight : "bold",
        "text-align" : "center"
      },
      aboveDivider : {
        position : "relative",
        height : "75%"
      },
      belowDivider : {
        "position" : "relative",
        "top" : "40px"
      },
      textField : {
      },
      firstDivAboveDivider : {
        fontSize : "20px",
        "position" : "relative",
        "top" : "40px"
      },
      secondDivAboveDivider : {
        "position" : "relative",
        "top" : "70px"
      },
      firstDivOfSecondDivAboveDivider : {
        fontSize : "12px",
        "margin-top" : "30px",
        "margin-bottom" : "10px"
      },
      textFieldOfSecondDivAboveDivider : {
        "width" : "70%"
      },
      startButton : {
        "width" : "30%",
        fontSize : "13px",
        "position" : "relative",
        fontWeight : "bold",
        "top" : "130px",
        "background-color" : "#F78104",
        "color" : "white",
        "padding" : "13px"
      },
      loginButton : {
        color : "#F78104",
        "text-decoration": "none" 
      },
      title : {
        display : "flex",
        fontSize : "20px",
        fontWeight : "bold",
        "justify-content" : "center",
        "margin" : "50px"
      },
    
    // step 2
      signupDescription : {
        "position" : "relative",
        "top" : "70px",
        "padding-right" : "60px",
        "padding-left" : "60px",
        fontWeight : "normal",
        "color" : "#808080",
        fontSize : "13px"
      },
      gmailSignup : {
        "width" : "50%",
        fontSize : "13px",
        "position" : "relative",
        fontWeight : "bold",
        "top" : "130px",
        "background-color" : "#F78104",
        "color" : "white",
        "padding" : "13px"
      },
      belowDividerStepTwo : {
        "position" : "relative",
        "top" : "40px"
      },
      buttonbelowDividerStepTwo : {
        color : "#F78104",
      }
});

export default SignupPageStyle;