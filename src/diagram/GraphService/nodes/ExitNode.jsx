import {Button} from '@material-ui/core';
import {useStyles} from '../../style/use-styles';

function ExitNode(props) {
    const{id, data, type} = props;
    const{title, onNodeClick} = data;
    const classes = useStyles();
    return (
        <>
            <Button variant="outlined" className={classes.componentExit} onClick={() => onNodeClick({type, id})}>{title}</Button>
        </>
    );
}

export default ExitNode;