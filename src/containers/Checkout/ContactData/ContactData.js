import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        // The default is to send out a request
        // which in turn reloads the form
        event.preventDefault()

        this.setState({loading: true})
        // Need to add .json for firebase
        const order = {
            ingredients: this.props.ingredients,
            // In a real app we would recalculate the price on the server
            price: this.props.price,
            customer: {
                name: 'Minas Pantelidakis',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '4142342',
                    country: 'Greece'
                },
                email: 'minaspantelidakis@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading:false})
            })
    }

    render() {

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>Order!</Button>
            </form>
        )

        if (this.state.loading){
            form = <Spinner/>
        }
        
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact information</h4>
                {form}
            </div>
        )
    }
}

export default ContactData