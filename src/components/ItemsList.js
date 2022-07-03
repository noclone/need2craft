import { useEffect, useState } from 'react';
import Item from './Item'

import classes from "./ItemsList.module.css"

import baseItems from './baseItems.json'

function ItemsList(){

    const [ itemsList, setItemsList ] = useState(baseItems)

    return (
        <ol className={classes.ItemsList}>
            { itemsList.map((item) => {
                return (
                <Item key={item.name} name={item.name} img={item.img}/>
                );
            })}
        </ol>
    );
    
}

export default ItemsList;