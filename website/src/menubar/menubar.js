import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import DataContext from '../helper/datacontext';
import './menubar.css'

class MenuBar extends React.Component {

    constructor() {
        super();
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    static contextType = DataContext;

    handleMenuClick(id) {
        this.context.updateNavMenu()
    }

    render() {
        let mainClass = 'menumain';
        if(this.context.isNavSideMenuOpen){
            mainClass = 'menumain navOpen'
        }
        let enableFloatingMenu = this.props.isFloatingMenu;
        return (
            <div className={mainClass}>
                <div className='logo'>
                    <img src='/images/logo.png' alt='logo'></img>
                    <div className='closeBtn' onClick={this.context.updateNavMenu}> 
                        <i className="fas fa-times"></i>
                    </div>
                </div>
                <div className='routing'>
                    <ul>
                        <li onClick={() => this.handleMenuClick('Home')} className={this.props.location.pathname === '/' ? 'active' : ''}>
                            <Link className="noselect" to='/'>Home</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('About')} className={this.props.location.pathname === '/catalog' ? 'active' : ''}>
                            <Link className="noselect" to='/catalog'>Catalog</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('Product')} className={this.props.location.pathname === '/product' ? 'active' : ''}>
                            <Link className="noselect" to='/product'>Product</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('Contact')} className={this.props.location.pathname === '/contact' ? 'active' : ''}>
                            <Link className="noselect" to='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                {enableFloatingMenu ? this.getFloatingMenu() : null}
            </div>
        )
    }

    getFloatingMenu() {
        return (
            <div className='floatingMenu'>
                <div className='logo'>
                    <img src='/images/logo.png' alt='logo'></img>
                </div>
                <div className='routing'>
                    <ul>
                        <li onClick={() => this.handleMenuClick('Home')} className={this.props.location.pathname === '/' ? 'active' : ''}>
                            <Link className="noselect" to='/'>Home</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('About')} className={this.props.location.pathname === '/catalog' ? 'active' : ''}>
                            <Link className="noselect" to='/catalog'>Catalog</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('Product')} className={this.props.location.pathname === '/product' ? 'active' : ''}>
                            <Link className="noselect" to='/product'>Product</Link>
                        </li>
                        <li onClick={() => this.handleMenuClick('Contact')} className={this.props.location.pathname === '/contact' ? 'active' : ''}>
                            <Link className="noselect" to='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(MenuBar);