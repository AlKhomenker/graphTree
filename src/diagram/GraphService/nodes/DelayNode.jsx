
import { Typography, Avatar, Box } from "@material-ui/core";

import { useStyles } from "../../style/use-styles";
import { Handle } from "react-flow-renderer";


function DelayNode(props) {
  const { id, data, type} = props;
   const { onNodeClick, settings} = data;
  const { name, interval } = settings;
 
  const classes = useStyles();
  return (
    <>
        <Box
          className={`${classes.component} ${classes.componentDelay}`} onClick={() => onNodeClick({type, id, settings})}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="h6">
            {interval.value} {interval.unit}
          </Typography>
          <Avatar />
          <Typography>...</Typography>
        </Box>
    </>
  );
}

export default DelayNode;
