import React, {Component} from "react";
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import Spiner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
       this.props.onFetchOrders(this.props.token);
    }

    render() {

        let orders = (
            <Spiner/>
        );

        if (!this.props.loading) {
            orders = this.props.orders.map((item, index) => (
                    <Order key={item.id} orderData={this.props.orders[index]}/>
                )
            )
        }

        return (
            <div>
                {orders}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: ( token ) => dispatch(actions.fetchOrders( token )),
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler(Orders, axios));