import React from "react";

import { Grid, Box, Typography, Avatar } from "@material-ui/core";

import { useStyles } from "../../style/use-styles";
import { Handle } from "react-flow-renderer";

function StartNode(props) {
  const { id, settings, data, type} = props;
  const { onNodeClick } = data;
  const { name } = settings;
  const classes = useStyles();

  return (
    <>
      <Grid container className={`${classes.component} ${classes.componentStart}`} onClick={() => onNodeClick({type, id})}>
        <Grid item xs={10}>
          <Box className={classes.txtBlock}>
            <Typography variant="h6" className={classes.h6}>
              {name}
            </Typography>
          </Box>
          <Typography variant="h6">
            Customers who added items to Cart and didn’t complete the purchase in
            the last 1 day
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.avatarBlockEnd}>
          <Avatar className={classes.avatar} />
        </Grid>
      </Grid> 
    </>
    
  );
}

export default StartNode;
