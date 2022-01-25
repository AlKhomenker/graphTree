import React from "react";

import { Grid, Box, Typography, Avatar } from "@material-ui/core";

import { useStyles } from "../../style/use-styles";

function StartNode(props) {
  const { id, data, type} = props;
  const { settings, onNodeClick} = data;
  const { name ,description} = settings;
  const classes = useStyles();

  return (
    <>
      <Grid container className={`${classes.component} ${classes.componentStart}`} onClick={() => onNodeClick({type, id, settings})}>
        <Grid item xs={10}>
          <Box className={classes.txtBlock}>
            <Typography variant="h6" className={classes.h6}>
              {name}
            </Typography>
          </Box>
          <Typography variant="h6">
            {description}
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
