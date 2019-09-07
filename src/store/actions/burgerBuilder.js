import * as actionTypes from './actionTypes'
import axios from '../../axios-orders' 

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

// Synchronous action creator to be used
// in the asynchronous action creator
// to initialize the ingredients from the server
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

// Synchronous action creator to be used
// in the asynchronous action creator
// to display an error if the ingredients fail to load
export const setIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAIL,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
                dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(setIngredientsFailed())
        })
    }
}