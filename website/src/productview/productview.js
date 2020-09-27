import React from 'react'
import './productview.css'
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from 'mdbreact';
import { numberFormat } from '../helper/formatnumber';
import ProductController from '../productcontroller/productcontroller';

class ProductView extends React.Component {

    constructor() {
        super();
        this.state = {
            currentSort: 'popularity',
            currentView: 'all',
            currentPage: 1
        }
        this.handleClickDropDown = this.handleClickDropDown.bind(this);
        this.handleViewNumChange = this.handleViewNumChange.bind(this);
    }

    objectReference = {
        "popularity": this.getSortByPopularity,
        "latest": this.getSortByPopularity,
        "lowtohigh": this.getSortPriceLowToHigh,
        "hightolow": this.getSortPriceHighToLow
    }
    handleClickDropDown(event) {
        this.setState({ currentSort: event.target.value });
    }

    handleViewNumChange(event) {
        this.setState({ currentView: event.target.value })
    }

    render() {
        return (
            <div className='productView'>
                <ProductController currentSort={this.state.currentSort} handleClick={this.handleClickDropDown} handleViewChange={this.handleViewNumChange}></ProductController>
                {this.getProductList()}
            </div>
        )
    }

    getProductList() {
        var displayList = this.getSortedList(this.props.products);
        displayList = this.getProductsBasedOnViewCount(displayList);
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
        });
        return element;
    }

    getProductsBasedOnViewCount(products) {
        let currentPage = this.state.currentPage;
        let viewCount = this.state.currentView;
        if (viewCount === 'all') {
            return products
        }
        return products.slice((currentPage - 1) * 9, (Number(this.state.currentView) * currentPage))
    }

    getSortedList(products) {
        return this.objectReference[this.state.currentSort](products);
    }

    getSortByPopularity(products) {
        return products;
    }

    getSortPriceHighToLow(products) {
        // products.sort(
        //     (a,b) => (this.getDiscountedPriceWithoutFormatting(a.price, a.discount)  > this.getDiscountedPriceWithoutFormatting(b.price, b.discount) ) ? 1 : ((this.getDiscountedPriceWithoutFormatting(b.price, b.discount) > this.getDiscountedPriceWithoutFormatting(a.price, a.discount)) ? -1 : 0)); 
        products.sort(
            (a, b) => (Number(a.price) < Number(b.price)) ? 1 : ((Number(b.price) < Number(a.price)) ? -1 : 0));
        return products;
    }

    getSortPriceLowToHigh(products) {
        products.sort(
            (a, b) => (Number(a.price) > Number(b.price)) ? 1 : ((Number(b.price) > Number(a.price)) ? -1 : 0));
        return products;
    }

    getDiscountedPrice(price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        var discountedPrice = (priceinNum / 100) * discountinNum
        return numberFormat(discountedPrice.toString());
    }

    getDiscountedPriceWithoutFormatting(price, discount) {
        var priceinNum = Number(price);
        var discountinNum = Number(discount.replace('%', ''))
        return (priceinNum / 100) * discountinNum
    }

    getImageSrc(value) {
        return '/images/' + value;
    }
}

export default ProductView