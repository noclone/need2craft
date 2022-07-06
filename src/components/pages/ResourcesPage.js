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
        </div>
        <div className="resourcesPageLists">
          <ItemsList loggedIn={props.loggedIn} />
          <Calculator loggedIn={props.loggedIn} list={itemsList}/>
        </div>
      </div>
    </DndProvider>
  );
}

export default ResourcesPage;
