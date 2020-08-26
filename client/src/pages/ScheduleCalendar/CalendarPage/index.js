import React from "react";
import { Divider } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import Calendar from "../../../components/Calendar"

import ScheduleCalendarStyle from "./style";

function ScheduleCalendarPage(props) {
    const { classes } = props;

    return(
        <div>
            <div className={classes.title}>
                <div style={{ color: "#F78104" }}>calend</div>App
            </div>
            <div className={classes.scheduleCalendarContainer}>
                <div className={classes.onTheLeftOfDivider}>
                    <div>Benjamin Lee</div>
                    <div>Online Interview</div>
                    <div className={classes.duration}>
                        <AccessTimeIcon />
                        <div>30 min</div>
                    </div>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.onTheRightOfDivider}>
                    <Calendar></Calendar>
                </div>
            </div>
        </div>
    );
}

export default withStyles(ScheduleCalendarStyle)(ScheduleCalendarPage);
