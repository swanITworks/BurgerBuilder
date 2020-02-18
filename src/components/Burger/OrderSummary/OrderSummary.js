import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) =>
    {
        const ingredientsSummary = Object.keys(props.ingredients)
            .map(item => {
                return (
                    <li key={item}>
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
                <p><strong>Total Price: £ {props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" onClick={props.modalClosed}>CANCEL</Button>
                <Button btnType="Success" onClick={()=>props.checkOutHandler(props.ingredients)}>CONTINUE</Button>
            </Aux>
        )
    };

export default OrderSummary;

