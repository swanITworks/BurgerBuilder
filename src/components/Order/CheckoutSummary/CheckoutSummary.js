import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkout = (props) => {
        return (
            <div className={classes.CheckoutSummary}>
                <h1>We hope it tastes well!</h1>
                <div style={{width:'100%', margin: 'auto'}}>
                    <Burger ingredients={props.ingredients}/>
                </div>
                <Button onClick = {props.checkoutCancelledHandler} btnType="Danger" clicked>CANCEL</Button>
                <Button onClick = {props.checkoutContinuedHandler} btnType="Success" clicked>CONTINUE</Button>
            </div>
        );
};

export default checkout;