import React, {Component} from "react";
import { Route } from 'react-router-dom';

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
        }
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]]=param[1];
        }
        this.setState({
            ingredients: ingredients
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/order-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary checkoutCancelledHandler={this.checkoutCancelledHandler}
                                 checkoutContinuedHandler={this.checkoutContinuedHandler}
                                 ingredients={this.state.ingredients}/>
                                 <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
            </div>
        )
    }
}

export default Checkout;