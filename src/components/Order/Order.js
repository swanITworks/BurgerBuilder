import React from "react";
import classes from './Order.module.css';

const order = (props) => {
    const orderData = props.orderData;
    const ingredients = orderData.ingredients;
    const printIngredients = [];
    for (let item in ingredients) {
        printIngredients.push(<><span>{item}</span> <span>{ingredients[item]}</span> </>);
    }
    return (
        <div className={classes.Order}>
            <p>name: {orderData.customer.name}</p>
            <p><span>Igredients: </span>{printIngredients.map(item=>item)}</p>
            <p>Price: <strong>{orderData.price}</strong></p>
        </div>
    )
};

export default order;