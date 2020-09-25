import React from 'react'
import './productview.css'
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from 'mdbreact';
import { numberFormat } from '../helper/formatnumber';

class ProductView extends React.Component {
    render() {
        return (
            <div className='productView'>
                {this.getProductList()}
            </div>
        )
    }

    getProductList() {

        var element = this.props.products.map((product, index) => {
            return (
                <MDBCard md="3" key={index} className="productViewCard">
                    <MDBCardBody>
                        <MDBCardText className='productName'>
                            {product.name}
                        </MDBCardText>
                        <div className='productImageHolder'>
                            <img className='productImage' alt={product.name} src={this.getImageSrc(product.image)} />
                        </div>

                        <div className='price'>
                            <span className='originalPrice'>
                                {numberFormat(product.price)}
                            </span>
                            <span className='discountedPrice'>{this.getDiscountedPrice(product.price, product.discount)}</span>
                        </div>
                        <div>{product.discount}</div>
                        <MDBBtn className='addBtn' gradient="blue">Add</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            )
        })


        return element;
    }

    getDiscountedPrice(price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        var discountedPrice = (priceinNum / 100) * discountinNum
        return numberFormat(discountedPrice.toString());
    }

    getImageSrc(value) {
        return '/images/' + value;
    }
}

export default ProductView