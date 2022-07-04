import { useState, useEffect } from 'react';
import Item from './Item'
import { HOST, PORT } from "../utils/env"

import classes from "./ItemsList.module.css"

import baseItems from './baseItems.json'

function ItemsList(props){

    const [ itemsList, setItemsList ] = useState([])

    function updateList(){
        if (props.loggedIn != null)
        {
            fetch(`http://${HOST}:${PORT}/items/of/${props.loggedIn.username}`)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                const array = JSON.parse(data)
                setItemsList(array)
            })
        }
        else
            setItemsList(baseItems)
    }

    useEffect(() => {
        updateList()
    }, [props.loggedIn])
    
    function deleteSelectedItems(){
        
    }

    return (
        <div className={classes.container}>
            <ol className={classes.ItemsList}>
            { itemsList.map((item) => {
                return (
                <Item key={item.name} name={item.name} img={item.img}/>
                );
            })}
            </ol>
            <div>
                <button onClick={updateList} className={classes.refreshBtn}>Refresh List</button>
                <button onClick={deleteSelectedItems} className={classes.deleteBtn}>Delete Selected Items</button>
            </div>
        </div>
    );
    
}

export default ItemsList;