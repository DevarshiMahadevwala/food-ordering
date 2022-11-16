import { Fragment } from "react";
import mealsImage from "../../assets/1.jpg";
import classes from "./Header.module.css";
import logo from "../../assets/logo.svg";
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Mealed</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="meals" />
      </div>
    </Fragment>
  );
}

export default Header;
