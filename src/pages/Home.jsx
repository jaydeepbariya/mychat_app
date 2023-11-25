import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-300 relative">
      <div className="w-1/2 m-auto p-8">
        <p className='font-mukta text-[60px] font-bold text-lightBlue'>MyChat</p>
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Social Media Application</h1>
        <p className="text-gray-600">Connect with friends and share your moments.</p>
        <p className="text-green-800">Share best with friends and make them live the moment as well</p>
      </div>

      <div className="w-1/2 m-auto flex gap-8 p-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
            <Link to={"/login"}>Login</Link>
          </button>
        <div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
            <Link to={"/register"}>Register</Link>
          </button>
        </div>
      </div>

      <p className='absolute top-4 right-4 text-[150px] font-bold text-mukta opacity-25 select-none'>MyChat</p>
    </div>
  )
}

export default Home