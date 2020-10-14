import React from 'react'
import DataContext from '../helper/datacontext';
import ProductTreeView from '../producttreeview/producttreeview';
import ProductView from '../productview/productview';

class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            activeView: 'all',
            currentSort: 'popularity',
            currentView: 'all',
            currentPage: 1,
            totalPage: 1
        }
        this.handleTreeViewClick = this.handleTreeViewClick.bind(this);
        this.handleClickDropDown = this.handleClickDropDown.bind(this);
        this.handleViewNumChange = this.handleViewNumChange.bind(this);
        this.currentPageChangeHandler = this.currentPageChangeHandler.bind(this);
    }

    handleClickDropDown(event) {
        this.setState({ currentSort: event.target.value, currentPage: 1 });
    }

    handleViewNumChange(event) {
        let productList = this.getProductList(this.context.product);
        let productsCount = productList.length;
        let calculatedtotalPage
        if (event.target.value === 'all') {
            calculatedtotalPage = 1;
        }
        else {
            calculatedtotalPage = Math.ceil(productsCount / Number(event.target.value));
        }

        this.setState({
            currentView: event.target.value,
            totalPage: calculatedtotalPage,
            currentPage: 1
        })
    }

    currentPageChangeHandler(value) {
        this.setState({ currentPage: value })
    }

    componentDidMount(){
        if(this.context.activeProductView){
            this.setState({
                activeView : this.context.activeProductView
            })
        }
    }


    static contextType = DataContext;
    render() {
        let product = this.context.product;
        return (
            <div>
                <ProductTreeView activeView={this.state.activeView} onTreeViewClick={this.handleTreeViewClick}></ProductTreeView>
                <ProductView activeView={this.state.activeView} onTreeViewClick={this.handleTreeViewClick} currentView={this.state.currentView} products={this.getProductList(product)} onCurrentPageChange={this.currentPageChangeHandler} currentPage={this.state.currentPage} totalPage={this.state.totalPage} currentSort={this.state.currentSort} handleClick={this.handleClickDropDown} handleViewChange={this.handleViewNumChange}></ProductView>
            </div>
        )
    }

    handleTreeViewClick(value) {
        let product = this.context.product;
        var productList;
        let calculatedtotalPage
        if (value === 'all') {
            productList = product.ProductDetails.map((item, index) => {
                return item.subproducts
            })
            productList = productList.flat();
            
            if (this.state.currentView === 'all') {
                calculatedtotalPage = 1;
            }
            else {
                calculatedtotalPage = Math.ceil(productList.length / Number(this.state.currentView));
            }
        }
        else {
            if (product && product.ProductDetails) {
                productList = product.ProductDetails.filter((item) => {
                    return (item.mainproduct === value)
                })
            }

            if (productList && productList[0]) {
                if (this.state.currentView === 'all') {
                    calculatedtotalPage = 1;
                }
                else {
                    calculatedtotalPage = Math.ceil(productList[0].subproducts.length / Number(this.state.currentView));
                }
            }
        }
        this.setState({
            activeView: value,
            totalPage: calculatedtotalPage,
            currentPage: 1
        })
    }

    getProductList(product) {
        var productList = [];
        if (product && product.ProductDetails) {
            productList = product.ProductDetails.map((item, index) => {
                item.subproducts.forEach(element => {
                    if (element.image === '') {
                        element.image = item.mainimage
                    }
                });
                return item.subproducts
            })
            productList = productList.flat();

            if (this.state.activeView === 'all') {
                return productList;
            }
            else {
                productList = product.ProductDetails.filter((item) => {
                    return (item.mainproduct === this.state.activeView)
                })

                if (productList && productList[0]) {
                    return productList[0].subproducts
                }
            }
        }
        return productList;
    }
}
export default Product;