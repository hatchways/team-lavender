import React from "react";

import { Button, Divider, FormControl, Select, InputLabel, MenuItem, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TimezonePageStyle from "./style"


function TimezonePage (props) {
    const { classes } = props;

    return (
        <div>
            <div className={classes.title}><div style={{color : "#F78104"}}>calend</div>App</div>
            <div className={classes.timezoneContainer}>
                <div className={classes.aboveDivder}>
                    <div className={classes.aboveDivider_firstDiv}>
                        <p className={classes.aboveDivider_firstDiv_p}>Welcome to CalendApp!</p>
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
                        <div className={classes.belowDivider_firstDiv_firstDiv}>Create your calendApp URL : </div>
                        <div className={classes.belowDivider_firstDiv_secondDiv}>
                            <div className={classes.belowDivider_firstDiv_secondDiv_textFieldWrapper}>
                                <p class>calendapp.com/</p>
                                <Divider orientation="vertical" flexItem />
                                <TextField
                                    className={classes.belowDivider_firstDiv_secondDiv_textFieldWrapper_TextField}
                                    InputProps={{ disableUnderline: true, style: { fontSize: "18px", font : "Arial, Helvetica, sans-serif" } }}
                                    margin = "dense"
                                    size = "medium"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.belowDivider_secondDiv}>
                        <div className={classes.belowDivider_secondDiv_firstDiv}>Select your time zone : </div>
                        <div className={classes.belowDivider_secondDiv_secondDiv}>
                            <FormControl variant="outlined" className={classes.belowDivider_secondDiv_secondDiv_FormControl}>
                                <InputLabel>Time Zone</InputLabel>
                                <Select>
                                <MenuItem value={0}>UTC-7 PDT</MenuItem>
                                <MenuItem value={0}>UTC-6 MDT</MenuItem>
                                <MenuItem value={0}>UTC-5 CDT</MenuItem>
                                <MenuItem value={0}>UTC-4 EDT</MenuItem>
                                <MenuItem value={0}>UTC-3 ADT</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={classes.belowDivider_thirdDiv}>
                        <Button className={classes.belowDivider_thirdDiv_continueButton} href="/profile_setting/confirm">
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default withStyles(TimezonePageStyle)(TimezonePage);
