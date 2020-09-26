import React from 'react'
import DataContext from '../helper/datacontext';
import ProductTreeView from '../producttreeview/producttreeview';
import ProductView from '../productview/productview';

class Product extends React.Component {
    constructor() {
        super();
        this.state = {
            productviewlist: [],
            activeView: 'all'
        }
        this.handleTreeViewClick = this.handleTreeViewClick.bind(this)
    }
    static contextType = DataContext;
    render() {
        return (
            <div>
                <ProductTreeView activeView={this.state.activeView} onTreeViewClick={this.handleTreeViewClick}></ProductTreeView>
                <ProductView products={this.state.productviewlist} ></ProductView>
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
                this.setState({
                    productviewlist: productList[0].subproducts,
                    activeView: value
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
            this.setState({
                productviewlist: productList,
                activeView: 'all'
            })
        }
    }
}
export default Product;