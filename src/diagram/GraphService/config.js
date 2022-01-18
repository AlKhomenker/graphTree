const nodeTypes = {
    start: 'cartAbandonment',
    email: 'email',
    delay: 'delay',
    split: 'split',
    exit: 'exit',
    action: 'action',
    close: 'close',
    dot: 'dot'
};

const edgeTypes = {
    default: 'default',
    exitEdge: 'exitEdge',
    buttonedge: 'buttonedge'
}

const diagramClass = {
    diagramEdge: 'diagram-edge',
    dragbleItem: 'dragble-item',
    reactFlowEdgePath: 'react-flow__edge-path'
}

const actions = [
    {action:'Email', type:'email'},
    {action:'SMS', type:'sms'},
    {action:'Delay', type:'delay'},
    {action:'Split', type:'split'},
    {action:'A/B test', type:'test'}
]
   

const nodesInitialSettings = {
    start:{},
    email: {
        state: '',
        name: 'new Email',
        subject: '',
        previewText: '',
        fromName: '',
        fromEmail: '',
        skipNonOptedIn: false,
        previewUrl: '',
        strategy: 0,
        productsToDisplay: ''
    },
    sms: {},
    delay: {
        name: 'new Delay',
        state: '',
        interval: {
            value: '',
            unit: ''
        },
        daysAndTime: {
            timeslots: [],
            timezone: 'Asia/Jerusalem',
            type: ''
        }
    },
    split: {},
    test: {}
};


const nodesConfig = {
    shared: {
        // targetPosition: 'top',
        // sourcePosition: 'bottom',
        draggable: false,
        data: {label: ''}
    },
    style: {
        padding: '0px',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none'
    },
    [nodeTypes.start]: {
        width: 450,
        height: 160
    },
    [nodeTypes.email]: {
        width: 450,
        height: 200
    },
    [nodeTypes.split]: {
        width: 450,
        height: 200
    },
    [nodeTypes.delay]: {
        width: 300,
        height: 40
    },
    [nodeTypes.exit]: {
        width: 65,
        height: 40
    },
    [nodeTypes.action]: {
        width: 600,
        height: 120
    },
    [nodeTypes.dot]: {
        width: 10,
        height: 10
    }
};

const relationsConfig = {
    animated: false,
    className: diagramClass.diagramEdge
};

export {nodesConfig, relationsConfig, nodeTypes, edgeTypes, diagramClass, actions, nodesInitialSettings};