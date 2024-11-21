import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import Button from "../UI/Button";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "./CartItem";
import { currencyFormatter } from "../../utils/formatting";

export default function Cart(){

    const cartCTX = useContext(CartContext);
    const userProgressCTX = useContext(UserProgressContext);

    const cartTotal = cartCTX.items.reduce((totalPrice, items)=>(
        totalPrice + (+items.price*items.quantity)
        ),0);
    
    return(
        <Modal className="cart" open={userProgressCTX.progress === "cart"} onClose={userProgressCTX.progress === 'cart' ? userProgressCTX.hideCart : null}>
            <h2>Your cart</h2>
            <ul>
                {cartCTX.items.map(item => (
                    <CartItem key={item.id} item={item}/>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={userProgressCTX.hideCart}>Close</Button>
                {cartCTX.items.length>0  && <Button onClick={userProgressCTX.showCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
}