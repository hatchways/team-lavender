import React from "react";
import { Divider, TextField } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import MeetingConfirm from "../../../components/MeetingConfirm"

import AppointmentConfirmStyle from "./style";

function AppointmentConfirmPage(props) {
    const { classes } = props;
    console.log("passing")
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
                    <div>--time info--</div>
                    <div>--timezone info--</div>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.onTheRightOfDivider}>
                    <MeetingConfirm></MeetingConfirm>
                </div>
            </div>
        </div>
    );
}

export default withStyles(AppointmentConfirmStyle)(AppointmentConfirmPage);
