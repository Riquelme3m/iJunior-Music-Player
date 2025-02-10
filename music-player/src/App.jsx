import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Artistas from './pages/artistas/Artistas'
import MinhasCurtidas from './pages/minhasCurtidas/MinhasCurtidas'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Artistas />} />
          <Route path="/Curtidas" element={<MinhasCurtidas />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
