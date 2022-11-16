import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const {items} = cartCtx;
  const [btnisAnimated, setbtnisAnimated] = useState(false);
  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setbtnisAnimated(true);

    const timer = setTimeout(() => {
      setbtnisAnimated(false);
    }, 300)

    return () => {
      clearTimeout(timer);
    };
  }, [items])

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnisAnimated ? classes.bump : ''}`
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
export default HeaderCartButton;
