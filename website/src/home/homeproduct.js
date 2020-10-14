import { MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import React from 'react'
import './home.css'

class HomeProduct extends React.Component {
    render() {
        let product = this.props.product;
        return (
            <MDBCard md="3" className="homeCard">
                <MDBCardBody>
                    <MDBCardText className='mainName'>
                        {product.mainproduct}
                    </MDBCardText>
                    <div className='mainImage'>
                        <img alt={product.mainproduct} src={this.getImageSrc(product.mainimage)} />
                    </div>
                </MDBCardBody>
            </MDBCard>
        )
    }

    getImageSrc(path){
        return '/images/' + path;
    }
}

export default HomeProduct;