import CraftTable from "./CraftTable";
import arrow from "./images/arrow.png";
import Slot from "./Slot"

import classes from "./CraftTable.module.css"
import { useState } from "react";

function Craft()
{
    const [ result, setResult ] = useState(null)
    const [ table, setTable ] = useState(new Array(9).fill(null))

    const onSlotChanged = (slotData) => {
        setResult(slotData.item)
    }

    const onTableChanged = (slotData) => {
        table[slotData.id] = slotData.item
        setTable(table)
    }

    const addCraft = () => {
        fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data)
      });
    }

    return(
    <ol className={classes.craftPath}>
        <li><CraftTable onTableChanged={onTableChanged} /></li>
        <li><img className={classes.arrow} src={arrow}></img></li>
        <Slot onSlotChanged={onSlotChanged} id="10"/>
        <li><button onClick={addCraft} className={classes.addCraftButton}>Add Craft</button></li>
    </ol>)
}

export default Craft;