import React from "react";
import classes from "./Input.module.css"

const input = (props) => {
    const {label, inputType} = this.props;
    let inputElement = null;

    switch (inputType) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props} />;
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    )
};

export default input;