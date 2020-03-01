import React, { Component } from "react";
import { connect } from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

const PRICE_LIST = {
    salad: 0.5,
    bacon: 0.8,
    cheese: 0.7,
    meat: 1,
};

class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        purchasable: false,
        checkIn: false,
        loading: false,
        error: false,
    };

    // componentDidMount() {
    //     axios.get('https://burger-builder-89c84.firebaseio.com/ingredients.json')
    //         .then(response =>{
    //         this.setState({ingredients:response.data});
    //     }).catch(err=>{
    //         this.setState({error: true});
    //     });
    // }

    updatePurchaseState = () => {
        const ingredients = {
            ...this.props.ings
        };
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, element,) => {
                return sum + element
            }, 0);
        this.setState({purchasable: sum > 0})
    };

    changeIngredientsHandler = () => {
        let newState = [...Object.entries(this.props.ings)];

        this.setState({ingredients: newState}, () => {
            const newTotalPrice = [...Object.entries(this.props.ings)]
                .reduce((acc, curr, index) => acc + (PRICE_LIST[curr[0]] * curr[1]), 4);
            this.setState({totalPrice: newTotalPrice}, this.updatePurchaseState);
        });
    };

    checkInHandler = () => {
        this.setState({checkIn: true})
    };

    checkInCancelHandler = () => {
        this.setState({checkIn: false})
    };

    checkOutHandler = () => {

        const queryParams = [];

        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }
        ;
        queryParams.push('price=' + encodeURIComponent(this.state.totalPrice));

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout/',
            search: '?' + queryString,
        });
    };

    render() {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredients={this.props.ings}
                                   totalPrice={this.state.totalPrice}
                                   ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemoved={this.props.onIngredientRemoved}
                                   changeIngredientsHandler={this.changeIngredientsHandler}
                                   disabled={disabledInfo}
                                   purchasable={this.state.purchasable}
                                   updatePurchaseState={this.updatePurchaseState}
                                   checkInHandler={this.checkInHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    totalPrice={this.state.totalPrice} modalClosed={this.checkInCancelHandler}
                    checkOutHandler={this.checkOutHandler}/>
            );
        }
        ;

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        ;

        return (
            <Aux>
                <Modal show={this.state.checkIn} modalClosed={this.checkInCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));