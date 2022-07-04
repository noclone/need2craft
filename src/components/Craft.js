import CraftTable from "./CraftTable";
import arrow from "./images/arrow.png";
import Slot from "./Slot"
import { HOST, PORT } from "../utils/env"

import classes from "./CraftTable.module.css"
import { useState } from "react";

function Craft(props)
{
    const [ result, setResult ] = useState(null)
    const [ table, setTable ] = useState(new Array(9).fill(null))

    const [ clear, setClear ] = useState(false)

    const onSlotChanged = (slotData) => {
        setResult(slotData.item)
    }

    const onTableChanged = (slotData) => {
        table[slotData.id] = slotData.item
        setTable(table)
    }

    const addCraft = () => {
        if (result == null || table.every((el) => el == null))
            return;
        if (props.loggedIn == null)
            return;
        fetch(`http://${HOST}:${PORT}/crafts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                result: result,
                item0: table[0],
                item1: table[1],
                item2: table[2],
                item3: table[3],
                item4: table[4],
                item5: table[5],
                item6: table[6],
                item7: table[7],
                item8: table[8],
                owner: props.loggedIn.username
            })
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            console.log(data)
            setTable(new Array(9).fill(null))
            setResult(null)
            setClear(true)
        });
    }

    return(
    <ol className={classes.craftPath}>
        <li><CraftTable onTableChanged={onTableChanged} clear={[clear,setClear]}/></li>
        <li><img className={classes.arrow} src={arrow}></img></li>
        <Slot onSlotChanged={onSlotChanged} clear={[clear,setClear]} id="10"/>
        <li><button onClick={addCraft} className={classes.addCraftButton}>Add Craft</button></li>
    </ol>)
}

export default Craft;