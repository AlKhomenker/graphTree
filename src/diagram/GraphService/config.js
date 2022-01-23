const nodeTypes = {
    start: 'cartAbandonment',
    email: 'email',
    delay: 'delay',
    sms: 'sms',
    split: 'split',
    test: 'test',
    exit: 'exit',
    action: 'action',
    close: 'close',
    plus: 'plus',
    dot: 'dot'
};


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
    sms: {
        state: '',
        name: 'new Sms',
        subject: '',
        previewText: '',
        fromName: '',
        fromEmail: '',
        skipNonOptedIn: false,
        previewUrl: '',
        strategy: 0,
        productsToDisplay: ''
    },
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
    split: {
        name: 'new Split',
        state: '',
        firstBranch: 'Yes',
        secondBranch: 'No',
        interval: {
            value: '',
            unit: ''
        }
    },
    test: {
        name: 'new Test',
        state: '',
        firstBranch: 'A',
        secondBranch: 'B',
        interval: {
            value: '',
            unit: ''
        }
    }
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
    [nodeTypes.sms]: {
        width: 450,
        height: 200
    },
    [nodeTypes.split]: {
        width: 450,
        height: 200
    },
    [nodeTypes.test]: {
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
        height: 200
    },
    [nodeTypes.dot]: {
        width: 30,
        height: 30
    },
    [nodeTypes.plus]: {
        width: 30,
        height: 30
    }
};



export {nodesConfig, nodeTypes, actions, nodesInitialSettings};