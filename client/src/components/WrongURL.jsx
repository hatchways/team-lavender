import React from "react";
import { makeStyles } from "@material-ui/core/styles";



const WrongURLPage = (props) => {
    const classes = useStyles();
    return (
      <div className={classes.container}>
        <div>
            URL IS WRONG
        </div>
      </div>
    );
};


const useStyles = makeStyles((theme) => ({
    container : {
        margin : "auto",
        "& > div" : {
            fontSize : "20px"
        }
    }
}));
  
export default WrongURLPage;