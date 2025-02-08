import './Artistas.css'
import Menu from '../../components/menu/Menu'
import ArtistCard from '../../components/artistCard/ArtistCard'

function Artistas() {

    return (
        <div className='main-container'>
            <Menu />

            <content>
                <h1 className='page-title'>Artistas</h1>
                <div className='artists-container'>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                    <ArtistCard id='Engenheiros do Hawaii'/>
                </div>
            </content>
        </div>
    )
}

export default Artistas
