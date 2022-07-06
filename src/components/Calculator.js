import { useState } from "react";
import classes from "./Calculator.module.css";
import Item from "./Item";
import { HOST, PORT } from "../utils/env";

function Calculator(props) {
  const [itemsList, setItemsList] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [filter, setFilter] = useState("");

  async function calculate() {
    let user = "default";
    if (props.loggedIn != null) user = props.loggedIn.username;
    const response = await fetch(`http://${HOST}:${PORT}/crafts/of/${user}`);
    const crafts = await response.json();
    const newList = JSON.parse(JSON.stringify(props.list));
    let i = 0;
    const known_crafts = [];
    while (i !== newList.length) {
      let item = newList[i];
      for (let l = 0; l < crafts.length; l++) {
        const craft = crafts[l];
        if (craft.result === item.name) {
          newList.splice(i, 1);
          for (let j = 0; j < item.amount; j++) {
            if (!known_crafts.some((el) => el.result === item.name)) {
              const [a, b, c, d, e, f, g, h, i] = await Promise.all([
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item0}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item1}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item2}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item3}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item4}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item5}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item6}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item7}`),
                fetch(`http://${HOST}:${PORT}/items/${user}/${craft.item8}`),
              ]);

              const response = await Promise.all([
                a.json(),
                b.json(),
                c.json(),
                d.json(),
                e.json(),
                f.json(),
                g.json(),
                h.json(),
                i.json(),
              ]);

              known_crafts.push({
                result: item.name,
                response: response,
              });

              for (let k = 0; k < response.length; k++) {
                if (response[k].length === 0) continue;
                if (
                  !newList.some((e) => {
                    if (e.name === response[k][0].name) {
                      e.amount += 1;
                    }
                    return e.name === response[k][0].name;
                  })
                ) {
                  newList.push({
                    name: response[k][0].name,
                    img: response[k][0].img,
                    amount: 1,
                  });
                }
              }
            } else {
              for (const known_craft of known_crafts) {
                if (known_craft.result === item.name) {
                  const response = known_craft.response;
                  for (let k = 0; k < response.length; k++) {
                    if (response[k].length === 0) continue;
                    if (
                      !newList.some((e) => {
                        if (e.name === response[k][0].name) {
                          e.amount += 1;
                        }
                        return e.name === response[k][0].name;
                      })
                    ) {
                      newList.push({
                        name: response[k][0].name,
                        img: response[k][0].img,
                        amount: 1,
                      });
                    }
                  }
                }
              }
            }
          }
          i--;
          break;
        }
      }
      i++;
    }
    setItemsList(newList);
  }

  return (
    <div className={classes.calculatorContainer}>
      <div className={classes.containerItemList}>
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
                  amount={item.amount}
                  canDrag={false}
                  selected={[selectedItems, setSelectedItems, index]}
                />
              );
            })}
          </ol>
        </div>
      </div>
      <button className={classes.calculatorBtn} onClick={() => calculate()}>
        What do I need2craft ?
      </button>
    </div>
  );
}

export default Calculator;
