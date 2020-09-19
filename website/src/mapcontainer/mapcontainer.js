import React from 'react'
import './mapcontainer.css'

class MapContainer extends React.Component{
    iframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4438.253074826732!2d77.79535586060139!3d9.37598668913172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06c9a9ebcceca3%3A0xc677e92f7bf17709!2sSRI%20LAXMI%20NARASHIMA%20PERUMAL%20KOVIL!5e0!3m2!1sen!2sus!4v1600477845890!5m2!1sen!2sus" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
    render(){
        return(
            <div className='mapcontainer' dangerouslySetInnerHTML={this.getiframeData()}>
            </div>
        )
    }

    getiframeData(){
        return {
            __html: this.iframe
          }
    }
}

export default MapContainer