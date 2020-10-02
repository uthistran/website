import { MDBBadge } from 'mdbreact';
import React from 'react';
import './cart.css'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { numberFormat } from '../helper/formatnumber';


class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    render() {
        var cartData = this.props.data;
        var element = null;
        if (cartData && cartData.length > 0) {
            element = <div><div className='cartIcon' onClick={this.toggle}>
                <i className="fas fa-shopping-cart"></i>
                <MDBBadge className='cartIconBadge' color="red" pill>{cartData.length}</MDBBadge>
            </div>
                <MDBModal isOpen={this.state.isModalOpen} toggle={this.toggle} fullHeight position="right" size="lg">
                    <MDBModalHeader toggle={this.toggle}>Enquire the below Products</MDBModalHeader>
                    <MDBModalBody>
                        {this.getCardDetails(cartData)}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                        <MDBBtn color="primary">Send Enquiry</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        }

        return (
            element
        )
    }

    getCardDetails(cartData) {
        return (
            cartData.map((element, index) => {
                return (
                    <div key={index} className='cartItem'>
                        <div className='cartItemName'>{element.name}</div>
                        <div className='cartItemImage'>
                            <img src={this.getImagePath(element.image)} alt ={element.name}></img> </div>
                        <label className='cartItemPrice'>{this.getDiscountedPrice(element.price, element.discount)}</label>
                    </div>
                )
            })
        )
    }

    getImagePath(image){
        return '/images/' + image;
    }

    getDiscountedPrice(price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        var discountedPrice = (priceinNum / 100) * discountinNum
        return numberFormat(discountedPrice.toString());
    }
}

export default Cart;