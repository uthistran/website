import { MDBBadge } from 'mdbreact';
import React from 'react';
import './cart.css'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { numberFormat } from '../helper/formatnumber';
import Enquire from '../contactus/enquire';


class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            isEnquireClicked : false
        }
        this.toggle = this.toggle.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onEnquireClick = this.onEnquireClick.bind(this);
    }

    onEnquireClick(){
        this.setState({
            isEnquireClicked : true
        })
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
            isModalOpen: !this.state.isModalOpen,
            isEnquireClicked : false
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
                {!this.state.isEnquireClicked ? <MDBModal isOpen={this.state.isModalOpen} toggle={this.toggle} fullHeight position="right" size="lg">
                    <MDBModalHeader toggle={this.toggle}>Enquire the below Products</MDBModalHeader>
                    <MDBModalBody>
                        {this.getCardDetails(cartData)}
                        <div className='subTotal'>
                            <span>SubTotal : </span>
                            <span>{this.getSubtotal()}</span>
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Continue Shopping</MDBBtn>
                        <MDBBtn color="primary" onClick={this.onEnquireClick} >Send Enquiry</MDBBtn>
                    </MDBModalFooter>
                    
                </MDBModal> : 
                
                <MDBModal isOpen={this.state.isModalOpen} toggle={this.toggle} fullHeight position="right" size="lg">
                    <MDBModalHeader toggle={this.toggle}>Please provide below details, so that we can get back to you on your Enquiry</MDBModalHeader>
                    <Enquire className='enquirePage' hideMessage={true}></Enquire>
                </MDBModal>
                }

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

    getSubtotal(){
        let subtotal = 0;
        this.props.data.forEach(element => {
            var priceinNum = Number(element.price);
            var discountinNum = Number(element.discount.replace('%', ''))
            subtotal += (((priceinNum / 100) * discountinNum) * element.count);
        });
        return numberFormat((subtotal).toString());
    }
}

export default Cart;