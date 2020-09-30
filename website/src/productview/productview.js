import React, { Suspense } from 'react'
import './productview.css'
import { MDBCard, MDBCardBody, MDBCardText, MDBBtn } from 'mdbreact';
import { numberFormat } from '../helper/formatnumber';
import ProductController from '../productcontroller/productcontroller';

class ProductView extends React.Component {

    objectReference = {
        "popularity": this.getSortByPopularity,
        "latest": this.getSortByPopularity,
        "lowtohigh": this.getSortPriceLowToHigh,
        "hightolow": this.getSortPriceHighToLow
    }
    
    render() {
        return (
            <div className='productView'>
                <ProductController onCurrentPageChange={this.props.onCurrentPageChange} currentPage={this.props.currentPage} totalPage={this.props.totalPage} currentSort={this.props.currentSort} handleClick={this.props.handleClick} handleViewChange={this.props.handleViewChange}></ProductController>
                {this.getProductList()}
            </div>
        )
    }

    getProductList() {
        var displayList = this.getSortedList(this.props.products);
        displayList = this.getProductsBasedOnViewCount(displayList);
        var element = displayList.map((product, index) => {
            return (
                <Suspense key={index}  fallback={<div>Loading...</div>}>
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
                            <div>{product.discount}</div>
                            <MDBBtn className='addBtn' gradient="blue">Add</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </Suspense>
            )
        });
        return element;
    }

    getProductsBasedOnViewCount(products) {
        let currentPage = this.props.currentPage;
        let viewCount = this.props.currentView;
        if (viewCount === 'all') {
            return products
        }
        return products.slice((currentPage - 1) * 9, (Number(this.props.currentView) * currentPage))
    }

    getSortedList(products) {
        return this.objectReference[this.props.currentSort](products);
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