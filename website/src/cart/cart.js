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
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
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
}

export default Cart;