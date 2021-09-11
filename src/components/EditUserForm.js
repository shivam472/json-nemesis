import { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import classes from "./NewUserForm.module.css";
import Modal from "./UI/Modal";

const EditUserForm = (props) => {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);

  const nameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const websiteInputRef = useRef();

  const sendUserDataHandler = (
    enteredName,
    enteredUsername,
    enteredEmail,
    enteredPhone,
    enteredWebsite
  ) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${props.userData.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: enteredName,
        username: enteredUsername,
        email: enteredEmail,
        phone: enteredPhone,
        website: enteredWebsite,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const submitHandler = () => {
    const enteredName = nameInputRef.current.value;
    const enteredUserName = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredWebsite = websiteInputRef.current.value;

    if (
      enteredName.trim() !== "" &&
      enteredUserName.trim() !== "" &&
      enteredEmail.trim() !== "" &&
      enteredPhone.trim() !== "" &&
      enteredWebsite.trim() !== ""
    ) {
      sendUserDataHandler(
        enteredName,
        enteredUserName,
        enteredEmail,
        enteredPhone,
        enteredWebsite
      );
      setFormIsSubmitted(true);
    }
  };

  return (
    <Modal>
      {!formIsSubmitted && (
        <form className={classes.form}>
          <h3>Update User</h3>
          <TextField
            label="Name"
            variant="outlined"
            inputRef={nameInputRef}
            defaultValue={props.userData.name}
          />
          <TextField
            label="Username"
            variant="outlined"
            inputRef={usernameInputRef}
            defaultValue={props.userData.username}
          />
          <TextField
            label="Email"
            variant="outlined"
            inputRef={emailInputRef}
            defaultValue={props.userData.email}
          />
          <TextField
            label="Phone"
            variant="outlined"
            inputRef={phoneInputRef}
            defaultValue={props.userData.phone}
          />
          <TextField
            label="Website"
            variant="outlined"
            inputRef={websiteInputRef}
            defaultValue={props.userData.website}
          />

          <div className={classes["button-container"]}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "30%" }}
              onClick={submitHandler}
            >
              Update User
            </Button>
          </div>
        </form>
      )}
      {formIsSubmitted && (
        <h1
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          User Updated
        </h1>
      )}
    </Modal>
  );
};

export default EditUserForm;
