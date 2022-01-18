import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";

import { Box } from "@material-ui/core";
import structure from "./data/structure.json";
import GraphService from "./GraphService";
import useLogic from "./useLogic";


const Diagram = () => {
  const data = structure[0]; // from view model
  const { nodes } = useLogic(data);

  return (
    <Box style={{display: 'flex', width: '100%', height:'100%',  justifyContent:'center'}}>
        <ReactFlowProvider>
          <ReactFlow
            defaultZoom={0.85}
            style={{height: 'calc(100vh - 120px)'}}
            elements={nodes}
            edgeTypesId
            edgeTypes={GraphService.edges}
            nodeTypes={GraphService.nodes}
          />
        </ReactFlowProvider>
    </Box>
  );
};

export default Diagram;
