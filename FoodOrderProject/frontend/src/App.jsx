import Header from './Components/Header/Header.jsx';
import Meals from './Components/Meals/Meals.jsx';
import Cart from './Components/Header/Cart.jsx'
import { CartContextProvider } from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import Checkout from './Components/Checkout/Checkout.jsx';

function App() {

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
          <Header/>
          <Meals/>
          <Cart/>
          <Checkout/>
      </CartContextProvider>
    </UserProgressContextProvider>
  )
}

export default App;
