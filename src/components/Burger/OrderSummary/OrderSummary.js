import React from "react";
import Aux from "../../../hoc/Aux/Aux";

const OrderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients)
        .map(item => {
            return (
                <li>
                    <span style={{textTransform: 'capitalize'}}>{item}</span>: {props.ingredients[item]}
                </li>
            )
        });

    return (
        <Aux>
            <h3>Your order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to check out?</p>
        </Aux>
    )
};

export default OrderSummary;

