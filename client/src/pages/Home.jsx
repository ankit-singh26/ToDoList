import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
        <Navbar/>
        <div className="min-h-screen bg-yellow-300 text-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        Home
        </div>
    </>
  )
}

export default Home