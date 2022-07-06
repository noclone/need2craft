import ItemsList from "../ItemsList";
import SelectedItemsBar from "../SelectedItemsBar";
import Calculator from "../Calculator";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

function ResourcesPage(props) {

  const [ itemsList, setItemsList ] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="resourcesPage">
        <div>
          <SelectedItemsBar itemsListChanged={(list) => setItemsList(list)}/>
          <ItemsList loggedIn={props.loggedIn} />
        </div>
        <div>
          <Calculator list={itemsList}/>
        </div>
      </div>
    </DndProvider>
  );
}

export default ResourcesPage;
