import React from 'react';

import {Avatar, Box, IconButton, Typography} from '@material-ui/core';
import {Close} from '@material-ui/icons';

import {useStyles} from '../../style/use-styles';
import { actions } from '../config';

function ActionNode(props) {
    const { id, data } = props;
    const {onActionNodeClick} = data;
    const classes = useStyles();

    return (
        <>
            <Box className={classes.componentAction}>
                <Box className={classes.blockIcon}>
                    <IconButton className={classes.icon} onClick={() => onActionNodeClick({type:'close', id})}>
                        <Close/>
                    </IconButton>
                </Box>
                    
                <Box className={classes.blockFlex}>  
                    {
                        actions.map((item) =>{
                            const{action, type} = item;
                            return(
                                <Box key={action} className={classes.actionBlock} onClick={() => onActionNodeClick({type, id})}>
                                    <Avatar className={classes.avatar}/>
                                    <Typography>{action}</Typography>
                                </Box>   
                            )
                        })
                    }
                </Box>
            </Box>
        </>
    );
}

export default ActionNode;