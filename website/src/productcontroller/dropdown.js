import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import './dropdown.css'

class ProductDropdown extends React.Component{
    render(){
        return (
            <MDBDropdown className='dropDownMain'>
              <MDBDropdownToggle caret color="indigo" className='toggle'>
              {this.props.currentSort}
              </MDBDropdownToggle>
              <MDBDropdownMenu basic className='menu'>
                <MDBDropdownItem onClick={() => this.props.handleClickDropDown('Sort by popularity')}>Sort by popularity</MDBDropdownItem>
                <MDBDropdownItem onClick={() => this.props.handleClickDropDown('Sort by latest')}>Sort by latest</MDBDropdownItem>
                <MDBDropdownItem onClick={() => this.props.handleClickDropDown('Sort by price : low to high')}>Sort by price : low to high</MDBDropdownItem>
                <MDBDropdownItem onClick={() => this.props.handleClickDropDown('Sort by price : high to low')}>Sort by price : high to low</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          );
    }
}
  

export default ProductDropdown;