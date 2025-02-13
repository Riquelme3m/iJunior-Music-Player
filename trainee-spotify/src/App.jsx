import { useState, useEffect } from 'react'
import './App.css'
import AppRouter from './routes/AppRouter'
import { checkLoginStatus } from './services/api'

function App() {
  return <AppRouter />
}

export default App