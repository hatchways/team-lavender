const ScheduleCalendarStyle = () => ({
    scheduleCalendarContainer : {
        display: "flex",
        margin  : "auto",
        width : "1000px",
        height : "480px",
        boxShadow : "1px 1px 10px 3px rgba(196,196,196,1)",
        font : "Arial, Helvetica, sans-serif",
        fontWeight : "bold",     
        "text-align" : "center"
    },
    title : {
        display : "flex",
        "font-size" : "20px",
        fontWeight : "bold",
        "justify-content" : "center",
        "margin" : "50px"
    },
    onTheLeftOfDivider : {
        position : "relative",
        width : "25%",
        "& *" : {
            "font-size" : "20px",
            "margin-top" : "20px",
            "margin-bottom" : "20px" 
        }
    }, 
    onTheRightOfDivider : {
        position : "relative",
        width : "75%",
        display : "flex",
    },
    duration : {
        display : "flex",
        "justify-content" : "center"
    },
});

export default ScheduleCalendarStyle;