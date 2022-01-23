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


    

    // elem = (value) => {
    //     const node = value; 
    //     return {node}
    // }


    // createLinkedList(array){
    //     let node, temp;
    //     for(let i = array.length-1; i >= 0; i--){
    //         if(!node){
    //             node = this.elem(array[i]);
    //         }else {
    //             temp = this.elem(array[i]);
    //             temp.next = node;
    //             node = temp;
    //         }
    //     }
    //     return node;
    // }


    // createNewDataFormat(array){
    //     let currentNode, parentNode = {};
    //     for(let i = array.length-1; i >= 0; i--){
    //         currentNode = array[i];
    //         parentNode = array[i-1];
    //         if(parentNode){
    //             parentNode.children = [currentNode];
    //         }
    //     }
    //     const node = this.createLinkedList(array);
    //     return node;
    // }

    // newArrRelations = [];
    // parent = 0;
    // childrenNodes = [];
    // sortData(nodes, relations, currentNode){
    //     relations.forEach((rel, i) => {
    //         if(currentNode.id === rel.parent.id){
    //             const childNode = nodes.find(node => node.id === rel.child.id);
    //             this.newArrRelations = [...this.newArrRelations, childNode];
    //            // relations.splice(i, 1);
    //             this.sortData(nodes, relations, childNode);
    //         }
    //     });
    //     return this.newArrRelations;
    // };

    // newArrRelations = [];
    // parent = '0';
    // childrenNodes = [];
    
    // sortData(nodes, relations, currentNode){
    //     relations.forEach((rel) => {
    //         if(currentNode.id === rel.parent.id){
    //             if(this.parent === rel.parent.id){
    //                 console.log(this.parent);
    //                 const children = relations.filter(node => node.parent.id === this.parent);
    //                 const parentIndex = nodes.findIndex(node => node.id === this.parent);

    //                 children.map((item) => {
    //                     const childNode = nodes.find(node => node.id === item.child.id);
    //                     this.childrenNodes = [...this.childrenNodes, childNode];
    //                     this.parent = item.child.id;
    //                     console.log(this.parent);
    //                     return this.childrenNodes
    //                 });
    //                 this.parent = rel.parent.id;
    //                 this.newArrRelations.splice(parentIndex, 1, this.childrenNodes);
    //             }else{
    //                 console.log(this.parent);
    //                 const childNode = nodes.find(node => node.id === rel.child.id);
    //                 this.newArrRelations = [...this.newArrRelations, childNode];
    //                 this.parent = rel.parent.id;
    //                 this.sortData(nodes, relations, childNode);
    //             }
    //         }
    //     });
    //     return this.newArrRelations;
    // };


    // prepareInitialData(data){
    //     if (!data) {
    //         //create journey
    //         return;
    //     }
    //     const dot = {
    //         id: uuidv4(),
    //         type: 'dot',
    //         width: 10,
    //         height: 10,
    //         children: []
    //     }

    //     const startNode = data.triggers[0];     
    //     const firstNode = data.nodes.filter(node => !data.relations.some(item => node.id === item.child.id))[0];
    //     const exitNode = this.createExitNode('Exit');
    //     const sortData = this.sortData(data.nodes, data.relations, firstNode)
        
    //     const sortNodes = [startNode, firstNode, ...sortData];


    //     const allNodes =  sortNodes.reduce((arr, allNodes) => [...arr, allNodes, dot], []);
    //     allNodes.splice(allNodes.length-1, 1);

    //     const nodes = this.createNodes(allNodes);
    //     return [...nodes, exitNode];
    // };


    createTreeData = (items, id = null, link = 'parent_id') => {
        //console.log(items);
        return items.filter(item => item[link] === id).map(item => ({ ...item, children: this.createTreeData(items, item.id) }));
    }


    prepareInitialData(data){
    if (!data) {
            //create journey
            return;
        }
        
        // const startNode = data.triggers[0];     
        // const firstNode = data.nodes.filter(node => !data.relations.some(item => node.id === item.child.id))[0];
        // const exitNode = this.createExitNode('Exit');
        // const relations = data.relations;

        // const allNodes =  data.nodes.reduce((arr, allNodes) => [...arr, allNodes, this.createDotNode()], []);
        // allNodes.splice(allNodes.length-1, 1);

        // const dataNodes = this.createNodes([...allNodes, startNode]);
        // const nodes = dataNodes.reduce((prev, current) => ({ ...prev, [current.id]: current }),{});
        
        // const startRelation = this.createObjRelation(null, startNode.id);
        // const firstRelation = this.createObjRelation(startNode.id, firstNode.id);
        
        // const allRelations = [...relations, startRelation, firstRelation];
        
        // const newData = allRelations.map(rel => {
        //     return { id: rel.child.id, parent_id: rel.parent.id, ...nodes[rel.child.id] }
        // })
    
        // return newData;

        const startNode = data.triggers[0];     
    //  const firstNode = data.nodes.filter(node => !data.relations.some(item => node.id === item.child.id))[0];
        const exitNode = this.createExitNode(nodeTypes.exit);
        const plusNode = this.createDotNode(nodeTypes.plus);
        const relations = data.relations;

        const allNodes =  [startNode,...data.nodes, ].reduce((arr, allNodes) => [...arr, allNodes, this.createDotNode(nodeTypes.dot)], []);
        allNodes.splice(allNodes.length-1, 1);

        const dataNodes = this.createNodes(allNodes);
    //  const nodes = dataNodes.reduce((prev, current) => ({ ...prev, [current.id]: current }),{});
        const startRelation = this.createObjRelation(null, startNode.id);
    //  const firstRelation = this.createObjRelation(startNode.id, firstNode.id);
        const relationsWithDotNode = this.createRelation(dataNodes, relations);
        const allRelations = [ startRelation, ...relationsWithDotNode];

        const newData = allRelations.map(rel => {
            const currentNode = dataNodes.find(node => node.id === rel.child.id);
            return { id: rel.child.id, parent_id: rel.parent.id || null, ...currentNode }
        })
        
        const lastNode = newData.find(node => node.id === null);
        plusNode.parent_id = lastNode.parent_id;
        exitNode.parent_id = plusNode.id;

        newData.splice(newData.findIndex(node => node.id === null), 1, plusNode, exitNode);
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