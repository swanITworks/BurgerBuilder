import React from "react";
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {

    const ingredients = props.ingredients;

    const showIngredients = () => {
        const ingredientsComponents = [];
        const ingredientsArray = Object.entries(ingredients);
        let sumOfIngredients = null;
        ingredientsArray.forEach(item => sumOfIngredients += item[1]);
        if (sumOfIngredients !== 0) {
            ingredientsArray.forEach((item)=>{
                    for (let i = 1; i <= item[1]; i++) {
                        ingredientsComponents.push(<BurgerIngredient key={item[0] + i} type={item[0]}/>);
                    }
                }
            );
        } else (
            ingredientsComponents.push(<p key='allert'>Please start adding ingredients!</p>)
        );
        return ingredientsComponents.map(item => item);
    };

    return (
        <div className={classes.Burger}>
            <BurgerIngredient key='top1' type='bread-top'/>
            {showIngredients()}
            <BurgerIngredient key='bottom1' type='bread-bottom'/>
        </div>
    )
};

export default Burger;