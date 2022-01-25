import "./App.css";
import useLogic from "./diagram/useLogic";
import structure from "./diagram/data/structure.json";
import CenteredTree from "./tree/CenteredTree";


const structureArr = structure[0];

function App() {
  const { elements } = useLogic(structureArr);
  return (
    <div className="App">
      {
        Object.keys(elements).length !== 0 && <CenteredTree elements={elements}/>
      }
    </div>
  );
}

export default App;
