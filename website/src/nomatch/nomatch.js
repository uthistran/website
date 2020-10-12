import React from 'react'
import './nomatch.css'

class NoMatch extends React.Component{
    render(){
        return(
            <div className='noMatch'>
                <i className="fas fa-exclamation-triangle"></i>
                Sorry! Page Not Available
            </div>
        )
    }
}

export default NoMatch