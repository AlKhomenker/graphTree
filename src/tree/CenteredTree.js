import Tree from "react-d3-tree";
import { EmailNode, SmsNode, DelayNode, SplitNode, TestNode, StartNode, DotNode, ExitNode, ActionNode, PlusNode} from "../diagram/GraphService/nodes";
import { useStyles } from "../diagram/style/use-styles";

const extraHeight = 150;

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

// const straightPathFunc = (linkDatum, orientation) => {
//   const { source, target } = linkDatum;
//   const customPath =`M${source.x},${source.y}L${target.x},${target.y}`
//   console.log(customPath);
//   return customPath
// };

export const CenteredTree = ({elements}) =>{
  const { innerWidth: widthWindow } = window;
  const nodeSize = {x: 350, y: 150}; //The amount of space each node element occupies.
  const classes = useStyles();

  return (
    <div className={classes.graph}>
      <Tree
        data={elements}
        translate={{ x: widthWindow/2, y: 100 }}
        //nodeSize={nodeSize}
        orientation="vertical"
        pathFunc="straight"
        //pathFunc={straightPathFunc}
        //pathClassFunc={() => classes.edge}
        //onLinkClick={() => { console.log('click')}}
        zoom="0.7"
        separation={{ nonSiblings: 5, siblings: 3 }}
        renderCustomNodeElement={(node) => RenderForeignObjectNode({ ...node})}
      />
    </div>
  )
}


