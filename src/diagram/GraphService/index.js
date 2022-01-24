import { v4 as uuidv4 } from 'uuid';
import { nodesConfig, nodeTypes, nodesInitialSettings } from './config';
import { StartNode, DelayNode, EmailNode, ExitNode, ActionNode, SplitNode } from './nodes';

class GraphService {
    direction = 'TB';

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
       const newNode = {
            ...node,
            width,
            height,
            style: {...nodesConfig.style, width: width} ,
            ...nodesConfig.shared,
            data: { settings, width, height }
        };
        delete newNode.settings; 
        return newNode
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



    createDotNode = (type) => ({
        id: uuidv4(),
        width: nodesConfig[type].width,
        height: nodesConfig[type].height,
        type: type,
        style: nodesConfig.style,
        ...nodesConfig.shared,
    });



    createActionNode = () => ({
        id: uuidv4(),
        width: nodesConfig[nodeTypes.action].width,
        height: nodesConfig[nodeTypes.action].height,
        type: nodeTypes.action,
        style: nodesConfig.style,
        ...nodesConfig.shared,
    });



    addDefaultNode = (data, nodes) => {
        const{id, type} = data;
        const currentNode = nodes.find(node => node.id === id);
        const parent = nodes.find(node => node.id === currentNode.parent_id);
        const child = nodes.find(node => node.parent_id === currentNode.id);
        const firstDotNode = this.createDotNode(nodeTypes.dot);
        const lastDotNode = this.createDotNode(nodeTypes.dot);

        const newNode = {
            id: id,
            type: type,
            width: nodesConfig[type].width,
            height: nodesConfig[type].height,
            style: {...nodesConfig.style, width: nodesConfig[type].width}, 
            ...nodesConfig.shared,
            data: {settings: nodesInitialSettings[type]}
        }

        firstDotNode.parent_id = parent.id;
        newNode.parent_id = firstDotNode.id;

        const currentIndex = nodes.findIndex(node => node.id === currentNode.id);

        if(child.type === nodeTypes.exit){
            const plusNode = this.createDotNode(nodeTypes.plus);
            plusNode.parent_id = newNode.id;
            child.parent_id = plusNode.id;
            nodes.splice(currentIndex, 1, firstDotNode, newNode, plusNode );
        }else{
            lastDotNode.parent_id = newNode.id;
            child.parent_id = lastDotNode.id;
            nodes.splice(currentIndex, 1, firstDotNode, newNode, lastDotNode );
        }
    
        
        return [...nodes]; 
    }



    addNodeWithTwoRelations = (data, nodes) => {
        const{id, type} = data;
        const currentNode = nodes.find(node => node.id === id);
        const parent = nodes.find(node => node.id === currentNode.parent_id);
        const child = nodes.find(node => node.parent_id === currentNode.id);
        const firstDotNode = this.createDotNode(nodeTypes.dot);
        const firstBranchNode = this.createExitNode(nodesInitialSettings[type].firstBranch);
        const secondBranchNode = this.createExitNode(nodesInitialSettings[type].secondBranch);
        const plusNode = this.createDotNode(nodeTypes.plus);
        const exitNode = this.createExitNode(nodeTypes.exit);
        
        const newNode = {
            id: id,
            type: type,
            width: nodesConfig[type].width,
            height: nodesConfig[type].height,
            style: {...nodesConfig.style, width: nodesConfig[type].width}, 
            ...nodesConfig.shared,
            data: {settings: nodesInitialSettings[type]}
        }
    
        const currentIndex = nodes.findIndex(node => node.id === currentNode.id);

        firstDotNode.parent_id = parent.id;
        newNode.parent_id = firstDotNode.id;
        firstBranchNode.parent_id = newNode.id;
        
        secondBranchNode.parent_id = newNode.id;
        plusNode.parent_id = secondBranchNode.id;
        exitNode.parent_id = plusNode.id

        if(child.type === nodeTypes.exit){
            const secondPlusNode = this.createDotNode(nodeTypes.plus);
            secondPlusNode.parent_id = firstBranchNode.id;
            child.parent_id = secondPlusNode.id;

            nodes.splice(currentIndex, 1, firstDotNode, newNode, firstBranchNode, secondBranchNode, plusNode, secondPlusNode, exitNode );
        }else{
            const addDotNode = this.createDotNode(nodeTypes.dot);
            addDotNode.parent_id = firstBranchNode.id;
            child.parent_id = addDotNode.id;
            nodes.splice(currentIndex, 1, firstDotNode, addDotNode, newNode, firstBranchNode, secondBranchNode, plusNode, exitNode );
        }

        return [...nodes]; 
    }



