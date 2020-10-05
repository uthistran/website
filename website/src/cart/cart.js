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
        this.toggle = this.toggle.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
    }

    onRemoveClick(event, name){
        var cartData = this.props.data;
        let cartCount = 0;
        if (cartData) {
            cartCount = this.sum(cartData, 'count');
        }
        if(cartCount <=1 ){
            this.toggle()
        }
        this.props.onRemoveClick(event, name)
    }

    toggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    sum(arr, key) {
        return arr.reduce((a, b) => a + (b[key] || 0), 0);
    }

    render() {
        var cartData = this.props.data;
        let cartCount = 0;
        if (cartData) {
            cartCount = this.sum(cartData, 'count');
        }
        var element = null;
        if (cartCount > 0) {
            element = <div><div className='cartIcon' onClick={this.toggle}>
                <i className="fas fa-shopping-cart"></i>
                <MDBBadge className='cartIconBadge' color="red" pill>{cartCount}</MDBBadge>
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
                            <img src={this.getImagePath(element.image)} alt={element.name}></img> </div>
                        <label className='cartItemPrice'>{this.getDiscountedPrice(element.price, element.discount)}</label>
                        <div className='cartItemCount'>
                            <i className="fa fa-minus-circle" aria-hidden="true" onClick={(e) => this.props.onClickMinus(e, element.name)}></i>
                            <input value={element.count} onChange={(e) => this.onCountChange(e, [index, element.count])}></input>
                            <i className="fa fa-plus-circle" aria-hidden="true" onClick={(e) => this.props.onClickAdd(e, element.name)}></i>
                            <span className='removeElement' onClick={(e) => this.onRemoveClick(e, element.name)}>Remove</span>
                        </div>
                        <label className='cartItemPriceOnQ'>{this.getTotalPriceofEachItem(element.count, element.price, element.discount)}</label>
                    </div>
                )
            })
        )
    }

    getImagePath(image) {
        return '/images/' + image;
    }

    getDiscountedPrice(price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        var discountedPrice = (priceinNum / 100) * discountinNum
        return numberFormat(discountedPrice.toString());
    }

    getTotalPriceofEachItem(count, price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        var discountedPrice = (priceinNum / 100) * discountinNum
        return numberFormat((discountedPrice * count).toString());
    }
}

export default Cart;