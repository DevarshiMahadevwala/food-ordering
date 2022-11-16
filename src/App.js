import {  useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meal/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartisShown, setcartisShown] = useState(false);

  function showCartHandler() {
    setcartisShown(true);
  }

  function hideCartHandler() {
    setcartisShown(false);
  }
  return (
    <CartProvider>
      {cartisShown && <Cart opened={cartisShown} onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
