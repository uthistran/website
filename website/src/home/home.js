import React from 'react'
import DataContext from '../helper/datacontext';
import HomeProduct from './homeproduct';
import './home.css'

class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            randomArray : []
        }
        this.handleCardClick = this.handleCardClick.bind(this);
    }
    handleCardClick(value){
        this.context.updateActiveProductView(value);
    }
    static contextType = DataContext;
    render() {
        let products = this.context.product;
        return (
            <div className='home'>
                <video id='vid' width="100%" height="100%" autoPlay loop muted playsInline>
                    <source src={process.env.PUBLIC_URL + '/video/firework.mp4'} type="video/mp4"></source>
                </video>
                <div className='cards'>
                    {this.getMainProducts(products.ProductDetails)}
                </div>
            </div>
        )
    }

    componentDidMount(){
        let element = [];
        for(let i=0; i< 6; i++){
            let randomNum = this.randomIntFromInterval(0, 10);
            if (element.indexOf(randomNum) < 0)
                element.push(randomNum)
        }
        this.setState({
            randomArray : element
        })
    }

    getMainProducts(products){
        let obj = [];
        if(products){
            this.state.randomArray.forEach((value, index) => {
                if(products[value]){
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