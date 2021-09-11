import { useState } from "react";

import { FormContext } from "./form-context";

const FormContextProvider = (props) => {
  const [formVisibility, setFormVisibility] = useState(false);
  const [newUserFormIsVisible, setNewUserFormIsVisible] = useState(false);
  const [editUserFormIsVisible, setEditUserFormIsVisible] = useState(false);
  const [deleteUserFormIsVisible, setDeleteUserFormIsVisible] = useState(false);

  const makeFormVisibleHandler = (userType) => {
    setFormVisibility(true);
    if (userType === "NEW_USER") {
      setNewUserFormIsVisible(true);
    }
    if (userType === "EXISTING_USER") {
      setEditUserFormIsVisible(true);
    }
    if (userType === "DELETE_USER") {
      setDeleteUserFormIsVisible(true);
    }
  };

  const makeFormHiddenHander = () => {
    setFormVisibility(false);
    setEditUserFormIsVisible(false);
    setNewUserFormIsVisible(false);
    setDeleteUserFormIsVisible(false);
  };

  const contextValue = {
    formVisibility,
    newUserFormVisibility: newUserFormIsVisible,
    editUserFormVisibility: editUserFormIsVisible,
    deleteUserFormIsVisibitity: deleteUserFormIsVisible,
    showForm: makeFormVisibleHandler,
    hideForm: makeFormHiddenHander,
  };

  return (
    <FormContext.Provider value={contextValue}>
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
