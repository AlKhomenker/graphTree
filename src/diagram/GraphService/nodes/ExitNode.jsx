import React from 'react';

import {Button} from '@material-ui/core';

import {useStyles} from '../../style/use-styles';
function ExitNode(props) {
    const{id, data} = props;
    const{title, onNodeClick} = data;
    const classes = useStyles();
    return (
        <Button variant="outlined" className={classes.componentExit} onClick={() => onNodeClick(id)}>{title}</Button>
    );
}

export default ExitNode;