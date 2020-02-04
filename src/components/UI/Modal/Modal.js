import React from "react";
import classes from "./Modal.module.css"

const Modal = (props) => {
    return (
        <div className={classes.ModalClass}>
            <p>chujnia</p>
            {props.children}
        </div>
    )

};

export default Modal;