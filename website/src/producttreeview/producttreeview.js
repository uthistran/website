import React from 'react'
import './producttreeview.css'
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";
import DataContext from '../helper/datacontext';

class ProductTreeView extends React.Component {

    static contextType = DataContext;

    render() {
        let product = this.context.product;
        return (
            <MDBContainer className='productTreeView'>
                <MDBListGroup className='productTreeList'>
                    {
                        this.getProduct(product.ProductDetails)
                    }
                </MDBListGroup>
            </MDBContainer>
        )
    }


    getProduct(productDetails) {
        let element = null;
        if(productDetails){
            element = productDetails.map((product, index) => {
                return (
                    <MDBListGroupItem onClick={() => this.props.onTreeViewClick(product.mainproduct)} key={index} className="d-flex justify-content-between align-items-center productTreeItem">
                        {product.mainproduct}
                        <MDBBadge className='productTreeBadge' color="gray-dark" pill>{product.subproducts.length}</MDBBadge>
                    </MDBListGroupItem>
                )
            })
        }
        return element
    }
}

export default ProductTreeView;