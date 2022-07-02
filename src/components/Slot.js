import classes from "./CraftTable.module.css"
import slot from "./images/slot.png"
import { useDrop } from "react-dnd";
import { useState } from "react";

function Slot(props){

    const  [ {}, drop ] = useDrop(() => ({
        accept: "image",
        drop: (item) => addItemToSlot(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addItemToSlot = (item) => {
        setSelectedItem(item.id)
        setIsFilled(true);
    }

    const [ isFilled, setIsFilled ] = useState(false);

    const [ selectedItem, setSelectedItem ] = useState(null)

    return (
        <li ref={drop} className={classes.tableElem}>
            <img className={classes.slot} src={slot} alt={props.id}></img>
            {isFilled && <img className={classes.slotItem} src={selectedItem} alt={props.id}></img>}
        </li>
    )
}

export default Slot;