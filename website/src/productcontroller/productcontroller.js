import React from 'react'
import DataContext from '../helper/datacontext';
import ProductDropdown from './dropdown'
import './productcontroller.css'

class ProductController extends React.Component {
    constructor() {
        super();
        this.input = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }
    static contextType = DataContext;

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            let inputVal = Number(this.input.current.value);
            if (!isNaN(inputVal) && inputVal <= this.props.totalPage && inputVal !== 0) {
                this.props.onCurrentPageChange(inputVal);
            } else {
                this.input.current.value = this.props.currentPage;
            }
        }
    }

    handleProductChange(event){
        this.props.onTreeViewClick(event.target.value)
    }

    componentDidUpdate() {
        this.input.current.value = this.props.currentPage;
    }

    componentDidMount() {
        this.input.current.value = this.props.currentPage;
    }
    render() {
        let leftArrowClass = this.getLeftClassNames();
        let rightArrowClass = this.getRightClassNames();
        let product = this.context.product;
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
                <div className='productDropDown'>
                    {this.getproductDropDown(product.ProductDetails)}
                </div>
                <div className='pageNavigation'>
                    <span className={leftArrowClass} onClick={this.goToPrevious.bind(this)}>
                        <i className="fas fa-arrow-left"></i>
                    </span>
                    <input type="text" className='currentPageInput' ref={this.input} onKeyPress={this.handleKeyPress}></input>
                    <span>&#47;</span>
                    <span className='totalPageInput'>{this.props.totalPage}</span>
                    <span className={rightArrowClass} onClick={this.goToNext.bind(this)}><i className="fas fa-arrow-right"></i></span>
                </div>
            </div>
        )
    }

    getproductDropDown(productDetails) {
        let element = null;
        if (productDetails) {
            element = productDetails.map((product, index) => {
                return (
                    <option key={index} value={product.mainproduct}>{product.mainproduct}</option>
                )
            })
            let all = <option key='all' value='all'>All</option>
            element.splice(0, 0, all)

            return (
                <select className='customDropdown' value={this.props.activeView} onChange={this.handleProductChange}>
                    {element}
                </select>
            )
        }

    }

    getLeftClassNames() {
        if (this.input.current) {
            let currentpage = this.props.currentPage;
            if (currentpage > 1) {
                return "enableArrow"
            }
            else {
                return "disableArrow"
            }
        }
        return "enableArrow"
    }

    getRightClassNames() {
        if (this.props.currentPage && this.props.totalPage) {
            let currentpage = this.props.currentPage;
            if (currentpage < this.props.totalPage) {
                return "enableArrow"
            }
            else {
                return "disableArrow"
            }
        }
        return "enableArrow"
    }

    goToPrevious() {
        let inputVal = Number(this.input.current.value);
        if (inputVal > 1) {
            this.props.onCurrentPageChange(inputVal - 1);
        }
    }

    goToNext() {
        let inputVal = Number(this.input.current.value);
        if (inputVal < this.props.totalPage) {
            this.props.onCurrentPageChange(inputVal + 1);
        }
    }
}

export default ProductController;