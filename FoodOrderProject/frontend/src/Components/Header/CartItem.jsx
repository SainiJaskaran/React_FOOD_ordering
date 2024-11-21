import { useContext } from "react";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../utils/formatting";


export default function CartItem({item}){

    const cartCTX = useContext(CartContext);

    return(
        <li className="cart-item" key={item.id}>
            <p>
                {item.name} - {item.quantity} X {currencyFormatter.format(item.price)}
            </p>
            <p className="cart-item-actions">
                <button onClick={()=>cartCTX.removeItem(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={()=>cartCTX.addItem(item)}>+</button>
            </p>
        </li>
    );
}