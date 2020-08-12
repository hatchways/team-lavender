const SignupPageStyle = () => ({
    //step 1
      signupContainer: {
        margin  :   "auto",
        width : "400px",
        height : "480px",
        "-webkit-box-shadow" : "1px 1px 10px 3px rgba(196,196,196,1)",
        font : "Arial, Helvetica, sans-serif",
        "font-weight" : "bold",
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
        "font-size" : "20px",
        "position" : "relative",
        "top" : "40px"
      },
      secondDivAboveDivider : {
        "position" : "relative",
        "top" : "70px"
      },
      firstDivOfSecondDivAboveDivider : {
        "font-size" : "12px",
        "margin-top" : "30px",
        "margin-bottom" : "10px"
      },
      textFieldOfSecondDivAboveDivider : {
        "width" : "70%"
      },
      startButton : {
        "width" : "30%",
        "font-size" : "13px",
        "position" : "relative",
        "font-weight" : "bold",
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
        "font-size" : "20px",
        "font-weight" : "bold",
        "justify-content" : "center",
        "margin" : "50px"
      },
    
    // step 2
      signupDescription : {
        "position" : "relative",
        "top" : "70px",
        "padding-right" : "60px",
        "padding-left" : "60px",
        "font-weight" : "normal",
        "color" : "#808080",
        "font-size" : "13px"
      },
      gmailSignup : {
        "width" : "50%",
        "font-size" : "13px",
        "position" : "relative",
        "font-weight" : "bold",
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