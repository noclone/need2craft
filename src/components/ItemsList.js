import { useState, useEffect } from 'react';
import Item from './Item'
import { HOST, PORT } from "../utils/env"

import classes from "./ItemsList.module.css"

import baseItems from './baseItems.json'

function ItemsList(props){

    const [ itemsList, setItemsList ] = useState(baseItems)

    function updateList(){
        if (props.loggedIn != null)
        {
            fetch(`http://${HOST}:${PORT}/items/of/${props.loggedIn.username}`)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                const array = JSON.parse(data)
                setItemsList(baseItems.concat(array))
            })
        }
    }

    useEffect(() => {
        updateList()
    }, [props.loggedIn])

    return (
        <div className={classes.container}>
            <ol className={classes.ItemsList}>
            { itemsList.map((item) => {
                return (
                <Item key={item.name} name={item.name} img={item.img}/>
                );
            })}
            </ol>
            <button onClick={updateList} className={classes.refreshBtn}>Refresh List</button>
        </div>
    );
    
}

export default ItemsList;