import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        house: true,
        street: true,
        city: true,
    });
    const nameInputRef = useRef();
    const houseInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredHouse = houseInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredHouseIsValid = !isEmpty(enteredHouse);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: enteredNameIsValid,
            house: enteredHouseIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredHouseIsValid &&
            enteredStreetIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }
    };

    const nameInputClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const houseInputClasses = `${classes.control} ${
        formInputsValidity.house ? '' : classes.invalid
    }`;
    const streetInputClasses = `${classes.control} ${
        formInputsValidity.street ? '' : classes.invalid
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
            <div className={houseInputClasses}>
                <label htmlFor="house">House Name</label>
                <input type="text" id="house" ref={houseInputRef} />
                {!formInputsValidity.house && (
                    <p>Please enter a valid house name</p>
                )}
            </div>
            <div className={streetInputClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputsValidity.street && (
                    <p>Please enter a valid street</p>
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
