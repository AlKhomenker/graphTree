import {
  Grid,
  Typography,
  MobileStepper,
  Avatar,
  Box,
} from "@material-ui/core";

import { useStyles } from "../../style/use-styles";
import { Handle } from "react-flow-renderer";

function EmailNode(props) {
  // const { data, id } = props;
  // const { settings, onClick, height } = data;
  // const { name, subject } = settings;
  const { settings} = props;
  const classes = useStyles();
  
  return (
    <>
          <Grid container className={classes.component}
          //  onClick={onClick} id={id}
           >
            <Grid item xs={10}>
                <Box className={classes.txtBlock}>
                    <Typography variant="h6" className={classes.h6}>
                        {settings.name}
                    </Typography>
                    <Box className={classes.box} style={{color:'#808080'}}> | </Box>
                    <Typography variant="h6" style={{color:'#808080'}}>
                        {settings.name}
                    </Typography>
                </Box>

                <Typography variant="h6" style={{color:'#808080'}}>
                    {settings.subject}
                </Typography>

                <MobileStepper className={classes.steps} variant="dots" steps={3} position="static" />
            </Grid>
            
            <Grid item xs={2} className={classes.avatarBlock} >
                <Typography>...</Typography>
                <Avatar className={classes.avatar}/>
            </Grid>
        </Grid>
    </>
  );
}

export default EmailNode;
