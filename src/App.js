import ItemsList from "./components/ItemsList";
import CraftTable from "./components/CraftTable";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="craftOverlay">
      <CraftTable />
      <ItemsList />
    </div>
    </DndProvider>
  );
}

export default App;