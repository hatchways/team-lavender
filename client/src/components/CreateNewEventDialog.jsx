import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

function CreateNewEventDialog(props) {
  const classes = useStyles();
  const [duration, setDuration] = React.useState(15); // 0 : 15min, 1 : 30min, 2 : 60min
  const [eventName, setEventName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [eventURL, setEventURL] = React.useState("");

  function durationButtonClicked(duration) {
    setDuration(duration);
  }

  return (
    <Dialog open={props.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
      <DialogContent>
        <ButtonGroup className={classes.buttonGroup}>
          <Button
            className={duration === 15 ? classes.buttonClicked : null}
            onClick={() => durationButtonClicked(15)}
          >
            15 min
          </Button>
          <Button
            className={duration === 30 ? classes.buttonClicked : null}
            onClick={() => durationButtonClicked(30)}
          >
            30 min
          </Button>
          <Button
            className={duration === 60 ? classes.buttonClicked : null}
            onClick={() => durationButtonClicked(60)}
          >
            60 min
          </Button>
        </ButtonGroup>
        <TextField
          label="Don't add name"
          margin="dense"
          id="name"
          size="medium"
          fullWidth
          variant="outlined"
          onChange={(event) => {
            const { value } = event.target;
            setEventName(value);
          }}
        />
        <TextField
          label="Don't add Description"
          margin="dense"
          id="description"
          size="medium"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          onChange={(event) => {
            const { value } = event.target;
            setDescription(value);
          }}
        />
        <div className={classes.meetingURL}>
          <p>calendapp.com {window.location.pathname}</p>
          <TextField
            id="url"
            margin="dense"
            variant="outlined"
            onChange={(event) => {
              const { value } = event.target;
              setEventURL(value);
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.create(duration, eventName, description, eventURL);
            window.location.reload();
          }}
        >
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
    display: "flex",
    "& *": {
      "margin-left": "5px",
      "margin-right": "5px",
    },
  },
  meetingURL: {
    display: "flex",
    "& p": {
      "font-size": "15px",
      "margin-right": "10px",
    },
  },
  buttonClicked: {
    backgroundColor: "#C4C4C4",
  },
  buttonGroup: {
    "& button:hover": {
      backgroundColor: "#C4C4C4",
    },
  },
}));

export default CreateNewEventDialog;
