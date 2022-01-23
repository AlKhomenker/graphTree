import { useEffect, useState } from 'react'
import GraphService from './GraphService';
import { nodeTypes } from './GraphService/config'

let newArr = [];

const useLogic = (data) => {
    const [nodes, setNodes] = useState([]);
    const [elements, setElements] = useState({});
    newArr = [...nodes];


    const nodeEvent = (data) => {
        const{id, type} = data;
        let newNodes, nodesWithEvents, dataTree;

        switch(type) {
            case nodeTypes.dot:
                newNodes = GraphService.addNewNode(nodeTypes.action, data, newArr);
                nodesWithEvents = GraphService.addEventsToNodes(newNodes, nodeEvent, actionNodeEvent);
                dataTree = GraphService.createTreeData(nodesWithEvents)[0];
                setNodes(newNodes);
                setElements(dataTree);
              break;
            case nodeTypes.plus:
                //add changes by a new logic
                newNodes = GraphService.addNewNode(nodeTypes.action, data, newArr);
                nodesWithEvents = GraphService.addEventsToNodes(newNodes, nodeEvent, actionNodeEvent);
                dataTree = GraphService.createTreeData(nodesWithEvents)[0];
                setNodes(newNodes);
                setElements(dataTree);
              break;
            case nodeTypes.exit:
                console.log('exit event:', id);
              break;
            default:
                console.log(type, id);  
          }
    }


     const actionNodeEvent = (data) => {
        const{id, type} = data;

        let newNodes;
        if(type === nodeTypes.close){
            newNodes = GraphService.removeNode(id, newArr);
        }else{
            newNodes = GraphService.addNewNode(type, data, newArr);
        }
        const nodesWithEvents = GraphService.addEventsToNodes(newNodes, nodeEvent, actionNodeEvent);
        const dataTree = GraphService.createTreeData(nodesWithEvents)[0];
        setNodes(newNodes);
        setElements(dataTree);
    }

    

    useEffect(() => {
        const newNodes = GraphService.prepareInitialData(data);
        const nodesWithEvents = GraphService.addEventsToNodes(newNodes, nodeEvent);
        const dataTree = GraphService.createTreeData(nodesWithEvents)[0];
        setNodes(newNodes);
        setElements(dataTree);
// eslint-disable-next-line  
    }, []);


    
    return { elements }
}

export default useLogic
