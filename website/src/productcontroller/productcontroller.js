import React from 'react'
import ProductDropdown from './dropdown'
import './productcontroller.css'

class ProductController extends React.Component {
    constructor(){
        super();
        this.input = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event){
        if (event.key === 'Enter') {
            let inputVal = Number(this.input.current.value);
            if(!isNaN(inputVal) && inputVal <= this.props.totalPage && inputVal !== 0){
                this.props.onCurrentPageChange(inputVal);
            }else{
                this.input.current.value = this.props.currentPage;
            }
          }
    }

    componentDidUpdate(){
        this.input.current.value = this.props.currentPage;
    }
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
                    <input type="text" className='currentPageInput' ref={this.input} onKeyPress={this.handleKeyPress}></input>
                    <span>&#47;</span>
                    <span className='totalPageInput'>{this.props.totalPage}</span>
                    <span><i className="fas fa-arrow-right"></i></span>
                </div>
            </div>
        )
    }
}

export default ProductController;