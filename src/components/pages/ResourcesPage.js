import ItemsList from "../ItemsList";
import SelectedItemsBar from "../SelectedItemsBar"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function ResourcesPage(props){
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <SelectedItemsBar />
        <ItemsList loggedIn={props.loggedIn}/>
      </div>
    </DndProvider>
  )
}

export default ResourcesPage;