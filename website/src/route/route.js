import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MenuBar from '../menubar/menubar';

class Routing extends React.Component {

    Home = lazy(() => import('../home/home'));
    About = lazy(() => import('../about/about')); 
    Product = lazy(() => import('../product/product'));
    Contact = lazy(() => import('../contactus/contactus'));

    render() {
        return (
            <Router>
                <MenuBar></MenuBar>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={this.Home} pattern='/' />
                        <Route path="/about" component={this.About} pattern='/about' />
                        <Route path="/product" component={this.Product} pattern='/product' />
                        <Route path="/contact" component={this.Contact} pattern='/contact' />
                    </Switch>
                </Suspense>
            </Router>
        )
    }
}

export default Routing;