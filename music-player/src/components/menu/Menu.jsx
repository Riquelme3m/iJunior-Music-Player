import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
    return (
        <div className='menu-container'>
            <Link to="/" className='logo'>iSpotify ®</Link>
            <div className='button-container'>
                <span class="material-symbols-outlined">album</span>
                <Link to="/" className='button-name'>Artistas</Link>
            </div>
            <div className='button-container'>
                <span class="material-symbols-outlined">favorite</span>
                <Link to="/MinhasCurtidas" className='button-name'>Músicas Curtidas</Link>
            </div>
            <div className="logout-button">
                <span class="material-symbols-outlined">logout</span>
                <a id='logout'>Logout</a>
            </div>
        </div>
    )
}

export default Menu