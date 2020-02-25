import React from "react";
import classes from './Order.module.css';

const order = (props) => {
    const orderData = props.orderData;
    const ingredients = orderData.ingredients;
    const printIngredients = [];
    for (let item in ingredients) {
        printIngredients.push(<span
            style = {{
                textTransform: "capitalize",
                display: "inline-block",
                margin: '0.8px',
                border: '1px solid #ccc',
                padding: '5px',
            }}
            key={item}>{item} {ingredients[item]}
        </span>);
    }
    return (
        <div className={classes.Order}>
            <p>name: {orderData.customer.name}</p>
            <p><span>Igredients: </span>{printIngredients.map(item=>item)}</p>
            <p>Price: <strong>USD {orderData.price}</strong></p>
        </div>
    )
};

export default order;