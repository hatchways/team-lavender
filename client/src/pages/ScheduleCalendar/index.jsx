import React from "react";
import { Divider } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";

import TimePicker from "../../components/TimePicker"
import Calendar from "../../components/Calendar"

import ScheduleCalendarStyle from "./style";

function ScheduleCalendarPage(props) {
    const { classes } = props;
    return(
        <div>
            <div className={classes.title}>
                <div style={{ color: "#F78104" }}>calend</div>App
            </div>
            <div className={classes.scheduleCalendarContainer}>
                <div className={classes.onTheLeftOfDivider}></div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.onTheRightOfDivider}>
                    <Calendar></Calendar>
                    <TimePicker></TimePicker>
                </div>
            </div>
        </div>
    );
}

export default withStyles(ScheduleCalendarStyle)(ScheduleCalendarPage);
