import { makeStyles, createStyles} from '@material-ui/core';

export const useStyles = makeStyles(
    createStyles({
      button: {
        position: "relative",
        width: "250px",
        height: "0",
        background: "white",
        color: "black",
        "& > span": {
          flexFlow: "column"
        },
        "&:hover": {
          background: "white"
        }
      },
      name: {
        fontSize: "16px"
      },
      edit: {
        position: "absolute",
        top: "0px",
        right: "0px",
        color: "#4BA083"
      },
      attributes: {
        position: "absolute",
        bottom: "5px",
        right: "10px"
      }
    })
  );