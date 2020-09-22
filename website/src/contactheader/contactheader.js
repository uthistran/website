import React from 'react'
import DataContext from '../helper/datacontext'
import './contactheader.css'

class ContactHeaderComponent extends React.Component {

    static contextType = DataContext;

    render() {
        let value = this.context;
        return (
            (value && value.config) ?
                (<div className='contactHeader'>
                    <div className='location'>
                        <span className='fa fa-map-marker-alt'></span>
                        <span>{value.config.address}</span>
                    </div>
                    <div className='phone'>

                        <a href={this.evaluatePhoneNumber(value.config.phone)}>
                            <span className='fa fa-phone'></span>
                            <span>{value.config.phone}</span>
                        </a>
                    </div>
                    <div className='socialmedia'>
                        <ul>
                            <li>
                                <a rel="noopener noreferrer" target="_blank" href={value.config.facebook}>
                                    <i className='fa-facebook'></i>
                                </a>

                            </li>
                            <li>
                                <a rel="noopener noreferrer" target="_blank" href={value.config.twitter}>
                                    <i className='fa-twitter'></i>
                                </a>
                            </li>
                            <li >
                                <a rel="noopener noreferrer" target="_blank" href={value.config.instagram}>
                                    <i className='fa-instagram'></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>)
                : null
        )
    }

    evaluatePhoneNumber(number) {
        return "tel:" + number;
    }
}

export default ContactHeaderComponent