import ItemsList from "../ItemsList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function ResourcesPage(props){
  return (
    <DndProvider backend={HTML5Backend}>
      <ItemsList loggedIn={props.loggedIn}/>
    </DndProvider>
  )
}

export default ResourcesPage;