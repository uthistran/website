import React from 'react'
import DataContext from '../helper/datacontext';
import ProductTreeView from '../producttreeview/producttreeview';
import ProductView from '../productview/productview';

class Product extends React.Component {
    constructor(){
        super();
        this.state = {
            productviewlist : []
        }
    }
    static contextType = DataContext;
    render() {
        return (
            <div>
                <ProductTreeView></ProductTreeView>
                <ProductView products={this.state.productviewlist}></ProductView>
            </div>
        )
    }

    componentDidMount(){
        let product = this.context.product;
        var productList;
        if(product && product.ProductDetails){
            productList = product.ProductDetails.map((product, index) => {
                return product.subproducts
            })
        }
        productList = productList.flat();
        this.setState({
            productviewlist : productList
        })
    }
}
export default Product;