    addNewNode = (type, data, nodes) => {
        if(type === nodeTypes.action){
            return this.addActionNode(data.id, nodes);
        }else{
            if( type === nodeTypes.split || type === nodeTypes.test  ){
                return this.addNodeWithTwoRelations(data, nodes);
            }else{
               return this.addDefaultNode(data, nodes);
            }
        }      
    };



    addActionNode = (id, nodes) => {   
        const currentNode = nodes.find(node => node.id === id);
        const parent = nodes.find(node => node.id === currentNode.parent_id);

        const newNode = this.createActionNode();
        newNode.parent_id = parent.id;
        newNode.style = {...newNode.style, zIndex: 10000};

        const childIndex = nodes.findIndex(node => node.parent_id === currentNode.id);
        nodes[childIndex].parent_id = newNode.id;
    
        const currentIndex = nodes.findIndex(node => node.id === currentNode.id);
        nodes.splice(currentIndex, 1, newNode);

        return [...nodes];
    }



    removeNode = (id, nodes) => { // change if need to remove node with all branch
        const currentNode = nodes.find(node => node.id === id);
        const indexNode = nodes.findIndex(node => node.id === id);
        const parent = nodes.find(node => node.id === currentNode.parent_id);
        const child = nodes.find(node => node.parent_id === currentNode.id);
        const dotNode = this.createDotNode(nodeTypes.dot);
        
        if(child.type === nodeTypes.exit){
            const plusNode = this.createDotNode(nodeTypes.plus);
            plusNode.parent_id = parent.id;
            child.parent_id = plusNode.id;
            nodes.splice(indexNode, 1, plusNode);
        }else{
            dotNode.parent_id = parent.id;
            child.parent_id = dotNode.id;
            nodes.splice(indexNode, 1, dotNode);
        }
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



    createObjRelation = (parentNodeId, childNodeId) => {
       return{
           parent: {
            id: parentNodeId,
            version: 1
        },
        child: {
            id: childNodeId,
            version: 1
        },
        type: 'next'
       } 
    }



    newNodRel = [];
    newRel;
    createRelation = (nodes, relations) => {   
        nodes.forEach((node, i) => {
            this.newRel = this.createObjRelation(node.id,(nodes[i+1])?(nodes[i+1].id):null);
            this.newNodRel.push(this.newRel);   
        });
        return this.newNodRel;  
     }



    newData = [];
    parentId = [];
    childId = [];
    newNode = {};
    newDot = {};
    createNewData = (relations, nodes) => {
        relations.map(rel => {
            this.childId.push(rel.child.id);
            this.parentId.push(rel.parent.id);

            if(rel.parent.id === null){
                this.newNode = {
                    id: rel.child.id, 
                    parent_id: rel.parent.id, 
                    ...nodes[rel.child.id] 
                }
                this.newData = [...this.newData, this.newNode];
            }else{
                this.newDot = this.createDotNode(nodeTypes.dot);
                this.newDot.parent_id = rel.parent.id;
                this.newNode = {
                    id: rel.child.id, 
                    parent_id: this.newDot.id, 
                    ...nodes[rel.child.id] 
                }
                this.newData = [...this.newData, this.newDot, this.newNode];
            }

            return this.newData
        })

        const lastsNodeIds = this.childId.filter(id => !this.parentId.includes(id));
        let lastsNode = [];

        lastsNodeIds.forEach(id => {
            const currentNode = this.newData.find(node => node.id === id);

            const plusNode = this.createDotNode(nodeTypes.plus);
            const exitNode = this.createExitNode(nodeTypes.exit);

            plusNode.parent_id = currentNode.id;
            exitNode.parent_id = plusNode.id;
            lastsNode = [...lastsNode, plusNode, exitNode]
        })

        return [...this.newData, ...lastsNode]
    }



    createTreeData = (items, id = null, link = 'parent_id') => {
        return items.filter(item => item[link] === id).map(item => ({ ...item, children: this.createTreeData(items, item.id) }));
    }



    prepareInitialData(data){
    if (!data) {
            //create journey
            return;
        }
        
        const startNode = data.triggers[0];     
        const firstNode = data.nodes.filter(node => !data.relations.some(item => node.id === item.child.id))[0];
        const relations = data.relations;

        const dataNodes = this.createNodes([...data.nodes, startNode]);
        const nodes = dataNodes.reduce((prev, current) => ({ ...prev, [current.id]: current }),{});

        const startRelation = this.createObjRelation(null, startNode.id);
        const firstRelation = this.createObjRelation(startNode.id, firstNode.id);
        
        const allRelations = [...relations, startRelation, firstRelation];   
        const newData = this.createNewData(allRelations, nodes);
  
        return newData;
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