import React from "react";

import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";

import { useStyles } from "../../style/use-styles";
const foreignObjectSize = 25;

const onEdgeClick = (id) => {
  console.log("onEdgeClick: ", id);
};

const ExitEdge = (props) => {
  const  {id, data, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, arrowHeadType, markerEndId} = props;

  const classes = useStyles();
  const edgePath = getBezierPath({sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition});
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({sourceX, sourceY, targetX, targetY});

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        style={{backgroundColor: 'red'}}
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
      >
        <button
          className={classes.edgeExit}
          onClick={(event) => data.onEdgeClick({event, id})}
        >
          {" "} + {" "}
        </button>
      </foreignObject>
    </>
  );
};

export default ExitEdge;
