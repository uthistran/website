import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBCardHeader } from 'mdbreact';

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
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>Location</MDBCardTitle>
                                    <MDBCardText>{this.context.config.address}</MDBCardText>
                                </MDBCardBody>
                            </MDBCard>
                            <MDBCard>
                                <MDBCardHeader>
                                    test
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <MDBCardTitle>Social Media</MDBCardTitle>
                                    <MDBCardText>{this.context.config.facebook}</MDBCardText>
                                </MDBCardBody>
                                <MDBCardFooter>
                                    test
                                </MDBCardFooter>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MapContainer></MapContainer>
            </div>
        )
    }
}
export default ContactUs;