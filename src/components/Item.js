import { useState } from "react";

import classes from "./ItemsList.module.css"

import { useDrag } from "react-dnd";

function Item(props)
{
    const [ {}, drag ] = useDrag(() => ({
        type: "image",
        item: {id: props.img},
        collect: (monitor) => ({
             isDragging: !!monitor.isDragging(),
        })
    }))
    const [isSelected, setIsSelected] = useState(false)
    return (
        <li className={isSelected ? classes.ItemSelected : classes.Item} onClick={() => setIsSelected(!isSelected)}>
            <img ref={drag} src={props.img} alt={props.name} style={{width:50, height:50}}></img>
        </li>
    );
}

export default Item;