import {
  Grid,
  Typography,
  MobileStepper,
  Avatar,
  Box,
} from "@material-ui/core";
import { useStyles } from "../../style/use-styles";


function SplitNode(props) {
  const { id, data, type} = props;
  const { settings, onNodeClick } = data;
  const { name, interval } = settings;
  
  
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.component} id={id} >
        <Grid item xs={10} onClick={() => onNodeClick({type, id})}>
             <Box className={classes.txtBlock}>
                 <Typography variant="h6" className={classes.h6}>
                     {name}
                </Typography>
                <Box className={classes.box} style={{color:'#808080'}}> | </Box>
                <Typography variant="h6" style={{color:'#808080'}}>
                    {interval.value} {interval.unit}
                </Typography>
            </Box>

            <Typography variant="h6" style={{color:'#808080'}}>
                {'Select a flow trigger on the right to get started.'}
             </Typography>

            <MobileStepper className={classes.steps} variant="dots" steps={3} position="static" />
        </Grid>
            
        <Grid item xs={2} className={classes.avatarBlock} >
            <Typography onClick={() => onNodeClick({type:'close', id})}>...</Typography>
            <Avatar className={classes.avatar}/>
        </Grid>
      </Grid>   
    </>
  );
}

export default SplitNode;
