
import { Typography, Avatar, Box } from "@material-ui/core";

import { useStyles } from "../../style/use-styles";
import { Handle } from "react-flow-renderer";


function DelayNode(props) {
  const { settings} = props;
  // const { data, id } = props;
  // const { settings, onClick, height } = data;
  const classes = useStyles();
  //const { name, interval } = settings;

  return (
    <>
        <Box
          className={`${classes.component} ${classes.componentDelay}`}
          // onClick={onClick}
        >
          <Typography variant="h6">{settings.name}</Typography>
          <Typography variant="h6">
            {settings.interval.value} {settings.interval.unit}
          </Typography>
          <Avatar />
          <Typography>...</Typography>
        </Box>
    </>
  );
}

export default DelayNode;
