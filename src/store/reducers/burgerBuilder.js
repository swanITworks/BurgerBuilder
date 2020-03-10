import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    fetchIngredientsError: false,
    building: false
};

const PRICE_LIST = {
    salad: 0.5,
    bacon: 0.8,
    cheese: 0.7,
    meat: 1,
};

const addIngredients = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + PRICE_LIST[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + PRICE_LIST[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedSt);
};

const setIngredients = ( state, action ) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        fetchIngredientsError: false,
        totalPrice: 4,
        building: false
    });
};

const fetchIngredients = ( state, action ) => {
    return updateObject(state, {error: true});
};


const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredients( state, action );
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients( state, action );
        case actionTypes.SET_INGREDIENTS: return setIngredients( state, action );
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredients( state, action );
        default:
            return state
    }
};

export default burgerBuilder