import { MDBBadge } from 'mdbreact';
import React from 'react';
import './cart.css'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


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

    getCardDetails(cartData){
        return(
            cartData.map((element, index) => {
                return (
                    <div>
                        
                    </div>
                )
            })
        )
    }
}

export default Cart;