import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

import './contactus.css'
import MapContainer from '../mapcontainer/mapcontainer';
import DataContext from '../helper/datacontext';


class ContactUs extends React.Component {
    static contextType = DataContext;
    render() {
        return (
            <div className='contactus'>
                <h2 className='header'>Contact US</h2>
                <h4>We would love to hear from you</h4>

                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="10">
                            <form>
                                <div className="grey-text">
                                    <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                                        success="right" />
                                    <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                                        success="right" />
                                    <MDBInput label="Mobile Number" icon="phone" group type="phone" validate error="wrong" success="right" />
                                    <MDBInput type="textarea" rows="2" label="Your message" icon="pencil-alt" />
                                </div>
                                <div className="text-center">
                                    <MDBBtn outline color="primary">
                                        Send
                                        <MDBIcon far icon="paper-plane" className="ml-1" />
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md='10'>
                            <MDBCard className="contactusCard">
                                <MDBCardBody>
                                    <MDBCardTitle>Location</MDBCardTitle>
                                    <MDBCardText>{this.context.config.address}</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                            <MDBCard className="contactusCard">
                                <MDBCardBody>
                                    <MDBCardTitle>Social Media</MDBCardTitle>
                                    <MDBCardText className='contactusCardText'>
                                        <a rel="noopener noreferrer" target="_blank" href={this.context.config.facebook}>
                                            <i className='fa-facebook fb'></i>
                                        </a>
                                    </MDBCardText>
                                    <MDBCardText className='contactusCardText'>
                                        <a rel="noopener noreferrer" target="_blank" href={this.context.config.twitter}>
                                            <i className='fa-twitter tw'></i>
                                        </a>
                                    </MDBCardText>
                                    <MDBCardText className='contactusCardText'>
                                        <a rel="noopener noreferrer" target="_blank" href={this.context.config.instagram}>
                                            <i className='fa-instagram insta'></i>
                                        </a>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                            <MDBCard className="contactusCard">
                                <MDBCardBody>
                                    <MDBCardTitle>Call</MDBCardTitle>
                                    <MDBCardText>
                                        <a href={this.getPhoneNumber(this.context.config.phone)}>
                                            <span className='fa fa-phone'></span>
                                            <span className='contactusPhone'>{this.context.config.phone}</span>
                                        </a>
                                    </MDBCardText>
                                    <MDBCardText>
                                        <a rel="noopener noreferrer" target="_blank" href={this.getWhatsAppNumber(this.context.config.phone)}>
                                            <i className='fa-whatsapp wa'></i>
                                            <span className='contactusPhone'>{this.context.config.phone}</span>
                                        </a>
                                    </MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MapContainer></MapContainer>
            </div>
        )
    }

    getPhoneNumber(value) {
        return "tel:" + value;
    }

    getWhatsAppNumber(value) {
        return "https://web.whatsapp.com/send?phone=" + value
    }
}
export default ContactUs;