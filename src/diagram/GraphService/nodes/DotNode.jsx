import React from 'react';

import {useStyles} from '../../style/use-styles';

 function DotNode(props) {
    const classes = useStyles();

    return (
        <div variant="outlined" className={classes.componentDot}>.</div>
    );
}

export default DotNode;