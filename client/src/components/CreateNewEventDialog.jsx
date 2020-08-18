import React from "react";
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from "@material-ui/core/TextField"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";


function CreateNewEventDialog(props) {
    const classes = useStyles();

    return (
        <Dialog 
            open={props.open}
            maxWidth = "sm"
            fullWidth = {true}
        >
            <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
            <DialogContent>
                <ButtonGroup>
                    <Button>15 min</Button>
                    <Button>30 min</Button>
                    <Button>60 min</Button>
                </ButtonGroup>
                <TextField
                    label="Event Name"
                    margin="dense"
                    id="name"
                    size="medium"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    label="Description"
                    margin="dense"
                    id="description"
                    size="medium"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                />
                <div className={classes.meetingURL}>
                    <p>
                        calendapp.com/benjaminlee-kr/
                    </p>
                    <TextField
                        id="url"
                        margin="dense"
                        variant="outlined"
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close} color="blue">
                    Create
                </Button>
                <Button onClick={props.close} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles((theme) => ({
    DialogContent: {
        display : "flex",
        "& *" : {
          "margin-left" : "5px",
          "margin-right" : "5px"
        }
    }, meetingURL :{
        display : "flex",
        "& p" : {
            "font-size" : "15px",
            "margin-right" : "10px"
        }
    }
}));

export default CreateNewEventDialog;
