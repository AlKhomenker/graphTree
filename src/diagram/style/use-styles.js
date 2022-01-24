import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    graph: {
        width: "100%", 
        height: "100%", 
        background: "#eee", 
        margin: '0 auto'
    },
    txtBlock: {
        margin: '0 0 10px 0',
        display: 'flex'
    },
    box: {
        margin: '0 10px'
    },
    h6: {
        fontWeight: 'bold'
    },
    blockIcon:{
        margin: '0 0 10px',
        padding: '0',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    icon:{
        margin: '0 -10px',
        padding: '0'
    },
    blockFlex: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    componentAction: {
        width: '600px',
        background: 'white',
        borderRadius: '20px',
        padding: '10px 20px 20px',
        margin: '0 auto',
        border: 'solid 1px #979797',
        boxSizing: 'border-box',
        '&:hover': {
            boxShadow: '1px 1px 5px #888888'
        }
    },
    component: {
        background: '#d8d8d8',
        width: '100%',
        borderRadius: '20px',
        padding: '20px',
        margin: '0 auto',
        border: 'solid 1px #979797',
        boxSizing: 'border-box',
        '&:hover': {
            boxShadow: '1px 1px 5px #888888'
        }
    },
    componentStart: {
        height: '160px',
    },
    componentEmail: {
        height: '230px',
    },
    componentDelay: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40px',
        width: '290px',
        padding: '5px 20px',
        borderRadius: '30px',
    },
    componentExit: {
        height: 'auto',
        width: '60px',
        padding: '5px 20px',
        borderRadius: '30px',
        margin: '0 auto',
        border: 'solid 1px #979797',
        backgroundColor: '#eee',
        '&:hover': {
            backgroundColor: '#eee',
            boxShadow: '1px 1px 5px #888888'
        }
    },
    componentPlus: {
        height: '30px',
        width: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        backgroundColor: '#979797',
        borderRadius: '50%'
    },
    componentDot: {
        height: '30px',
        width: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        height: '15px',
        width: '15px',
        borderRadius: '50%',
        backgroundColor:'#979797',
        color: 'transparent'
    },
    avatar: {
        width: '60px',
        height: '60px',
        margin: '0 auto 10px',
        padding: '0'
    },
    avatarBlock: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignContent: 'space-between'
    },
    avatarBlockEnd: {
        display: 'flex',
        alignItems: 'flex-end'
    },
    steps: {
        backgroundColor: 'transparent',
        padding: '30px 0 0'
    },
    edge: {
        backgroundColor: '#808080',
        color: 'white',
        border: 'none',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        transition: 'height 1s'
    },
    edgeExit: {
        borderRadius: '50%',
        backgroundColor: '#808080',
        color: 'white',
        border: 'none',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        fontSize: '20px'
    },
    actionBlock: {
        width: '100px',
        padding: '0',
        cursor: 'pointer',
        textAlign: 'center',
        '&:hover': {
            borderRadius: '20px',
            boxShadow: '1px 1px 5px #888888'
        }
    }
}));