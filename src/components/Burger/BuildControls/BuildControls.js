import React from "react";
import classes from './BuildControls.module.css';

const BuildControls = (props) => {

    const {ingredients,changeIngredientsHandler} = props;
    const ingredientsArray = Object.entries(ingredients);
    const ingredientsControls = ingredientsArray.map(item=>(
        <p key={item[0]}><span>{item[0]}</span> <span onClick={()=>changeIngredientsHandler(item[0],'subs')}>-</span> <span>{item[1]}</span> <span onClick={()=>changeIngredientsHandler(item[0],'add')}>+</span></p>
        )
    );

    return (
        <div className={classes.BuildControls}>
            {ingredientsControls}
        </div>
    )
};

export default BuildControls;
