import classes from "./SelectedItemsBar.module.css"

import trashcan from "./images/trashcan.png"

import { useEffect, useState } from 'react';

import { useDrop } from "react-dnd";

import Item from './Item'

import BackDrop from "./BackDrop"

function SelectedItemsBar(){

  const [ itemsList, setItemsList ] = useState([]);

  const [ selectedItems, setSelectedItems ] = useState([]);

  const [ ask, setAsk ] = useState([false, null]);

  const [ amount, setAmount ] = useState(1);

  const  [ isOver, drop ] = useDrop(() => ({
    accept: "image",
    drop: (item) => setAsk([true, item]),
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

  const addItemToList = (item, number) => {
    setItemsList(current => {
      current = current.filter((el) => el.name !== item.name)
      return [...current, {name: item.name, img: item.id, amount: number}];
    })
  }

  return (
    <div className={classes.container}>
      <ol className={classes.ItemsList} ref={drop}>
        { itemsList.map((item, index) => {
          return (
            <Item key={item.name} name={item.name} img={item.img} amount={item.amount} selected={[selectedItems, setSelectedItems, index]}/>
          );
        })}
      </ol>
      <div className={classes.trashcan}>
        <img ref={dropTrash} src={trashcan} width='50' height='50'></img>
      </div>

      {ask[0] && 
      <div>
        <div className={classes.askPopup}>
          <div className={classes.popupText}>How many do you want to craft ?</div>
          <input onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                  }} className={classes.inputAmount} type="text" pattern="[1-9][0-9]*"
                  onInput={(e) => {
                    if (e.target.validity.valid)
                      setAmount(e.target.value)
                    }} value={amount} />
          <div>
            <button className={classes.cancelBtnPopup} onClick={() => setAsk([false, null])}>Cancel</button>
            <button className={classes.addBtnPopup} onClick={() => {addItemToList(ask[1], amount); setAsk([false, null])}}>Add</button>
          </div>
        </div>
        <BackDrop backdrop="backdrop_dark"/>
      </div>}
    </div>
  )
}

export default SelectedItemsBar;