/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { MapPage } from './Pages/Map'
import { HomePage } from './Pages/HomePage'
import { PageNotFound } from './Pages/PageNotFound'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='map' element={<MapPage/>}/>
				<Route path='*' element={<PageNotFound/>}/>
				</Routes>
    </BrowserRouter>
  )
}

export default App
