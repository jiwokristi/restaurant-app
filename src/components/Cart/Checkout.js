import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

// const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const minLengthHandler = (value) => value.trim().length < 2;

const Checkout = (props) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [streetIsTouched, setStreetIsTouched] = useState(false);
  const [postalCodeIsTouched, setPostalCodeIsTouched] = useState(false);
  const [cityIsTouched, setCityIsTouched] = useState(false);

  const nameIsInvalid = minLengthHandler(name);
  const streetIsInvalid = minLengthHandler(street);
  const postalCodeIsInvalid = !isFiveChars(postalCode);
  const cityIsInvalid = minLengthHandler(city);

  const nameIsError = nameIsInvalid && nameIsTouched;
  const streetIsError = streetIsInvalid && streetIsTouched;
  const postalCodeIsError = postalCodeIsInvalid && postalCodeIsTouched;
  const cityIsError = cityIsInvalid && cityIsTouched;

  const confirmButtonDisabled =
    nameIsInvalid || streetIsInvalid || postalCodeIsInvalid || cityIsInvalid;

  // const [formInputsValidity, setFormInputsValidity] = useState({
  //   name: true,
  //   street: true,
  //   postalCode: true,
  //   city: true,
  // });

  const nameHandler = (event) => {
    setName(event.target.value.replace(/[^A-Za-z ]/g, ""));
  };

  const streetHandler = (event) => setStreet(event.target.value);

  const postalCodeHandler = (event) => {
    setPostalCode(event.target.value.replace(/\D/g, ""));
  };

  const cityHandler = (event) => {
    setCity(event.target.value.replace(/[^A-Za-z ]/g, ""));
  };

  const nameBlurHandler = () => setNameIsTouched(true);
  const streetBlurHandler = () => setStreetIsTouched(true);
  const postalCodeBlurHandler = () => setPostalCodeIsTouched(true);
  const cityBlurHandler = () => setCityIsTouched(true);

  // const nameInputRef = useRef();
  // const streetInputRef = useRef();
  // const postalInputRef = useRef();
  // const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // const enteredName = nameInputRef.current.value;
    // const enteredStreet = streetInputRef.current.value;
    // const enteredPostalCode = postalInputRef.current.value;
    // const enteredCity = cityInputRef.current.value;

    // const enteredNameIsValid = !isEmpty(enteredName);
    // const enteredStreetIsValid = !isEmpty(enteredStreet);
    // const enteredCityIsValid = !isEmpty(enteredCity);
    // const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    // setFormInputsValidity({
    //   name: enteredNameIsValid,
    //   street: enteredStreetIsValid,
    //   city: enteredCityIsValid,
    //   postalCode: enteredPostalCodeIsValid,
    // });

    // const formIsValid =
    //   enteredNameIsValid &&
    //   enteredStreetIsValid &&
    //   enteredCityIsValid &&
    //   enteredPostalCodeIsValid;

    const formIsValid =
      !nameIsError && !streetIsError && !postalCodeIsError && !cityIsError;

    if (!formIsValid) {
      return;
    }

    // props.onConfirm({
    //   name: enteredName,
    //   street: enteredStreet,
    //   city: enteredCity,
    //   postalCode: enteredPostalCode,
    // });

    props.onConfirm({
      name,
      street,
      city,
      postalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    nameIsError ? classes.invalid : ""
  }`;

  const streetControlClasses = `${classes.control} ${
    streetIsError ? classes.invalid : ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    postalCodeIsError ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    cityIsError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.row}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Full Name</label>
          <input
            // ref={nameInputRef}
            type="text"
            id="name"
            value={name}
            onBlur={nameBlurHandler}
            onChange={nameHandler}
            maxLength={100}
          />
          {nameIsError && nameIsTouched && (
            <span>Min 2 and max 100 characters!</span>
          )}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input
            // // ref={streetInputRef}
            type="text"
            id="street"
            value={street}
            onBlur={streetBlurHandler}
            onChange={streetHandler}
            maxLength={100}
          />
          {streetIsError && streetIsTouched && (
            <span>Min 2 and max 100 characters!</span>
          )}
        </div>
      </div>
      <div className={classes.row}>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input
            // // ref={postalInputRef}
            type="text"
            id="postal"
            value={postalCode}
            onBlur={postalCodeBlurHandler}
            onChange={postalCodeHandler}
            maxLength={5}
          />
          {postalCodeIsError && postalCodeIsTouched && (
            <span>Must contain 5 characters!</span>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input
            // // ref={cityInputRef}
            type="text"
            id="city"
            value={city}
            onBlur={cityBlurHandler}
            onChange={cityHandler}
            maxLength={20}
          />
          {cityIsError && cityIsTouched && (
            <span>Min 2 and max 20 characters!</span>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          className={
            confirmButtonDisabled
              ? `${classes.submit} ${classes.disabled}`
              : classes.submit
          }
          disabled={confirmButtonDisabled}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
