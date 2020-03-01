import React from "react";
import classes from "./Input.module.css"

const input = (props) => {
    const { label, value, elementType, change } = props;
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if ( props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push(classes.Invalid);
    }

    switch (elementType) {
        case ('input'):
            inputElement = <input
                onChange={change}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={value}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                onChange={change}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={value}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    onChange={change}
                    className={inputClasses.join(' ')}
                    value={value}>
                    {props.elementConfig.options.map( option => (
                      <option key={option.value} value={option.value}>
                          {option.displayValue}
                      </option>
                        )

                    )}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    )
};

export default input;