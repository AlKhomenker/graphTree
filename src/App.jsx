import "./App.css";
import useLogic from "./diagram/useLogic";
import { CenteredTree } from "./tree/CenteredTree";
import structure from "./diagram/data/structure.json";

const structureArr = structure[1];

function App() {
  const { elements } = useLogic(structureArr);
  return (
    <div className="App">
      {
        Object.keys(elements).length !== 0 && <CenteredTree elements={elements} />
      }
    </div>
  );
}

export default App;
