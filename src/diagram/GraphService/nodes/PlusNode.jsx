import {Box} from '@material-ui/core';
import {useStyles} from '../../style/use-styles';

function PlusNode(props) {
    const { id, data, type} = props;
    const { onNodeClick } = data;
    const classes = useStyles();

    return (
        <>
            <Box className={classes.componentPlus} onClick={() => onNodeClick({type, id})}>+</Box>
        </>
    );
}

export default PlusNode;