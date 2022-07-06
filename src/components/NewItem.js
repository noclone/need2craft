import { useState } from "react";

import { HOST, PORT } from "../utils/env"

import classes from "./NewItem.module.css";

function NewItem(props) {
  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState("");

  function isValidImage(link){
    console.log(link)
    const valids = [ ".png", ".jpg", ".jpeg", ".gif" ];
    for (const ext of valids)
    {
      if (link.endsWith(ext))
        return true;
    }
    return false;
  }

  const addItem = (event) => {
    event.preventDefault()
    if (
      itemName.length === 0 ||
      image.length === 0 ||
      !isValidImage(image) ||
      props.loggedIn == null
    )
      return;

    fetch(`http://${HOST}:${PORT}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: itemName,
        img: image,
        owner: props.loggedIn.username,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        setItemName("")
        setImage("")
      });
  };

  return (
    <div className={classes.form}>
      <form onSubmit={addItem}>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
        />
        <input
          type="text"
          name="image"
          placeholder="Image Link"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default NewItem;
