import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Blog from './pages/Blog'

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/blog/:id' element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
