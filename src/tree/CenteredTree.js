import Tree from "react-d3-tree";
import { useStyles } from "../diagram/style/use-styles";
import ForeignNode from "./ForeignNode";



// const straightPathFunc = (linkDatum, orientation) => {
//   const { source, target } = linkDatum;
//   const customPath =`M${source.x},${source.y}L${target.x},${target.y}`
//   console.log(customPath);
//   return customPath
// };


function CenteredTree({elements}) {
  const { innerWidth: widthWindow } = window;
  const nodeSize = {x: 150, y: 150}; //The amount of space each node element occupies.
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
        renderCustomNodeElement={(node) => ForeignNode({ ...node})}
      />
    </div>
  )
}

export default CenteredTree;