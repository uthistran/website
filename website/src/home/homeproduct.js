import { MDBCard, MDBCardBody, MDBCardText } from 'mdbreact';
import React from 'react'
import './home.css'
import { useHistory } from "react-router-dom";

function HomeProduct(props) {
    const history = useHistory();
    let product = props.product;
    return (
        <MDBCard md="3" className="homeCard" onClick={() => handleClick(product.mainproduct)}>
            <MDBCardBody>
                <MDBCardText className='mainName'>
                    {product.mainproduct}
                </MDBCardText>
                <div className='mainImage'>
                    <img alt={product.mainproduct} src={getImageSrc(product.mainimage)} />
                </div>
            </MDBCardBody>
        </MDBCard>
    )

    function handleClick(value){
        history.push("/product");
        props.handleCardClick(value)
    }

    function getImageSrc(path){
        return '/images/' + path;
    }
}

export default HomeProduct;