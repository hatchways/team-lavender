import React from "react";
import { withStyles } from "@material-ui/core/styles";

import AppointmentConfirmStyle from "./style";
import AppointmentConfirm from "../../../components/AppointmentConfirm";

function AppointmentConfirmPage(props) {
    const { classes } = props;
   
    return(
        <div>
            <AppointmentConfirm></AppointmentConfirm>
        </div>
    );
}

export default withStyles(AppointmentConfirmStyle)(AppointmentConfirmPage);
