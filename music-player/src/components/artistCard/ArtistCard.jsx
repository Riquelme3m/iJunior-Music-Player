import React from 'react'
import './ArtistCard.css'

import artistImage from '../../assets/engenheiros 1.png'

const ArtistCard = ({ id }) => {
  /* faz a request do artista pelo id para pegar nome e imagem*/
  const name = 'Engenheiros do Hawaii'
  const image = artistImage

  return (
    <div className='artist-card-container' onClick={id}>
      <img src={image} alt="Artist cover"></img>
      <p>{name}</p>
      <p>Artista</p>
    </div>
  )
}

export default ArtistCard