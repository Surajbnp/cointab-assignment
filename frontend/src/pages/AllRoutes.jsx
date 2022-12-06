import React from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from './HomePage'
import Login from './Login'

const AllRoutes = () => {
  return (
    <Routes>
        <Route  path='/' element={<HomePage />}/>
        <Route  path='/login' element={<Login />} />
    </Routes>
  )
}

export default AllRoutes