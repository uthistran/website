import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import emailjs from 'emailjs-com';
import DataContext from '../helper/datacontext';
import './enquire.css'

class Enquire extends React.Component {

    constructor() {
        super();
        this.sendMail = this.sendMail.bind(this);
        this.state = {
            messageState: null
        }
    }
    static contextType = DataContext;

    sendMail(e) {
        var templateParams = {
            'phone': document.getElementById('id_phone').value,
            'reply_to': document.getElementById('id_mail').value,
            'from_name': document.getElementById('id_name').value,
            'message': document.getElementById('id_message').value
        }
        emailjs.send('service_ui6us9w', 'template_kpmlugd', templateParams, 'user_txO0HfN3SptM4s4tZPvLf')
            .then((result) => {
                console.log(result.text); this.setState({ messageState: 'success' })
            }, (error) => {
                console.log(error.text); this.setState({ messageState: 'failure' })
            });
    }

    componentWillUnmount() {
        this.setState({
            messageState: null
        })
    }

    render() {
        let hideMessage = false;
        if (this.props.hideMessage && this.props.hideMessage === true) {
            hideMessage = true;
        }
        return (

            <MDBContainer>
                <MDBRow>
                    <MDBCol md="10">
                        <form>
                            <div className="grey-text">
                                <MDBInput id='id_name' label="Name" icon="user" group type="text" validate error="wrong"
                                    success="right" />
                                <MDBInput id='id_mail' label="E-mail" icon="envelope" group type="email" validate error="wrong"
                                    success="right" />
                                <MDBInput id='id_phone' label="Mobile Number" icon="phone" group type="phone" validate error="wrong" success="right" />
                                {!hideMessage ? <MDBInput id='id_message' type="textarea" rows="2" label="Message" icon="pencil-alt" /> : null}
                            </div>
                            {this.state.messageState == null ?
                                <div className="text-center" onClick={this.sendMail}>
                                    <MDBBtn outline color="primary">
                                        Send
                                    <MDBIcon far icon="paper-plane" className="ml-1" />
                                    </MDBBtn>
                                </div>
                                : this.getStatusMessage(this.state.messageState)}
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    getStatusMessage(value) {
        if (value === 'success') {
            return <div className='success'>
                <span><i className="fas fa-check"></i></span>
                <span>Mail Received</span></div>
        }
        return <div className='failure'>Sorry Some Problem Occured. Please mail to
                 <a href={this.getMail(this.context.config.email)}>
                <span>{this.context.config.email}</span>
            </a>
        </div>

    }
    getMail(value) {
        return "mailto:" + value;
    }
}

export default Enquire