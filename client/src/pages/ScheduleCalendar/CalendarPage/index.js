import React, { useEffect } from "react";
import { Divider,CircularProgress } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import linkChecker from "../../../utils/linkChecker"
import WrongURL from "../../../components/WrongURL"

import Calendar from "../../../components/Calendar"

import ScheduleCalendarStyle from "./style";

function ScheduleCalendarPage(props) {
    const { classes } = props;
    let pathArray = window.location.pathname.split('/');
    const [userURL] = React.useState(pathArray[1]);
    const [eventURL] = React.useState(pathArray[2]);
    const [hostName, setHostName] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [isExist, setIsExist] = React.useState(1);
    const [data] = React.useState({
        calendarURL : userURL,
        eventURL : eventURL
    })
    // const [hostAvailableDay, setHostAvailableDay] = React.useState(Array);
    useEffect(() => {
        // check if calendarURL and eventURL is right
        const check = async function() {
            const res = await linkChecker.checkLink(data)
            if (!res.data.isExist) {
                setIsExist(false);
            } else {
                setIsExist(true);
                setHostName(res.data.hostName);
                setDuration(res.data.duration);
            }
        }
        check();
    }, [])

    

    if (isExist) {
        return(
            <div>
                <div className={classes.title}>
                    <div style={{ color: "#F78104" }}>calend</div>App
                </div>
                <div className={classes.scheduleCalendarContainer}>
                    <div className={classes.onTheLeftOfDivider}>
                        <div>{hostName}</div>
                        <div>Online Interview</div>
                        <div className={classes.duration}>
                            <AccessTimeIcon />
                            <div>{duration} min</div>
                        </div>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className={classes.onTheRightOfDivider}>
                        <Calendar userURL={userURL} eventURL={eventURL}></Calendar>
                    </div>
                </div>
            </div>
        );
    } else if(!isExist) {
        return(
            <div>
                <WrongURL></WrongURL>
            </div>
        )
    } else {
        return(
            <div>
                <CircularProgress />
            </div>
        )
    }
}

export default withStyles(ScheduleCalendarStyle)(ScheduleCalendarPage);
