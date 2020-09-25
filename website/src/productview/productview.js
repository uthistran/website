import React from 'react'
import './productview.css'
import { MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';

class ProductView extends React.Component {
    render() {
        return (
            <div className='productView'>
                {this.getProductList()}
            </div>
        )
    }

    getProductList() {
        
        var element =  this.props.products.map((product, index) => {
            return (
                <MDBCard  md="3" key={index} className="productViewCard">
                    <MDBCardBody>
                        <MDBCardText>
                            {product.name}
                        </MDBCardText>
                        <div>{product.price}</div>
                        <div>{product.discount}</div>
                    </MDBCardBody>
                </MDBCard>
            )
        })
       

        return element;
    }
}

export default ProductView