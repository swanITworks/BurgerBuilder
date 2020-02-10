import React, {Component} from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";

const PRICE_LIST = {
    salad: 0.5,
    bacon: 0.8,
    cheese: 0.7,
    meat: 1,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        checkIn: false,
    };

    updatePurchaseState = () => {
        const ingredients = {
            ...this.state.ingredients
        };
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, element,) => {
                return sum + element
            }, 0);
        this.setState({purchasable: sum > 0})
    };

    changeIngredientsHandler = (ingredient, operation) => {
        let newState = [...Object.entries(this.state.ingredients)];
        const foundElementToChange = (newState.find(item => item[0] === ingredient));

        if (operation === 'add') {
            foundElementToChange[1] += 1;
        }

        if (operation === 'subs') {
            if (foundElementToChange[1] > 0) {
                foundElementToChange[1] -= 1;
            }
        }

        let newIngredients = {};
        for (let i = 0; i < newState.length; i++) {
            newIngredients[newState[i][0]] = newState[i][1];
        }

        this.setState({ingredients: newIngredients}, () => {
            const newTotalPrice = [...Object.entries(this.state.ingredients)]
                .reduce((acc, curr, index) => acc + (PRICE_LIST[curr[0]] * curr[1]), 4);
            this.setState({totalPrice: newTotalPrice}, this.updatePurchaseState);
        });
    };

    checkInHandler = () => {
        this.setState({checkIn:true})
    };

    checkInCancelHandler = () => {
        this.setState({checkIn:false})
    };

    checkOutHandler = () => {
        // console.log('zamowione')
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name:'Michal Swan',
                address: {
                    street: 'Szybownikow 4',
                    zipCode: '64-920',
                    country: 'Poland',
                },
                email:'rysiek@gruby.pl',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json',order)
            .then(response => {
                console.log(response)
            })
            .catch(errors => {
                console.log(errors)
            })

    };

    render() {

        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.checkIn} modalClosed={this.checkInCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice} modalClosed={this.checkInCancelHandler}
                        checkOutHandler={this.checkOutHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredients={this.state.ingredients}
                               totalPrice={this.state.totalPrice}
                               changeIngredientsHandler={this.changeIngredientsHandler}
                               disabled={disabledInfo}
                               purchasable={this.state.purchasable}
                               updatePurchaseState={this.updatePurchaseState}
                               checkInHandler={this.checkInHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;