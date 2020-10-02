import React from 'react'
import DataContext from '../helper/datacontext';
import './mapcontainer.css'

class MapContainer extends React.Component{
    static contextType = DataContext;
    
    render(){
        return(
            <div className='mapcontainer' dangerouslySetInnerHTML={this.getiframeData()}>
            </div>
        )
    }

    getiframeData(){
        return {
            __html: '<iframe src="' + this.context.config.map +'" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
          }
    }
}

export default MapContainer