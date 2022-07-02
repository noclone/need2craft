import Item from './Item'

import classes from "./ItemsList.module.css"

function ItemsList(){
    return (
        <ol className={classes.ItemsList}>
            <Item name="Iron Sword" img='https://linuxhint.com/wp-content/uploads/2022/01/word-image-1336.png'/>
            <Item name="Iron Ingot" img='https://static.wikia.nocookie.net/minecraft/images/e/e8/New_Iron_IngotB.png'/>
            <Item name="Stick" img='https://static.wikia.nocookie.net/minecraft/images/b/b0/Stick_inventory.png'/>
        </ol>
    );
    
}

export default ItemsList;