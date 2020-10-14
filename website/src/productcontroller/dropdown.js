import React from "react";
import './dropdown.css'

class ProductDropdown extends React.Component {
  render() {
    return (
      <label>
        <span className='dropdownlabel'> Sort By:</span>
        <select className='customDropdown' value={this.props.currentSort} onChange={this.props.handleClickDropDown}>
          <option value="popularity">Popularity</option>
          <option value="latest">Latest</option>
          <option value="lowtohigh">Price : low to high</option>
          <option value="hightolow">Price : high to low</option>
        </select>
      </label>

    );
  }
}


export default ProductDropdown;