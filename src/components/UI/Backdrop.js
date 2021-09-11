import { useContext } from "react";

import classes from "./Backdrop.module.css";
import { FormContext } from "../context/form-context";

const Backdrop = () => {
  const formCtx = useContext(FormContext);

  return <div className={classes.backdrop} onClick={formCtx.hideForm} />;
};

export default Backdrop;
