import Tree from "react-d3-tree";
import { EmailNode, SmsNode, DelayNode, SplitNode, TestNode, StartNode, DotNode, ExitNode, ActionNode, PlusNode} from "../diagram/GraphService/nodes";

const extraWidth = 500;

const types = {
    cartAbandonment: StartNode,
    delay: DelayNode,
    email: EmailNode,
    sms: SmsNode,
    split: SplitNode,
    test: TestNode,
    action: ActionNode,
    dot: DotNode,
    plus: PlusNode,
    exit: ExitNode
};

const RenderForeignObjectNode = (props) => {
   const{ nodeDatum} = props;
   const{id, type, width, height} = nodeDatum;
   const posX = - width/2;
   const posY = - height/2;

  return(
    <g>
        <foreignObject style={{width: width, height: height, x: posX, y: posY}}>
          {
            Object.entries(types).map(([key, Component]) => {

              if (type === key) {
                  return <Component key={id} {...nodeDatum}/>;
              }
              return null;
            })
          }
      </foreignObject>
    </g>
  )
}


export const CenteredTree = ({elements}) =>{
  const { innerWidth: widthWindow } = window;
  //const nodeSize = {x: 150, y: 200};
  return (
    <div style={{width: "100%", height: "100%", background: "#eee", margin: '0 auto'}}>
      <Tree
        data={elements}
        translate={{ x: widthWindow/2, y: 100 }}
        //nodeSize={nodeSize}
        orientation="vertical"
        pathFunc="straight"//step
        zoom="0.7"
        separation={{ nonSiblings: 4, siblings: 3 }}
        renderCustomNodeElement={(node) => RenderForeignObjectNode({ ...node})}
      />
    </div>
  )
}


