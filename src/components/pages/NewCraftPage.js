import ItemsList from "../ItemsList";
import Craft from "../Craft"

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function NewCraftPage(){
    return (
    <DndProvider backend={HTML5Backend}>
        <div className="craftOverlay">
          <Craft />
          <ItemsList />
        </div>
    </DndProvider>
    );
}

export default NewCraftPage;