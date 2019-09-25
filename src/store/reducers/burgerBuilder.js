import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        //this can be used to modify the order of ingredients
        ingredients: {
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
            salad: action.ingredients.salad,
        },
        totalPrice: 2,
        error: false,
        building: false
    })
}

const setIngredientsFail = (state, action) => {
    return updateObject(state, {error: true})
}

const addIngredient = (state, action) => {
    //ES6 synstax to override an object property
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const upgradedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: upgradedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    //ES6 synstax to override an object property
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const upgradedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: upgradedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState)
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.SET_INGREDIENTS_FAIL: return setIngredientsFail(state, action)
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action)
        default: return state
    }
}

export default reducer