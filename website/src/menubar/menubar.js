import React from 'react'
import { Link } from 'react-router-dom'
import './menubar.css'

class MenuBar extends React.Component{

    render(){
        return(
            <div className='menumain'>
                <div className='logo'></div>
                <div className='routing'>
                    <ul>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About Us</Link>
                        </li>
                        <li>
                            <Link to='/product'>Product</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuBar;