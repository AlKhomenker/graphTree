import "./App.css";
import useLogic from "./diagram/useLogic";
import { CenteredTree } from "./tree/CenteredTree";

import dataTree from "./tree/data/data.json";
import structure from "./diagram/data/structure.json";

const data = dataTree[0];
const structureArr = structure[1];

function App() {
  const { elements } = useLogic(structureArr);
  return (
    <div className="App">
      {
        Object.keys(elements).length !== 0 && <CenteredTree elements={elements} />
      }
    {/* <CenteredTree elements={data} /> */}
    </div>
  );
}

export default App;
