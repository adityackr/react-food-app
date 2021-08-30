import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isElevenDigits = (value) => value.trim().length === 11;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        phone: true,
        city: true,
    });
    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const phoneInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPhoneIsValid = isElevenDigits(enteredPhone);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            phone: enteredPhoneIsValid,
            city: enteredCityIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredAddressIsValid &&
            enteredPhoneIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            phone: enteredPhone,
            city: enteredCity,
        });
    };

    const nameInputClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const addressInputClasses = `${classes.control} ${
        formInputsValidity.address ? '' : classes.invalid
    }`;
    const phoneInputClasses = `${classes.control} ${
        formInputsValidity.phone ? '' : classes.invalid
    }`;
    const cityInputClasses = `${classes.control} ${
        formInputsValidity.city ? '' : classes.invalid
    }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={addressInputClasses}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" ref={addressInputRef} />
                {!formInputsValidity.address && (
                    <p>Please enter a valid address</p>
                )}
            </div>
            <div className={phoneInputClasses}>
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" ref={phoneInputRef} />
                {!formInputsValidity.phone && (
                    <p>Please enter a valid phone number</p>
                )}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
