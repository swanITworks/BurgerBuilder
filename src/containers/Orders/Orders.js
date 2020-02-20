import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import Spiner from '../../components/UI/Spinner/Spinner';
import {unmountComponentAtNode} from "react-dom";

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res =>{

                const orders = [];
                for (let key in res.data ) {
                    orders.push(res.data[key])
                }
                this.setState({loading: false, orders:[...orders]});
                console.log(orders);
            })
            .catch(error=>{
                console.log(error);
                this.setState({loading: false});
            })
    }

    render() {

        let orders = (
            <Spiner/>
        );

        if (!this.state.loading) {
            orders = this.state.orders.map((item,index) => <Order key={index} orderData={this.state.orders[index]}/>)
        }

        return (
            <div>
               {orders}
            </div>

        )
    }
}

export default Orders;