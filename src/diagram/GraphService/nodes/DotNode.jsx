import { Box } from '@material-ui/core';
import {useStyles} from '../../style/use-styles';

 function DotNode(props) {
    const { id, data, type} = props;
    const { onNodeClick } = data;
    const classes = useStyles();

    return (
        <>
            <Box className={classes.componentDot} onClick={() => onNodeClick({type, id})}>
                <Box className={classes.dot} >.</Box>
            </Box>
        </>
    );
}

export default DotNode;