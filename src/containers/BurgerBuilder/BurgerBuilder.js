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

        const changeIngredientsHandler = (ingredient, operation) => {
            let newState = [...Object.entries(this.state.ingredients)];
            const foundElementToChange = (newState.find(item => item[0] === ingredient));

            if (operation === 'add') {
                foundElementToChange[1] += 1;
            };

            if (operation === 'subs') {
                if (foundElementToChange[1] > 0) {
                    foundElementToChange[1] -= 1;
                }
            };

            let ingredients = {};
            for (let i = 0; i < newState.length; i++) {
                ingredients[newState[i][0]] = newState[i][1];
            }
            this.setState({ingredients});
        };

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredients={this.state.ingredients}
                               changeIngredientsHandler={changeIngredientsHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;