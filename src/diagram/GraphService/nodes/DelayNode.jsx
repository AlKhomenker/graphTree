import { Typography, Avatar, Box } from "@material-ui/core";
import { useStyles } from "../../style/use-styles";


function DelayNode(props) {
  const { id, data, type} = props;
  const {settings, onNodeClick} = data;
  const { name, interval } = settings;
 
  const classes = useStyles();
  return (
    <>
      <Box className={`${classes.component} ${classes.componentDelay}`} >
        <Box className={classes.blockFlex} onClick={() => onNodeClick({type, id, settings})}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="h6">
            {interval.value} {interval.unit}
          </Typography>
          <Avatar />
        </Box>
        <Typography onClick={() => onNodeClick({type:'close', id})}>...</Typography>
      </Box>
    </>
  );
}

export default DelayNode;
