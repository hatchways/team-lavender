import React, { Component } from "react";

import { Button, Divider, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Route, Link } from "react-router-dom";
import AvailabilityPageStyle from "../../css/onboarding/Onboarding.availabilityCss"

function AvailabilityPage (props) {
    const { classes } = props;

    return (
        <div>
            <div className={classes.title}><div style={{color : "#F78104"}}>calend</div>App</div>
            <div className={classes.timezoneContainer}>
                <div className={classes.aboveDivder}>
                    <div className={classes.aboveDivider_firstDiv}>
                        <p className={classes.aboveDivider_firstDiv_p}>Set your availability</p>
                    </div>
                    <div className={classes.aboveDivider_secondDiv}>
                        <div className={classes.aboveDivider_secondDiv_firstDiv}>
                            <div className={classes.aboveDivider_secondDiv_firstDiv_divs}></div>
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={classes.belowDivider}>
                    <div className={classes.belowDivider_firstDiv}>
                        <p>Available Hours :</p>
                        <form className={classes.belowDivider_firstDiv_form} noValidate>
                            <TextField
                                variant="outlined"
                                type="time"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                            />
                            <p> ~ </p>
                            <TextField
                                variant="outlined"
                                type="time"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                inputProps={{
                                step: 300, // 5 min
                                }}
                            />
                        </form>
                    </div>
                    <div className={classes.belowDivider_secondDiv}> 
                        <p>Available Days : </p>
                        <div className={classes.belowDivider_secondDiv_secondDiv}>
                            <div>
                                <FormControlLabel
                                    value="bottom"
                                    control={<Checkbox color="#F78104" />}
                                    label="Sundays"
                                    labelPlacement="bottom"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    value="bottom"
                                    control={<Checkbox color="#F78104" />}
                                    label="Mondays"
                                    labelPlacement="bottom"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    value="bottom"
                                    control={<Checkbox color="#F78104" />}
                                    label="Tuesdays"
                                    labelPlacement="bottom"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    value="bottom"
                                    control={<Checkbox color="#F78104" />}
                                    label="Wednesdays"
                                    labelPlacement="bottom"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    value="bottom"
                                    control={<Checkbox color="#F78104" />}
                                    label="Thursdays"
                                    labelPlacement="bottom"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    value="bottom"
                                    control={<Checkbox color="#F78104" />}
                                    label="Fridays"
                                    labelPlacement="bottom"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    value="Saturdays"
                                    control={<Checkbox color="#F78104" />}
                                    label="Saturdays"
                                    labelPlacement="bottom"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.belowDivider_thirdDiv}>
                        <Button className={classes.belowDivider_thirdDiv_continueButton} href="/profile_setting/availability">
                            Finish
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default withStyles(AvailabilityPageStyle)(AvailabilityPage);
