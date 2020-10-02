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
            product : {},
            cart : [],
            isFloatingMenu : false
        }
        this.onScrollHandler = this.onScrollHandler.bind(this);
    }

    onScrollHandler(event){
        let floatingMenu = false
        if(window.scrollY > 80){
            floatingMenu = true
        }
        if(this.state.isFloatingMenu !== floatingMenu){
            this.setState({
                isFloatingMenu : floatingMenu
            })
        }
    }

    handleUpdateCart(newElement) {
        let updatedArray = this.state.cart.slice();
        updatedArray.push(newElement);
        this.setState({
            cart: updatedArray
        })
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollHandler);
    }

    render() {
        return (
            <DataContext.Provider value={{ config: this.state.config, product : this.state.product, cart : this.state.cart, updateCart: this.handleUpdateCart.bind(this) }}>
                <div>
                    <HeaderComponent></HeaderComponent>
                    <Routing isFloatingMenu={this.state.isFloatingMenu}></Routing>
                    <Cart data={this.state.cart}></Cart>
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