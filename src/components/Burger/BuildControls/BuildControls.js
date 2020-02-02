import React from "react";
import classes from './BuildControls.module.css';

const BuildControls = (props) => {

    const ingredients = props.ingredients;
    const ingredientsArray = Object.entries(ingredients);
    const ingredientsControls = ingredientsArray.map(item=>(
        <p key={item[0]}><span>{item[0]}</span> <span>-</span> <span>{item[1]}</span> <span>+</span></p>
        )
    );

    return (
        <div className={classes.BuildControls}>
            {ingredientsControls}
        </div>
    )
};

export default BuildControls;
