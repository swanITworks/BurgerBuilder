import React, {Component} from "react";

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        userName: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,

            customer: {
                name: 'Michal Swan',
                address: {
                    street: 'Szybownikow 4',
                    zipCode: '64-920',
                    country: 'Poland',
                },
                email: 'rysiek@gruby.pl',
            },
            deliveryMethod: 'fastest',
            price: this.props.price,
        };

        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(errors => {
                console.log(errors);
                this.setState({loading: false});
            })
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your name'/>
                <input className={classes.Input} type='email' name='email' placeholder='Your email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                <input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code'/>
                <Button btnType='Success' onClick={this.orderHandler}>ORDER</Button>
                <Button>CANCEL</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner/>
        }
        ;

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;



