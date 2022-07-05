import classes from "./CraftTable.module.css"

import Slot from "./Slot"

function CraftTable(props)
{
    return (
        <ol className={classes.container}>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="0"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="1"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="2"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="3"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="4"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="5"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="6"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="7"/>
            <Slot onSlotChanged={props.onTableChanged} clear={props.clear} id="8"/>
        </ol>
    );
}

export default CraftTable;