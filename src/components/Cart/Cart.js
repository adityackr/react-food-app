import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isOrdered, setIsOrdered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [error, setError] = useState();

    const cartCtx = useContext(CartContext);

    const totalAmount = `৳${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsOrdered(true);
    };

    const submitHandler = async (userData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(
                'https://react-food-app-c4146-default-rtdb.firebaseio.com/orders.json',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        user: userData,
                        orderedItems: cartCtx.items,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            setDidSubmit(true);
            cartCtx.clearCart();
        } catch (error) {
            setError(error.message);
        }
        setIsSubmitting(false);
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button
                className={classes['button--alt']}
                onClick={props.onCloseCart}
            >
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const modalContents = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total</span>
                <span>{totalAmount}</span>
            </div>
            {isOrdered && (
                <Checkout
                    onConfirm={submitHandler}
                    onCancel={props.onCloseCart}
                />
            )}
            {!isOrdered && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = (
        <p>
            <strong>Please wait...</strong>
        </p>
    );

    const didSubmitModalContent = (
        <React.Fragment>
            <p>
                <strong>Your order has successfully submitted!</strong>
            </p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onCloseCart}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    const errorContent = (
        <React.Fragment>
            <p className={classes.error}>
                <strong>{error}</strong>
            </p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onCloseCart}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {!isSubmitting && !didSubmit && !error && modalContents}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
            {error && !didSubmit && errorContent}
        </Modal>
    );
};

export default Cart;
