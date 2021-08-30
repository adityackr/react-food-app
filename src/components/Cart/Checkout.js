import useInput from '../../hooks/use_input';
import classes from './Checkout.module.css';

const isNotEmpty = (value) => value.trim() !== '';
const isElevenDigits = (value) => value.trim().length === 11;

const Checkout = (props) => {
    const {
        value: nameInputValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
    } = useInput(isNotEmpty);

    const {
        value: addressInputValue,
        isValid: addressIsValid,
        hasError: addressHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressInputBlurHandler,
    } = useInput(isNotEmpty);

    const {
        value: phoneInputValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneInputBlurHandler,
    } = useInput(isElevenDigits);

    const {
        value: cityInputValue,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityInputBlurHandler,
    } = useInput(isNotEmpty);

    let formIsValid = false;

    if (nameIsValid && addressIsValid && phoneIsValid && cityIsValid) {
        formIsValid = true;
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: nameInputValue,
            address: addressInputValue,
            phone: phoneInputValue,
            city: cityInputValue,
        });
    };

    const nameInputClasses = `${classes.control} ${
        !nameHasError ? '' : classes.invalid
    }`;
    const addressInputClasses = `${classes.control} ${
        !addressHasError ? '' : classes.invalid
    }`;
    const phoneInputClasses = `${classes.control} ${
        !phoneHasError ? '' : classes.invalid
    }`;
    const cityInputClasses = `${classes.control} ${
        !cityHasError ? '' : classes.invalid
    }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameInputClasses}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameInputBlurHandler}
                />
                {nameHasError && <p>Please enter a valid name</p>}
            </div>
            <div className={addressInputClasses}>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    onChange={addressChangeHandler}
                    onBlur={addressInputBlurHandler}
                />
                {addressHasError && <p>Please enter a valid address</p>}
            </div>
            <div className={phoneInputClasses}>
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    id="phone"
                    onChange={phoneChangeHandler}
                    onBlur={phoneInputBlurHandler}
                />
                {phoneHasError && <p>Please enter a valid phone number</p>}
            </div>
            <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    onChange={cityChangeHandler}
                    onBlur={cityInputBlurHandler}
                />
                {cityHasError && <p>Please enter a valid city</p>}
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
