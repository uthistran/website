import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import DataContext from '../helper/datacontext';
import './menubar.css'

class MenuBar extends React.Component {

    constructor() {
        super();
        this.state = {
            activeLink: 'Home'
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    static contextType = DataContext;

    pathmapping = {
        "/": "Home",
        "/about": "About",
        "/product": "Product",
        "/contact": "Contact"
    }

    componentDidMount() {
        this.getActiveLinkOnRefresh(this.props.location.pathname);
    }

    getActiveLinkOnRefresh(pathname) {
        this.setState({
            activeLink: this.pathmapping[pathname]
        })
    }

    handleMenuClick(id) {
        this.setState({
            activeLink: id
        })
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
                </div>
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

export default withRouter(MenuBar);