import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => {

    const {ingredients,totalPrice,disabled, purchasable, checkInHandler, ingredientAdded, ingredientRemoved} = props;
    const ingredientsArray = Object.entries(ingredients);
    const ingredientsControls = ingredientsArray.map(item => (
            <BuildControl key={item[0] + item[1]} disabled={disabled[item[0]]} label={item[0]} actualValue={item[1]}
                          changeHandlerPlus={()=>ingredientAdded(item[0])}
                          changeHandlerMinus={() => ingredientRemoved(item[0])}/>
        )

    );
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>£ {totalPrice.toFixed(2)}</strong></p>
            {ingredientsControls}
            <button onClick={()=>{checkInHandler()}} disabled={!purchasable} className={classes.OrderButton}>{ props.isAuth ? 'ORDER NOW' : 'SIGNIN' }</button>
        </div>
    )
};

export default BuildControls;
