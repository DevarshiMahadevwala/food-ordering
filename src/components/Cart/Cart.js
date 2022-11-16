import React, { useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import axios from "axios";

function Cart(props) {
  const Cartctx = useContext(cartContext);
  const [isCheckout, setisCheckout] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const totalAmount = `$${Cartctx.totalAmount.toFixed(2)}`;
  const hasItems = Cartctx.items.length > 0;

  const cartItemAddHandler = (item) => {
    Cartctx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    Cartctx.removeItem(id);
  };

  const submitOrderHandler = (userData) => {
    setisSubmitting(true);
    axios
      .post(
        "https://react-http-750d5-default-rtdb.firebaseio.com/orders.json",
        {
          user: userData,
          items: Cartctx.items,
        }
      )
      .then(function (response) {
        console.log(response);
        setisSubmit(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    setisSubmitting(false);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {Cartctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
      {/* <div className={classes["cover-bar"]}></div> */}
    </ul>
  );
  function orderHandler() {
    setisCheckout(true);
  }
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout onSubmit={submitOrderHandler} onCancel={props.onClose} />
      ) : (
        modalActions
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = (
    <React.Fragment>
      <div className={classes.loader}></div>
      <h1 className={classes.ordering}>Ordering...</h1>
    </React.Fragment>
  );
  const didSubmitModalContent =<React.Fragment>
  <div className={classes.success}>
    <div className={classes.drawn}> 
      <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-33 0 100 50" style={{enableBackground: 'new -33 0 100 50'}} xmlSpace="preserve">
        <path className="circ path" style={{fill: 'none', stroke: '#61dafb', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10}} d="
        M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z" />
        <polyline className="tick path" style={{fill: 'none', stroke: '#61dafb', strokeWidth: 3, strokeLinejoin: 'round', strokeMiterlimit: 10}} points="
        11.6,20 15.9,24.2 26.4,13.8 " />
      </svg>
    </div>
  </div>
  <h2 className={classes.ordering}>Your order has been Placed!</h2>;
  <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>
  return (
    <Modal onClose={props.onClose}>
      {isSubmitting ? isSubmittingModalContent : !isSubmit && cartModalContent}
      {!isSubmitting && isSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
