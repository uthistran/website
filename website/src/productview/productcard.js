import React from 'react'
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from 'mdbreact';
import { numberFormat } from '../helper/formatnumber';

class ProductCard extends React.Component {
    render() {
        let product = this.props.product;
        return (
            <MDBCard md="3" className="productViewCard">
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
                    <div className='discountImage'>
                        <div className='discountImageHolder'>
                            <img alt='discount' src='/images/star.png'>

                            </img>
                            <div className='discountText'>{product.discount}</div>
                        </div>

                    </div>
                    <MDBBtn className='addBtn' gradient="blue">Add to Enquire</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        )
    }

    getImageSrc(value) {
        return '/images/' + value;
    }

    getDiscountedPrice(price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        var discountedPrice = (priceinNum / 100) * discountinNum
        return numberFormat(discountedPrice.toString());
    }
}

export default ProductCard