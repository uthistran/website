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
        let normalClass = "d-flex justify-content-between align-items-center productTreeItem";
        let activeClass = "d-flex justify-content-between align-items-center productTreeItem selected"
        let totalsubproducts = 0;
        if (productDetails) {
            element = productDetails.map((product, index) => {
                totalsubproducts += product.subproducts.length;
                return (
                    <MDBListGroupItem onClick={() => this.props.onTreeViewClick(product.mainproduct)} key={index} className={product.mainproduct === this.props.activeView ? activeClass : normalClass}>
                        {product.mainproduct}
                        <MDBBadge className='productTreeBadge' color="gray-dark" pill>{product.subproducts.length}</MDBBadge>
                    </MDBListGroupItem>
                )
            })
            if (totalsubproducts > 0) {
                let all = <MDBListGroupItem key='alllist' onClick={() => this.props.onTreeViewClick('all')} className={this.props.activeView === 'all' ? activeClass : normalClass}>
                    Show All
                    <MDBBadge className='productTreeBadge' color="gray-dark" pill>{totalsubproducts}</MDBBadge>
                </MDBListGroupItem>

                element.splice(0, 0, all)
            }


        }
        return element
    }
}

export default ProductTreeView;