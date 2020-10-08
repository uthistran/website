import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import './contactus.css'
import MapContainer from '../mapcontainer/mapcontainer';
import DataContext from '../helper/datacontext';
import Enquire from './enquire';

class ContactUs extends React.Component {
    static contextType = DataContext;
    
    render() {
        return (
            <div className='contactus'>
                <h2 className='header'>Contact US</h2>
                <h4>We would love to hear from you</h4>

                <Enquire></Enquire>
                <MDBContainer className='contactDetail'>
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

                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md='5'>
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
                        <MDBCol md='5'>
                            <MDBCard className="contactusCard">
                                <MDBCardBody>
                                    <MDBCardTitle>E-Mail</MDBCardTitle>
                                    <MDBCardText>
                                        <a href={this.getMail(this.context.config.email)}>
                                            <span className='fa fa-envelope'></span>
                                            <span className='contactusMail'>{this.context.config.email}</span>
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
         //"https://web.whatsapp.com/send?phone=" + value
         return "https://api.whatsapp.com/send?phone=" + value;
    }

    getMail(value) {
        return "mailto:" + value;
    }
}
export default ContactUs;