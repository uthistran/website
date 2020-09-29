import React from 'react'
import ProductDropdown from './dropdown'
import './productcontroller.css'

class ProductController extends React.Component {
    render() {
        return (
            <div className='productController'>
                <ProductDropdown currentSort={this.props.currentSort} handleClickDropDown={this.props.handleClick}></ProductDropdown>
                <div className='showviewDropDown'>
                    <select className='customDropdown' value={this.props.currentView} onChange={this.props.handleViewChange}>
                        <option value="all">Show All</option>
                        <option value="9">Show 9</option>
                        <option value="18">Show 18</option>
                        <option value="36">Show 36</option>
                    </select>
                </div>
                <div className='pageNavigation'>
                    <span>
                        <i className="fas fa-arrow-left"></i>
                    </span>
                    <input type="text" className='currentPageInput' value={this.props.currentPage} onChange={this.props.onCurrentPageChange}></input>
                    <span>&#47;</span>
                    <span className='totalPageInput'>{this.props.totalPage}</span>
                    <span><i className="fas fa-arrow-right"></i></span>
                </div>
            </div>
        )
    }
}

export default ProductController;