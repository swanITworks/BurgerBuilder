import React, {Component} from "react";
import {Route} from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {},
        totalPrice: 0,
    };

    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: +price,
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace(this.props.match.url + 'contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary checkoutCancelledHandler={this.checkoutCancelledHandler}
                                 checkoutContinuedHandler={this.checkoutContinuedHandler}
                                 ingredients={this.state.ingredients}/>
                <Route path={this.props.match.url + '/contact-data'}
                       render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;