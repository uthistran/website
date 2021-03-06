import React from 'react'
import DataContext from '../helper/datacontext';
import HomeProduct from './homeproduct';
import './home.css'

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            randomArray: []
        }
        this.handleCardClick = this.handleCardClick.bind(this);
    }
    handleCardClick(value) {
        this.context.updateActiveProductView(value);
    }
    static contextType = DataContext;
    render() {
        let products = this.context.product;
        return (
            <div className='home'>
                <video id='vid' width="100%" height="100%" autoPlay loop muted playsInline>
                    <source src={"https://cdn.glitch.com/9c6632f8-26c9-40c9-aad2-278ed150319f%2FFirework%20-%2032826%20(1).mp4?v=1603147567502"} type="video/mp4"></source>
                </video>
                <div className='brands'>
                    <div className='brandHead'>Brands</div>
                    <div className='brand1'>Varshini</div>
                    <div className='brand2'>RSR</div>
                    <div className='brand3'>Fly Brands</div>
                </div>
                <div className='cards'>
                    {this.getMainProducts(products.ProductDetails)}
                </div>
            </div>
        )
    }

    componentDidMount() {
        let element = [];
        for (let i = 0; i < 6; i++) {
            let randomNum = this.randomIntFromInterval(0, 10);
            if (element.indexOf(randomNum) < 0)
                element.push(randomNum)
        }
        this.setState({
            randomArray: element
        })
    }

    getMainProducts(products) {
        let obj = [];
        if (products) {
            this.state.randomArray.forEach((value, index) => {
                if (products[value]) {
                    obj.push(<HomeProduct handleCardClick={this.handleCardClick} key={index} product={products[value]}></HomeProduct>);
                }
            })
        }
        return obj
    }

    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
export default Home;