import { useState, useContext } from "react";

import Modal from "./UI/Modal";
import Button from "@material-ui/core/Button";
import { FormContext } from "./context/form-context";

const DeleteUserForm = (props) => {
  const formCtx = useContext(FormContext);
  const [userDeleted, setUserDeleted] = useState(false);

  const deleteUserHandler = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${props.userData.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setUserDeleted(true);
      });
  };

  return (
    <Modal>
      {userDeleted && (
        <h3
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          User Deleted!
        </h3>
      )}
      {!userDeleted && (
        <>
          <h2>Are you sure you want to delete this user?</h2>
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={formCtx.hideForm}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={deleteUserHandler}
            >
              Yes
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default DeleteUserForm;
