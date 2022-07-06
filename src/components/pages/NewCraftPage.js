import ItemsList from "../ItemsList";
import NewItem from "../NewItem";
import Craft from "../Craft";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function NewCraftPage(props) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="craftOverlay">
        <div>
          <Craft loggedIn={props.loggedIn} />
          <ItemsList loggedIn={props.loggedIn} />
        </div>
        <div>
          <NewItem loggedIn={props.loggedIn} />
        </div>
      </div>
    </DndProvider>
  );
}

export default NewCraftPage;
