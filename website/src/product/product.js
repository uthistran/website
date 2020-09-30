import React from 'react'
import DataContext from '../helper/datacontext';
import ProductTreeView from '../producttreeview/producttreeview';
import ProductView from '../productview/productview';

class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            productviewlist: [],
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
        let productsCount = this.state.productviewlist.length;
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


    static contextType = DataContext;
    render() {
        return (
            <div>
                <ProductTreeView activeView={this.state.activeView} onTreeViewClick={this.handleTreeViewClick}></ProductTreeView>
                <ProductView currentView={this.state.currentView} products={this.state.productviewlist} onCurrentPageChange={this.currentPageChangeHandler} currentPage={this.state.currentPage} totalPage={this.state.totalPage} currentSort={this.state.currentSort} handleClick={this.handleClickDropDown} handleViewChange={this.handleViewNumChange}></ProductView>
            </div>
        )
    }

    handleTreeViewClick(value) {
        if (value === 'all') {
            this.loadAllSubProducts();
        }
        else {
            let product = this.context.product;
            var productList;
            if (product && product.ProductDetails) {
                productList = product.ProductDetails.filter((item) => {
                    return (item.mainproduct === value)
                })
            }

            if (productList && productList[0]) {
                let calculatedtotalPage
                if (this.state.currentView === 'all') {
                    calculatedtotalPage = 1;
                }
                else {
                    calculatedtotalPage = Math.ceil(productList[0].subproducts.length / Number(this.state.currentView));
                }
                this.setState({
                    productviewlist: productList[0].subproducts,
                    activeView: value,
                    totalPage: calculatedtotalPage,
                    currentPage: 1
                })
            }
        }
    }

    componentDidMount() {
        this.loadAllSubProducts();
    }

    loadAllSubProducts() {
        let product = this.context.product;
        var productList;
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
            let calculatedtotalPage
            if (this.state.currentView === 'all') {
                calculatedtotalPage = 1;
            }
            else {
                calculatedtotalPage = Math.ceil(productList.length / Number(this.state.currentView));
            }
            this.setState({
                productviewlist: productList,
                activeView: 'all',
                totalPage: calculatedtotalPage,
                currentPage: 1
            })
        }
    }
}
export default Product;