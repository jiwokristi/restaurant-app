import { Fragment, useContext, useState, useEffect } from "react";

import Modal from "../UI/Modal";
import Loading from "../UI/Loading";

import CartItem from "./CartItem";
import Checkout from "./Checkout";

import successIcon from "../../assets/checkbox-circle-line.svg";
import errorIcon from "../../assets/error-warning-line.svg";

import classes from "./Cart.module.css";

import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => cartCtx.removeItem(id);

  const cartItemAddHandler = (item) => cartCtx.addItem(item);

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-a4104-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );
    setIsSubmitting(false);

    console.log(response);
    if (response.ok) setDidSubmit(true);
    else setIsError(true);

    cartCtx.clearCart();
  };

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      setIsCheckout(false);
    }
  }, [cartCtx.items]);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
        />
      ))}
    </ul>
  );

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
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <Fragment>
      <p>Sending order data...</p>
      <Loading />
    </Fragment>
  );
  const didSubmitModalContent = (
    <Fragment>
      <p className={classes["success-message"]}>Successfully sent the order!</p>
      <div className={classes["success-icon"]}>
        <img src={successIcon} alt="success icon" />
      </div>
      <p>Please wait for your order to arrive!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const errorModal = (
    <Fragment>
      <p className={classes["success-message"]}>Something went wrong!</p>
      <div className={classes["success-icon"]}>
        <img src={errorIcon} alt="error icon" />
      </div>
      <p>
        Please place your order through one of our employees while we fix this
        issue.
      </p>
      <div className={classes.actions}>
        <button
          className={classes.button}
          onClick={() => {
            props.onClose();
            setIsError(false);
          }}
        >
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !isError && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {!isSubmitting && isError && errorModal}
    </Modal>
  );
};

export default Cart;
