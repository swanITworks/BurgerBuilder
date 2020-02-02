import React, {Component} from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 0,
            cheese: 0,
            meat: 0,
        }
    };

    render() {

        const changeIngredientsHandler = (ingredient) => {
this.setState()
        };

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredients={this.state.ingredients} />
            </Aux>
        );
    }
}

export default BurgerBuilder;