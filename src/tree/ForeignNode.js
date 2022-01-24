import { EmailNode, SmsNode, DelayNode, SplitNode, TestNode, StartNode, DotNode, ExitNode, ActionNode, PlusNode} from "../diagram/GraphService/nodes";

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

export const ForeignNode = (props) => {
   const{ nodeDatum, hierarchyPointNode} = props;
   const{id, type, width, height} = nodeDatum;
   const{ x, y} = hierarchyPointNode;
   const posX = - width/2;
   const posY = - height/2;

  return(
    <g>
      <foreignObject style={{width: width, height: height, x: posX, y: posY}}>
        {
          Object.entries(types).map(([key, Component]) => {
            if (type === key) {
                return <Component key={id} {...nodeDatum} coordinates={{x,y}}/>;
            }
            return null;
          })
        }
      </foreignObject>
    </g>
  )
}
