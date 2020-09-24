import React from 'react'
import ProductTreeView from '../producttreeview/producttreeview';
import ProductView from '../productview/productview';

class Product extends React.Component {
    render() {
        return (
            <div>
                <ProductTreeView></ProductTreeView>
                <ProductView></ProductView>
            </div>
        )
    }
}
export default Product;