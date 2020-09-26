import React from 'react'
import ProductDropdown from './dropdown'
import './productcontroller.css'

class ProductController extends React.Component{
    render(){
        return(
            <div className='productController'>
                <ProductDropdown currentSort={this.props.currentSort} handleClickDropDown={this.props.handleClick}></ProductDropdown>
            </div>
        )
    }
}

export default ProductController;