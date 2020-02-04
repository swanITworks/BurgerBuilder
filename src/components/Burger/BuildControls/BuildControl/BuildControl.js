import React from "react";
import classes from "./BuildControl.module.css"

const BuildControl = (props) => {
    const {label, actualValue, changeHandlerPlus, changeHandlerMinus,disabled} = props;
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button
                onClick={changeHandlerMinus}
                className={classes.Less}
                disabled={disabled}>Less</button>
            <span>{actualValue}</span>
            <button
                onClick={changeHandlerPlus}
                className={classes.More}>More</button>
        </div>
    )
};

export default BuildControl;