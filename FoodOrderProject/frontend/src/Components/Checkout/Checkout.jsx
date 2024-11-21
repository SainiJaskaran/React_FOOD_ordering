import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../../utils/formatting";
import UserProgressContext from "../../store/UserProgressContext";
import Input from "../UI/Input";
import Button from "../UI/Button";
import useHttp from "../../hooks/useHttp.js";
import Error from "../UI/Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
};

export default function Checkout(){

    const cartCTX = useContext(CartContext);
    const userProgressCTX = useContext(UserProgressContext);

    const {data, isLoading: isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCTX.items.reduce((totalPrice, items)=>(
        totalPrice + (items.price*items.quantity)
        ),0);

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCTX.items,
                    customer: customerData
                }
            })
        )
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={userProgressCTX.hideCheckout}>Close</Button>
            <Button>Submit Order</Button>
        </>
    );

    if(isSending){
        actions = <span>Sending order data ....</span>
    }

    if(data && !error){
        return (
            <Modal open={userProgressCTX.progress === "checkout"} onClose={userProgressCTX.hideCheckout}>
                <h2>Success!</h2>
                <p>Your order was submitted succesfully.</p>
                <p>We will get back to you soon.</p>
                <p className="modal-actions">
                    <Button onClick={()=>{
                        userProgressCTX.hideCheckout();
                        cartCTX.clearCart();
                        clearData();
                    }
                    }>Okay</Button>
                </p>
            </Modal>
        )
    }

    return(
        <Modal open={userProgressCTX.progress === "checkout"} onClose={userProgressCTX.hideCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-Mail Address" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city"/>
                </div>

                {error && <Error title="Failed to submit the order" message={error}/>}

                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
}