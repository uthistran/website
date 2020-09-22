import React from 'react'
import { Link } from 'react-router-dom'
import './menubar.css'

class MenuBar extends React.Component {

    constructor() {
        super();
        this.state = {
            activeLink: 'Home'
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick(id) {
        this.setState({
            activeLink: id
        })
    }

    render() {
        return (
            <div className='menumain'>
                <div className='logo'></div>
                <div className='routing'>
                    <ul>
                        <li onClick={() => this.handleMenuClick('Home')} className={this.state.activeLink === 'Home' ? 'active' : ''}>
                            <Link className="noselect" to='/'>Home</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('About')} className={this.state.activeLink === 'About' ? 'active' : ''}>
                            <Link className="noselect" to='/about'>About Us</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('Product')} className={this.state.activeLink === 'Product' ? 'active' : ''}>
                            <Link className="noselect" to='/product'>Product</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('Contact')} className={this.state.activeLink === 'Contact' ? 'active' : ''}>
                            <Link className="noselect" to='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuBar;