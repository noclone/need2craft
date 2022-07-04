import { useState } from "react";

import classes from "./ItemsList.module.css"

import { useDrag } from "react-dnd";

import ReactTooltip from "react-tooltip"

function Item(props)
{
    const [ isDragging, drag ] = useDrag(() => ({
        type: "image",
        item: {id: props.img, name:props.name},
        collect: (monitor) => ({
             isDragging: !!monitor.isDragging(),
        })
    }))
    const [isSelected, setIsSelected] = useState(false)
    return (
        <li className={isSelected ? classes.ItemSelected : classes.Item} onClick={() => setIsSelected(!isSelected)}>
            <img data-tip data-for={props.name} ref={drag} src={props.img} alt={props.name} style={{width:50, height:50}}></img>
            <ReactTooltip id={props.name} place="top" effect="solid">
                {props.name}
            </ReactTooltip> 
        </li>
    );
}

export default Item;