import React from 'react'
import Cart from '../cart/cart';
import HeaderComponent from '../header/header'
import DataContext from '../helper/datacontext';
import Helper from '../helper/helper';
import Routing from '../route/route';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            config: {},
            product: {},
            cart: [],
            isFloatingMenu: false,
            isNavigationSideMenuOpen : false,
            activeProductView : null
        }
        this.onScrollHandler = this.onScrollHandler.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickMinus = this.onClickMinus.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.UpdateNavSideMenu = this.UpdateNavSideMenu.bind(this);
        this.UpdateActiveProductView = this.UpdateActiveProductView.bind(this);
    }

    UpdateActiveProductView(value){
        this.setState({activeProductView : value})
    }

    UpdateNavSideMenu(){
        this.setState({
            isNavigationSideMenuOpen : !this.state.isNavigationSideMenuOpen
        })
    }

    onRemoveClick(event, name){
        let updatedArray = this.state.cart.slice();
        updatedArray = updatedArray.filter((element) => element.name !== name);
        this.setState({
            cart: updatedArray
        })
    }

    onScrollHandler(event) {
        let floatingMenu = false
        if (window.scrollY > 80) {
            floatingMenu = true
        }
        if (this.state.isFloatingMenu !== floatingMenu) {
            this.setState({
                isFloatingMenu: floatingMenu
            })
        }
    }

    onClickAdd(event, name) {
        let updatedArray = this.state.cart.slice();
        updatedArray.find((element, index) => {
            if (element.name === name) {
                updatedArray[index]['count'] += 1
                return true;
            }
            return false
        })
        this.setState({
            cart: updatedArray
        })
    }

    onClickMinus(event, name) {
        let updatedArray = this.state.cart.slice();
        updatedArray.find((element, index) => {
            if (element.name === name) {
                if(updatedArray[index]['count'] > 1){
                    updatedArray[index]['count'] -= 1
                }
                return true;
            }
            return false
        })
        this.setState({
            cart: updatedArray
        })
    }

    handleUpdateCart(newElement) {
        let updatedArray = this.state.cart.slice();
        let productAlreadyExist = false;
        updatedArray.find((element, index) => {
            if (element.name === newElement.name) {
                updatedArray[index]['count'] += 1
                productAlreadyExist = true;
                return true;
            }
            return false
        })
        if (!productAlreadyExist) {
            newElement['count'] = 1
            updatedArray.push(newElement);
        }

        this.setState({
            cart: updatedArray
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollHandler);
    }

    render() {
        return (
            <DataContext.Provider value={{ config: this.state.config, product: this.state.product, cart: this.state.cart, updateCart: this.handleUpdateCart.bind(this), isNavSideMenuOpen : this.state.isNavigationSideMenuOpen, updateNavMenu : this.UpdateNavSideMenu,
            activeProductView : this.state.activeProductView, updateActiveProductView : this.UpdateActiveProductView }}>
                <div>
                    <HeaderComponent></HeaderComponent>
                    <Routing isFloatingMenu={this.state.isFloatingMenu}></Routing>
                    <Cart data={this.state.cart} onRemoveClick={this.onRemoveClick} onClickAdd={this.onClickAdd} onClickMinus={this.onClickMinus}></Cart>
                </div>
            </DataContext.Provider>
        )
    }

    componentDidMount() {
        Helper.actionCall('config.json', this.success.bind(this), this.failure);
        Helper.actionCall('product.json', this.successProduct.bind(this), this.failure);
        window.addEventListener('scroll', this.onScrollHandler);
    }

    success(data) {
        this.setState({
            config: data
        })
    }

    successProduct(data) {
        this.setState({
            product: data
        })
    }

    failure(data) {
        console.log("actioncall failed")
    }
}

export default App;