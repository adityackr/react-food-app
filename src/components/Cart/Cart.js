import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isOrdered, setIsOrdered] = useState(false);

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

    return (
        <Modal onCloseCart={props.onCloseCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total</span>
                <span>{totalAmount}</span>
            </div>
            {isOrdered && <Checkout onCancel={props.onCloseCart} />}
            {!isOrdered && modalActions}
        </Modal>
    );
};

export default Cart;
