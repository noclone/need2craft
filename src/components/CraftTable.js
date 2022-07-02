import classes from "./CraftTable.module.css"

import Slot from "./Slot"

function CraftTable(props)
{
    return (
        <ol className={classes.container}>
            <Slot id="1"/>
            <Slot id="2"/>
            <Slot id="3"/>
            <Slot id="4"/>
            <Slot id="5"/>
            <Slot id="6"/>
            <Slot id="7"/>
            <Slot id="8"/>
            <Slot id="9"/>
        </ol>
    );
}

export default CraftTable;