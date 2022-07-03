import classes from "./CraftTable.module.css"
import slot from "./images/slot.png"
import { useDrop } from "react-dnd";
import { useState } from "react";

function Slot(props){

    const  [ isOver, drop ] = useDrop(() => ({
        accept: "image",
        drop: (item) => addItemToSlot(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const onChange = (id, item) => {
        props.onSlotChanged({id: id, item: item})
    }

    const addItemToSlot = (item) => {
        setSelectedItem(item.id)
        setIsFilled(true);
        onChange(props.id, item.name)
    }

    const [ isFilled, setIsFilled ] = useState(false);

    const [ selectedItem, setSelectedItem ] = useState(null)

    const handleClick = (e) => {
        setIsFilled(false)
        onChange(props.id, null)
      };

    return (
        <li ref={drop} className={classes.tableElem} onClick={handleClick}>
            <img className={classes.slot} src={slot} alt={props.id}></img>
            {isFilled && <img className={classes.slotItem} src={selectedItem} alt={props.id}></img>}
        </li>
    )
}

export default Slot;