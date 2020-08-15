import React, { Component, useState } from "react";

import { Button, Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import ConfirmPageStyle from "./style"

function ConfirmPage (props) {
    const { classes } = props;

    return (
        <div>
            <div className={classes.title}><div style={{color : "#F78104"}}>calend</div>App</div>
            <div className={classes.timezoneContainer}>
                <div className={classes.aboveDivder}>
                    <div className={classes.aboveDivider_firstDiv}>
                        <p className={classes.aboveDivider_firstDiv_p}>Your Google Calendar is Connected!</p>
                    </div>
                    <div className={classes.aboveDivider_secondDiv}>
                        <div className={classes.aboveDivider_secondDiv_firstDiv}>
                            <div className={classes.aboveDivider_secondDiv_firstDiv_divs}></div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={classes.belowDivider}>
                    <div className={classes.belowDivider_firstDiv}>Here is how CalendApp will work with john-doe@gmail.com : </div>
                    <Divider/>
                    <div className={classes.belowDivider_secondDiv}>
                        <div>1. We will check "<b>john-doe@gmail.com</b>" for conflicts</div>
                        <Button className={classes.belowDivider_secondDiv_button}>Edit</Button>
                    </div>
                    <Divider/>
                    <div className={classes.belowDivider_thirdDiv}>
                        <div>2. We will add event to "<b>john-doe@gmail.com</b>"</div>
                        <Button className={classes.belowDivider_secondDiv_button}>Edit</Button>
                    </div>
                    <Divider/>
                    <div className={classes.belowDivider_fourthDiv}>
                        <Button className={classes.belowDivider_fourthDiv_continueButton} href="/profile_setting/availability">
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default withStyles(ConfirmPageStyle)(ConfirmPage);