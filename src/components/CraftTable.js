import { useState } from "react"
import classes from "./CraftTable.module.css"

import Slot from "./Slot"

function CraftTable(props)
{
    const onSlotChanged = (slotData) => {
        props.onTableChanged(slotData)
    }
    
    return (
        <ol className={classes.container}>
            <Slot onSlotChanged={onSlotChanged} id="0"/>
            <Slot onSlotChanged={onSlotChanged} id="1"/>
            <Slot onSlotChanged={onSlotChanged} id="2"/>
            <Slot onSlotChanged={onSlotChanged} id="3"/>
            <Slot onSlotChanged={onSlotChanged} id="4"/>
            <Slot onSlotChanged={onSlotChanged} id="5"/>
            <Slot onSlotChanged={onSlotChanged} id="6"/>
            <Slot onSlotChanged={onSlotChanged} id="7"/>
            <Slot onSlotChanged={onSlotChanged} id="8"/>
        </ol>
    );
}

export default CraftTable;