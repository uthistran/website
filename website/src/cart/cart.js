import { MDBBadge } from 'mdbreact';
import React from 'react';
import './cart.css'

class Cart extends React.Component {
    render() {
        var cartData = this.props.data;
        var element = null;
        if (cartData && cartData.length > 0) {
            element = <div className='cartIcon'>
                <i className="fas fa-shopping-cart"></i>
                <MDBBadge className='cartIconBadge' color="red" pill>{cartData.length}</MDBBadge>
            </div>
        }

        return (
            element
        )
    }
}

export default Cart;