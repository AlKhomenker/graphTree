import dagre from 'dagre';
import { isNode } from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';
import { edgeTypes, nodesConfig, nodeTypes, relationsConfig, nodesInitialSettings } from './config';
import { StartNode, DelayNode, EmailNode, ExitNode, ActionNode, SplitNode } from './nodes';
import CustomEdge from './nodes/CustomEdge';
import ExitEdge from './nodes/ExitEdge';

const extraHeight = 50;

class GraphService {
    direction = 'TB';

    edges = {
        buttonedge: CustomEdge,
        exitEdge: ExitEdge,
    };

    nodes = {
        email: EmailNode,
        cartAbandonment: StartNode,
        delay: DelayNode,
        split: SplitNode,
        exit: ExitNode,
        action: ActionNode
    };
    

    createNodes = (nodes) => nodes.map((node) => {
        const { type, settings } = node;
        const { width, height } = nodesConfig[type];
        return {
            ...node,
            width,
            height,
            style: {...nodesConfig.style, width: width} ,
            ...nodesConfig.shared,
            data: { settings, width, height }
        };
    });


    createExitNode = (title) => ({
        id: uuidv4(),
        width: nodesConfig[nodeTypes.exit].width,
        height: nodesConfig[nodeTypes.exit].height,
        type: nodeTypes.exit,
        style: nodesConfig.style,
        ...nodesConfig.shared,
        data: {title: title}
    });


    createActionNode = () => ({
        id: uuidv4(),
        width: nodesConfig[nodeTypes.action].width,
        height: nodesConfig[nodeTypes.action].height,
        type: nodeTypes.action,
        style: nodesConfig.style,
        ...nodesConfig.shared,
    });


    addDefaultNode = (data, nodes, nodeEvent) => {
        const node = nodes.find(node => node.id === data.id);
        const index = nodes.findIndex(node => node.id === data.id);
        const newNode = {
            ...node,
            type: data.type,
            width: nodesConfig[data.type].width,
            height: nodesConfig[data.type].height,
            style: {...nodesConfig.style, width: nodesConfig[data.type].width}, 
            ...nodesConfig.shared,
            data: {settings: nodesInitialSettings[data.type], onClick: (data) => nodeEvent(data)}
        }
    
        const sourceArea = nodes.find(node => node.source === data.id);
        const targetArea = nodes.find(node => node.target === data.id);
        sourceArea.type = edgeTypes.buttonedge;
        targetArea.type = edgeTypes.buttonedge;

        nodes.splice(index, 1);
        return [...nodes, newNode]; 
    }


    addNewNode = (type, data, nodes, nodeEvent) => {
        if(type === nodeTypes.action){
            return this.addActionNode(data, nodes);
            }else{
                if(type === nodeTypes.split){
                    return this.addNodeWithTwoRelations(data, nodes, nodeEvent);
                }else{
                    return this.addDefaultNode(data, nodes, nodeEvent);
            }
        }      
    };


    addActionNode = (data, nodes) => {
        const area = nodes.find(node => node.id === data.id);
        const target = area.target;
        const parent = nodes.find(node => node.id === area.source);

        const newNode = this.createActionNode();
        const newRel = {...area, id: uuidv4(), type: edgeTypes.default, source: newNode.id, target: target};

        const xPos = newNode.width;
        const baseWidth = (window.innerWidth/2) * 1.15;

        newNode.position = {x: baseWidth - xPos/2, y: parent.position.y + newNode.height};

        area.target = newNode.id;
        area.type = edgeTypes.default;

        return [...nodes, newNode, newRel];
    }


    removeNode = (id, nodes) => {
        const indexNode = nodes.findIndex(node => node.id === id);
        const indexArea = nodes.findIndex(node => node.source === id);
        
        const sourceArea = nodes.find(node => node.source === id);
        const targetArea = nodes.find(node => node.target === id);
        targetArea.target = sourceArea.target;
        targetArea.type = edgeTypes.buttonedge;

        nodes.splice(indexArea, 1);
        nodes.splice(indexNode, 1);

        return [...nodes];
    };


    getLastNode = (relations, nodes) => {
        let nodeIds = [];
        for (const node of nodes) {
            nodeIds.push(node.id);
        }

        for (const { parent } of relations) {
            nodeIds = nodeIds.filter(id => id !== parent.id);
        }
        const lastNode = nodes.find(node => node.id === nodeIds[0]);
        return lastNode;
    };


    elem = (value) => {
        const node = value; 
        return {node}
    }


    createLinkedList(array){
        let node, temp;
        for(let i = array.length-1; i >= 0; i--){
            if(!node){
                node = this.elem(array[i]);
            }else {
                temp = this.elem(array[i]);
                temp.next = node;
                node = temp;
            }
        }
        return node;
    }


    createNewDataFormat(array){
        let currentNode, parentNode = {};
        for(let i = array.length-1; i >= 0; i--){
            currentNode = array[i];
            parentNode = array[i-1];
            if(parentNode){
                parentNode.children = [currentNode];
            }
        }
        const node = this.createLinkedList(array);
        return node;
    }


    newArrRelations = [];
    parent = 0;
    childrenNodes = [];
    sortData(nodes, relations, currentNode){
        relations.forEach((rel, i) => {
            if(currentNode.id === rel.parent.id){
                if(this.parent === rel.parent.id){
                    const children = relations.filter(node => node.parent.id === this.parent);
                    
                    children.map((item) => {
                        const childNode = nodes.find(node => node.id === item.child.id);
                        console.log(childNode);
                        this.childrenNodes = [...this.childrenNodes, childNode];
                        return this.childrenNodes
                    });
                    this.newArrRelations.splice(i, 1, this.childrenNodes);
                }else{
                    const childNode = nodes.find(node => node.id === rel.child.id);
                    this.newArrRelations = [...this.newArrRelations, childNode];
                    // relations.splice(i, 1);
                    this.sortData(nodes, relations, childNode);
                    this.parent = rel.parent.id;
                }
                
            //     //tuta
            //     const childNode = nodes.find(node => node.id === rel.child.id);
            //     this.newArrRelations = [...this.newArrRelations, childNode];
            //    // relations.splice(i, 1);
            //     this.sortData(nodes, relations, childNode);
            }
        });
        return this.newArrRelations;
    };


    prepareInitialData(data){
        if (!data) {
            //create journey
            return;
        }
        const dot = {
            id: uuidv4(),
            type: 'dot',
            width: 10,
            height: 10,
            children: []
        }

        const startNode = data.triggers[0];     
        const firstNode = data.nodes.filter(node => !data.relations.some(item => node.id === item.child.id))[0];
        const exitNode = this.createExitNode('Exit');
        const aa = this.sortData(data.nodes, data.relations, firstNode)
        console.log(aa);
        const sortNodes = [startNode, firstNode, ...aa];

        const allNodes =  sortNodes.reduce((arr, allNodes) => [...arr, allNodes, dot], []);
        allNodes.splice(allNodes.length-1, 1);

        const nodes = this.createNodes(allNodes);
        return [...nodes, exitNode];
    };


    addEventsToNodes = (nodes, nodeEvent, actionNodeEvent) => {
        return nodes.map(node => {
             if(node.type === nodeTypes.action){
                return {
                    ...node,
                    data: {
                        ...node.data,
                        onActionNodeClick: (data) => actionNodeEvent(data)
                    }
                }
            }else{
                return {
                ...node,
                data: {
                    ...node.data,
                    onNodeClick: (data) => nodeEvent(data)
                    }
                }
            }   
        })
    }
}

export default new GraphService()