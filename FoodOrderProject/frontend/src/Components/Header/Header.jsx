import { useContext } from "react";
import logo from "../../assets/logo.jpg"
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import UserProgressContext from "../../store/UserProgressContext";

export default function Header(){

    const cartCTX = useContext(CartContext);
    const userProgressCTX = useContext(UserProgressContext);

    let totalQuantity = cartCTX.items.reduce((totalNumberOfItems, item) => (totalNumberOfItems+item.quantity) , 0 );

    return(
        <div id="main-header">
            <div id="title">
                <img src={logo}/>
                <h1>Food Order</h1>
            </div>
            <nav>
                <Button textOnly style={{display: "flex", alignItems: "center"}}
                    onClick={userProgressCTX.showCart}
                >
                    <FaShoppingCart style={{marginRight: "10px"}}/> Cart({totalQuantity})
                </Button>
            </nav>
        </div>
    );
}