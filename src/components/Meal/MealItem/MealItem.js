import { useContext } from "react";
import cartContext from "../../../store/cart-context";
import classes from "./MEalItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;

  const Cartctx = useContext(cartContext);

  const addAmountHandler = (amount) => {
      Cartctx.addItem({
          id: props.id,
          name: props.name,
          amount: +amount,
          price: props.price
      })
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}> {props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addAmountHandler} />
      </div>
    </li>
  );
}

export default MealItem;
