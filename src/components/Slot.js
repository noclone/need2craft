import classes from "./CraftTable.module.css"
import slot from "./images/slot.png"
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";


import ReactTooltip from "react-tooltip"

function Slot(props){

    useEffect(() => {
        setIsFilled(false)
        props.clear[1](false)
    }, [props.clear[0]])


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
        setSelectedItem(item)
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
            
            {isFilled && 
            <div>
                <img data-tip data-for={selectedItem.id} className={classes.slotItem} src={selectedItem.id} alt={props.id}></img>
                <ReactTooltip id={selectedItem.id} place="top" effect="solid">
                {selectedItem.name}
            </ReactTooltip> 
            </div>
            }
            
        </li>
    )
}

export default Slot;