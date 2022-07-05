import classes from "./SelectedItemsBar.module.css"

import trashcan from "./images/trashcan.png"

import { useEffect, useState } from 'react';

import { useDrop } from "react-dnd";

import Item from './Item'

function SelectedItemsBar(){

  const [ itemsList, setItemsList ] = useState([]);

  const [ selectedItems, setSelectedItems ] = useState([]);

  const  [ isOver, drop ] = useDrop(() => ({
    accept: "image",
    drop: (item) => addItemToList(item),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(),
    }),
  }));

  const  [ isOverTrash, dropTrash ] = useDrop(() => ({
    accept: "image",
    drop: (item) => setItemsList(current => {
      return current.filter((el) => el.name !== item.name)
    }),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(),
    }),
  }))

  const addItemToList = (item) => {
    setItemsList(current => {
      for (const el of current)
      {
        if (el.name === item.name)
          return current;
      }
      return [...current, {name:item.name, img:item.id}];
    })
  }

  return (
    <div className={classes.container}>
      <ol className={classes.ItemsList} ref={drop}>
        { itemsList.map((item, index) => {
          return (
            <Item key={item.name} name={item.name} img={item.img} selected={[selectedItems, setSelectedItems, index]}/>
          );
        })}
      </ol>
      <div className={classes.trashcan}>
        <img ref={dropTrash} src={trashcan} width='50' height='50'></img>
      </div>
    </div>
  )
}

export default SelectedItemsBar;