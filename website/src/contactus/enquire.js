import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

class Enquire extends React.Component {

    constructor() {
        super();
        this.sendMail = this.sendMail.bind(this);
    }

    sendMail() {

    }

    render() {
        let hideMessage = false;
        if(this.props.hideMessage && this.props.hideMessage === true){
            hideMessage = true;
        }
        return (
            
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="10">
                        <form>
                            <div className="grey-text">
                                <MDBInput label="Name" icon="user" group type="text" validate error="wrong"
                                    success="right" />
                                <MDBInput label="E-mail" icon="envelope" group type="email" validate error="wrong"
                                    success="right" />
                                <MDBInput label="Mobile Number" icon="phone" group type="phone" validate error="wrong" success="right" />
                                {!hideMessage ? <MDBInput type="textarea" rows="2" label="Message" icon="pencil-alt" /> : null}
                            </div>
                            <div className="text-center" onClick={this.sendMail}>
                                <MDBBtn outline color="primary">
                                    Send
                            <MDBIcon far icon="paper-plane" className="ml-1" />
                                </MDBBtn>
                            </div>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Enquire