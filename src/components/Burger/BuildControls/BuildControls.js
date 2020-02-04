import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => {

    const {ingredients, changeIngredientsHandler,totalPrice,disabled} = props;
    const ingredientsArray = Object.entries(ingredients);
    const ingredientsControls = ingredientsArray.map(item => (
            <BuildControl key={item[0] + item[1]} disabled={disabled[item[0]]} label={item[0]} actualValue={item[1]}
                          changeHandlerPlus={() => changeIngredientsHandler(item[0], 'add')}
                          changeHandlerMinus={() => changeIngredientsHandler(item[0], 'subs')}/>
        )
    );

    return (
        <div className={classes.BuildControls}>
            <p>{totalPrice}</p>
            {ingredientsControls}
        </div>
    )
};

export default BuildControls;
