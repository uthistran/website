import React from 'react'
import './productview.css'
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from 'mdbreact';
import { numberFormat } from '../helper/formatnumber';
import ProductController from '../productcontroller/productcontroller';

class ProductView extends React.Component {

    constructor(){
        super();
        this.state = {
            currentSort : 'Sort by popularity'
        }
        this.handleClickDropDown = this.handleClickDropDown.bind(this);
    }

    objectReference = {
        "Sort by popularity" : this.getSortByPopularity,
        "Sort by latest" : this.getSortByPopularity,
        "Sort by price : low to high" : this.getSortPriceLowToHigh,
        "Sort by price : high to low" : this.getSortPriceHighToLow
    }
    handleClickDropDown(value){
        this.setState({
            currentSort : value
        })
    }

    render() {
        return (
            <div className='productView'>
                <ProductController currentSort={this.state.currentSort} handleClick={this.handleClickDropDown}></ProductController>
                {this.getProductList()}
            </div>
        )
    }

    getProductList() {
        var displayList = this.getSortedList(this.props.products);
        var element = displayList.map((product, index) => {
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

    getSortedList(products){
        return this.objectReference[this.state.currentSort](products);
    }

    getSortByPopularity(products){
        return products;
    }

    getSortPriceHighToLow(products){
        // products.sort(
        //     (a,b) => (this.getDiscountedPriceWithoutFormatting(a.price, a.discount)  > this.getDiscountedPriceWithoutFormatting(b.price, b.discount) ) ? 1 : ((this.getDiscountedPriceWithoutFormatting(b.price, b.discount) > this.getDiscountedPriceWithoutFormatting(a.price, a.discount)) ? -1 : 0)); 
        products.sort(
             (a,b) => (Number(a.price) < Number(b.price)) ? 1 : ((Number(b.price) < Number(a.price)) ? -1 : 0)); 
        return products;
    }

    getSortPriceLowToHigh(products){
        products.sort(
            (a,b) => (Number(a.price) > Number(b.price)) ? 1 : ((Number(b.price) > Number(a.price)) ? -1 : 0)); 
       return products;
    }

    getDiscountedPrice(price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        var discountedPrice = (priceinNum / 100) * discountinNum
        return numberFormat(discountedPrice.toString());
    }

    getDiscountedPriceWithoutFormatting(price, discount){
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        return (priceinNum / 100) * discountinNum
    }

    getImageSrc(value) {
        return '/images/' + value;
    }
}

export default ProductView