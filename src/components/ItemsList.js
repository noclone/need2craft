import { useState, useEffect } from "react";
import Item from "./Item";
import { HOST, PORT } from "../utils/env";

import classes from "./ItemsList.module.css";

import baseItems from "./baseItems.json";

import BackDrop from "./BackDrop";

function ItemsList(props) {
  const [itemsList, setItemsList] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [filter, setFilter] = useState("");

  const [ask, setAsk] = useState(false);

  function updateList() {
    if (props.loggedIn != null) {
      fetch(`http://${HOST}:${PORT}/items/of/${props.loggedIn.username}`)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          const array = JSON.parse(data);
          setItemsList(array);
          setSelectedItems(new Array(array.length).fill(false));
        });
    } else {
      setItemsList(baseItems);
      setSelectedItems(new Array(baseItems.length).fill(false));
    }
  }

  useEffect(() => {
    updateList();
  }, [props.loggedIn]);

  function removeItem(i) {
    fetch(
      `http://${HOST}:${PORT}/items/${props.loggedIn.username}/${itemsList[i].name}`,
      {
        method: "DELETE",
      }
    ).then((response) => updateList());
  }

  function deleteSelectedItems() {
    if (props.loggedIn == null) return;
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i]) removeItem(i);
    }
    updateList();
  }

  return (
    <div className={classes.containerItemList}>
      {ask && (
        <div>
          <BackDrop backdrop="backdrop_dark" onClick={() => setAsk(false)} />
          <div className={classes.askPopup}>
            <div className={classes.popupText}>
              Do you REALLY want to delete these items (irreversible) ?
            </div>
            <button
              className={classes.cancelBtnPopup}
              onClick={() => setAsk(false)}
            >
              Cancel
            </button>
            <button
              className={classes.deleteBtnPopup}
              onClick={() => {
                deleteSelectedItems();
                setAsk(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      <input
        className={classes.searchBar}
        type="text"
        name="searchText"
        placeholder="Filter items"
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className={classes.container}>
        <ol className={classes.ItemsList}>
          {itemsList.map((item, index) => {
            if (
              filter !== "" &&
              !item.name.toLowerCase().includes(filter.toLowerCase())
            )
              return;
            return (
              <Item
                key={item.name}
                name={item.name}
                img={item.img}
                selected={[selectedItems, setSelectedItems, index]}
              />
            );
          })}
        </ol>
        <div>
          <button onClick={updateList} className={classes.refreshBtn}>
            Refresh List
          </button>
          <button onClick={() => setAsk(true)} className={classes.deleteBtn}>
            Delete Selected Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemsList;
