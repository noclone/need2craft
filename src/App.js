import ItemsList from "./components/ItemsList";
import Craft from "./components/Craft"

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="craftOverlay">
      <Craft />
      <ItemsList />
    </div>
    </DndProvider>
  );
}

export default App;