
import Tree from "react-d3-tree";
import { EmailNode, DelayNode, SplitNode, StartNode, DotNode, ExitNode} from "../diagram/GraphService/nodes";
import { useCenteredTree } from "./helpers";

const types = {
    cartAbandonment: StartNode,
    delay: DelayNode,
    email: EmailNode,
    split: SplitNode,
    dot: DotNode,
    exit: ExitNode
};

const RenderForeignObjectNode = (props) => {
   const{ nodeDatum} = props;
   const{id, type, width, height} = nodeDatum;
   const posX = - width/2;

  return(
     <>
      <foreignObject style={{width: width, height: height, x: posX}}>
      {
        Object.entries(types).map(([key, Component]) => {

          if (type === key) {
              return <Component key={id} {...nodeDatum}/>;
          }
          return null;
        })
      }
      </foreignObject>
    </> 
  )
}


export const CenteredTree = ({elements}) =>{
  const{node} = elements;
  const [translate, containerRef] = useCenteredTree();
  let disProp = {x: 450, y: 200};

  return (
    <div style={{width: "100vw",height: "100vh",background: "#eee"}} ref={containerRef}>
      <Tree
        data={node}
        translate={translate}
        nodeSize={disProp}
        orientation="vertical"
        pathFunc="step"
        zoom="0.6"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={(node) =>
          RenderForeignObjectNode({ ...node})
        }
      />
    </div>
  );
  }


