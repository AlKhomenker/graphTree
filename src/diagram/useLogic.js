import { useEffect, useState } from 'react'
import GraphService from './GraphService';
import { nodeTypes } from './GraphService/config';



let newArr = [];

const useLogic = (data) => {
    const [nodes, setNodes] = useState([]);
    const [elements, setElements] = useState({});
    newArr = [...nodes];


    const nodeEvent = (data) => {
        console.log('nodeEvent: ', data); 
    }


     const actionNodeEvent = (data) => {
        let newNodes;

        if(data.type === nodeTypes.close){
            newNodes = GraphService.removeNode(data.id, newArr);
        }else{
            newNodes = GraphService.addNewNode(data.type, data, newArr, nodeEvent);
            newNodes = GraphService.calculatePositions([...newNodes]);
        }
        setNodes(newNodes);
    }


    useEffect(() => {
        const newNodes = GraphService.prepareInitialData(data);
        const nodesWithEvents = GraphService.addEventsToNodes(newNodes, nodeEvent);
        const dataConvertions = GraphService.createNewDataFormat(nodesWithEvents);
        setElements(dataConvertions);
    }, []);


    
    return { elements }
}

export default useLogic
