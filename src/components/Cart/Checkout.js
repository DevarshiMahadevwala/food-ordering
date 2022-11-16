import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isSixChar = (value) => value.trim().length === 6;

function Checkout(props) {
  const [formInputValidity, setformInputValidity] = useState({
    name: true,
    address: true,
    city: true,
    pincode: true,
    correctpincode: true,
  });
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const pincodeInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPinCode = pincodeInputRef.current.value;

    const enteredNameisValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPinCodeisValid = !isEmpty(enteredPinCode);
    const enteredPinCodeisTrue = isSixChar(enteredPinCode);

    setformInputValidity({
      name: enteredNameisValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      pincode: enteredPinCodeisValid,
      correctpincode: enteredPinCodeisTrue,
    });

    const formisValid =
      enteredNameisValid &&
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredPinCodeisValid &&
      enteredPinCodeisTrue;

    if (!formisValid) {
        return;
    }

    props.onSubmit({
        name: enteredName,
        address: enteredAddress,
        city: enteredCity,
        pincode: enteredPinCode
    })
  }
  const errmsg = <p>*This Field is Required.</p>;
  const errmsg2 = <p>*Please Enter a valid Pincode.</p>;
  return (
    <form className={classes.form} onSubmit={submitHandler} noValidate>
      <div className={classes["login-box"]}>
        <div
          className={`${classes["user-box"]} ${
            formInputValidity.name ? "" : classes.invalid
          }`}
        >
          <input type="text" id="name" ref={nameInputRef} required/>
          <label htmlFor="name">Name</label>
          {!formInputValidity.name ? errmsg: <p></p>}
        </div>
        <div
          className={`${classes["user-box"]} ${
            formInputValidity.address ? "" : classes.invalid
          }`}
        >
          <input type="text" id="address" ref={addressInputRef} required/>
          <label htmlFor="address">Address</label>
          {!formInputValidity.address ? errmsg : <p></p>}
        </div>
        <div
          className={`${classes["user-box"]} ${
            formInputValidity.city ? "" : classes.invalid
          }`}
        >
          <input type="text" id="city" ref={cityInputRef} required/>
          <label htmlFor="city">City</label>
          {!formInputValidity.city ? errmsg : <p></p>}
        </div>
        <div
          className={`${classes["user-box"]} ${
            formInputValidity.correctpincode ? "" : classes.invalid
          }`}
        >
          <input type="number" id="pincode" ref={pincodeInputRef} required/>
          <label htmlFor="pincode">Postal-Code</label>
          {!formInputValidity.pincode
            ? errmsg
            : !formInputValidity.correctpincode ? errmsg2 : <p></p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes["button--alt"]}
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button className={classes.button}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
