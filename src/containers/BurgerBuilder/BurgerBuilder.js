import React, {Component} from "react";
import {connect} from 'react-redux';

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        checkIn: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    };

    updatePurchaseState = () => {
        const ingredients = {
            ...this.props.ings
        };
        const sum = (
            Object.keys(ingredients)
                .map(igKey => ingredients[igKey])
                .reduce((sum, element,) => {
                    return sum + element
                }, 0)
        );
        return sum > 0
    };

    checkInHandler = () => {
        if (this.props.isAuth) {
            this.setState({checkIn: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    checkInCancelHandler = () => {
        this.props.onInitPurchase();
        this.setState({checkIn: false})
    };

    checkOutHandler = () => {
            this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredients={this.props.ings}
                                   totalPrice={this.props.totPrice}
                                   ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemoved={this.props.onIngredientRemoved}
                                   changeIngredientsHandler={this.changeIngredientsHandler}
                                   disabled={disabledInfo}
                                   purchasable={this.updatePurchaseState()}
                                   updatePurchaseState={this.updatePurchaseState}
                                   isAuth={this.props.isAuth}
                                   checkInHandler={this.checkInHandler}/>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    totalPrice={this.props.totPrice} modalClosed={this.checkInCancelHandler}
                    checkOutHandler={this.checkOutHandler}/>
            );
        }

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
        ings: state.burgerBuilder.ingredients,
        totPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.fetchIngredientsError,
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: ( path ) => dispatch(actions.setAuthRedirectPath( path )),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));