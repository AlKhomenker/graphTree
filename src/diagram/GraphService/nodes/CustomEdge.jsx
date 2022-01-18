import {getBezierPath, getEdgeCenter, getMarkerEnd} from "react-flow-renderer";

import { useStyles } from "../../style/use-styles";
import { diagramClass } from "../config";

const foreignObjectSizeX = 200;
const foreignObjectSizeY= 20;

// const onEdgeClick = (id) => {
//   console.log("onEdgeClick: ", id);
// };


const CustomEdge = (props) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, arrowHeadType, markerEndId, data } = props;

  const classes = useStyles();
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  
  return (
    <>
      <path
        id={id}
        className={diagramClass.reactFlowEdgePath}
        d={edgePath}
        markerEnd={markerEnd}
      />

      <foreignObject
        width={foreignObjectSizeX}
        height={foreignObjectSizeY}
        x={edgeCenterX - foreignObjectSizeX / 2}
        y={edgeCenterY - foreignObjectSizeY / 2}
      >
          <button
            className={classes.edge}
            onClick={data ? (event) => data.onEdgeClick({event, id}): console.log(id)}
          >
            <div style={{ color: "black" }}>
              {props.source} - {props.target}
            </div>
          </button>
      </foreignObject>
    </>
  );
};

export default CustomEdge;
