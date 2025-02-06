import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
    return (
        <div className='menu-container'>
            <Link to="/">iSpotify</Link>
            <Link to="/">Artistas</Link>
            <Link to="/MinhasCurtidas">Música Curtidas</Link>
            <a id='logout'>Logout</a>
        </div>
    )
}

export default Menu