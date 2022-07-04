import { useState, useEffect } from 'react';
import Item from './Item'
import { HOST, PORT } from "../utils/env"

import classes from "./ItemsList.module.css"

import baseItems from './baseItems.json'

function ItemsList(props){

    const [ itemsList, setItemsList ] = useState([])

    const [ selectedItems, setSelectedItems ] = useState([])

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
                setSelectedItems(new Array(array.length).fill(false))
            })
        }
        else
        {
            setItemsList(baseItems)
            setSelectedItems(new Array(baseItems.length).fill(false))
        }
    }

    useEffect(() => {
        updateList()
    }, [props.loggedIn])

    function removeItem(i)
    {
        fetch(`http://${HOST}:${PORT}/items/${props.loggedIn.username}/${itemsList[i].name}`, {
            method: 'DELETE'
        }).then(
            response => updateList()
        )
        
    }
    
    function deleteSelectedItems(){
        if (props.loggedIn == null)
            return;
        for (let i = 0; i < selectedItems.length; i++)
        {
            if (selectedItems[i])
                removeItem(i);
        }
        updateList()
    }

    return (
        <div className={classes.container}>
            <ol className={classes.ItemsList}>
            { itemsList.map((item, index) => {
                return (
                <Item key={item.name} name={item.name} img={item.img} selected={[selectedItems, setSelectedItems, index]}/>
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