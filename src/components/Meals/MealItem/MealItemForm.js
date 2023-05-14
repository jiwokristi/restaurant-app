import { useRef, useState } from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  // const amountInputRef = useRef();
  const [amountInput, setAmountInput] = useState("0");
  const [amountIsValid, setAmountIsValid] = useState({
    isValid: true,
    message: "",
  });

  const amountChangeHandler = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    setAmountInput((prevAmount) => {
      if (
        (prevAmount === "0" && value === "00") ||
        value === "0" ||
        value === ""
      ) {
        // ? the first condition is to check if the amount is still in its default value
        // ? the second condition is to check if the user is typing something that isn't a number
        // ? the third condition is to check if the user is deleting the value inside of the amount field until it's empty
        return "0";
      } else if (prevAmount === "0" && value !== "00") {
        // ? this one is to check if the amount is still in its default value and the user is typing the first valid amount
        return value.replace(/^0/g, "");
      } else {
        return value;
      }
    });
  };
  // const amountChangeHandler = (event) => {setAmountInput(prevAmount => {
  //   const newAmount = +prevAmount + 1
  //   return newAmount.toString()
  // })}

  const submitHandler = (event) => {
    event.preventDefault();

    // const enteredAmount = amountInputRef.current.value;
    // const enteredAmountNumber = +enteredAmount;

    const enteredAmount = +amountInput;

    if (enteredAmount === 0) {
      setAmountIsValid({
        isValid: false,
        message: "Please enter a valid amount.",
      });
      return;
    } else if (enteredAmount > 5) {
      setAmountIsValid({ isValid: false, message: "Maximum amount is 5." });
      return;
    }

    props.onAddToCart(enteredAmount);
    setAmountIsValid({ isValid: true, message: "" });
    setAmountInput("0");

    // if (
    //   enteredAmount.trim().length === 0 ||
    //   enteredAmountNumber < 1 ||
    //   enteredAmountNumber > 5
    // ) {
    //   setAmountIsValid(false);
    //   return;
    // }

    // props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        // ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          // min: "1",
          // max: "5",
          // step: "1",
          // defaultValue: "1",
          onChange: amountChangeHandler,
          value: amountInput,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid.isValid && <p>{amountIsValid.message}</p>}
    </form>
  );
};

export default MealItemForm;
