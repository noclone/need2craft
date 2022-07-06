import { useEffect, useState } from "react";

import classes from "./ItemsList.module.css";

import { useDrag } from "react-dnd";

import ReactTooltip from "react-tooltip";

import uuid from 'react-native-uuid'

function Item(props) {
  const [isDragging, drag] = useDrag(() => ({
    canDrag: props.canDrag,
    type: "image",
    item: { id: props.img, name: props.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [isSelected, setIsSelected] = useState(false);

  const tooltipID = uuid.v4();

  function shortenAmount(value) {
    let newValue = value;
    const suffixes = ["", "k", "m", "b", "t"];
    let suffixNum = 0;
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum++;
    }
    newValue = parseInt(newValue);
    newValue += suffixes[suffixNum];
    return newValue;
  }

  useEffect(() => {
    props.selected[0][props.selected[2]] = isSelected;
    props.selected[1](props.selected[0]);
  }, [isSelected]);

  useEffect(() => {
    setIsSelected(false);
  }, [props.selected[0]]);

  return (
    <li
      className={isSelected ? classes.ItemSelected : classes.Item}
      onClick={() => setIsSelected(!isSelected)}
    >
      <img
        data-tip
        data-for={tooltipID}
        ref={drag}
        src={props.img}
        alt={props.name}
        style={{ width: 50, height: 50 }}
      ></img>
      <ReactTooltip id={tooltipID} place="top" effect="solid">
        {isNaN(Number(props.amount)) ? props.name : `${props.name}: ${Number(props.amount)}`}
      </ReactTooltip>
      {(typeof props.amount === "string" || typeof props.amount === "number") && Number(props.amount) !== 1 && (
        <div className={classes.amount}>{`${shortenAmount(
          Number(props.amount)
        )}`}</div>
      )}
    </li>
  );
}

export default Item;
