import React from 'react'

// withRouter provides routing props to child
// components of the components that gets Routed
// if we wrap the export with it.
// import { withRouter } from 'react-router-dom'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} /> 
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, [])

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

// withRouter provides routing props to child
// components of the components that gets Routed
// if we wrap the export with it.
// export default withRouter(burger)

export default burger