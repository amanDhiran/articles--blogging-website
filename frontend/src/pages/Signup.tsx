import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignupInput } from '@aman.dev/common'
import axios from 'axios'
import BACKEND_URL from '../config'

function Signup() {
  const [userData, setUserData] = useState<SignupInput>({
    name: "",
    password: "",
    email: ""
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUserData({
      ...userData,
      [name] : value
    })
  }
  return (
    <div className='flex h-screen items-center justify-center'>
    <div className='flex lg:items-center m-5 lg:m-10 lg:flex-row lg:gap-14 flex-col gap-8 justify-center'>
      <div className='text-secondary flex flex-col gap-3 lg:gap-12 '>
        <p className='text-3xl lg:text-6xl font-extrabold'>
        Write your Mind
        </p>
        <p className='text-2xl lg:text-4xl font-extrabold'>
        Join Today.
        </p>
      </div>
    
      <div className='text-secondary  rounded-lg border border-border'>
        <div className='p-5 flex flex-col gap-2 items-center'>
          <h1 className='text-2xl font-bold'>Sign Up</h1>
          <p className=' text-gray-400'>Enter your information to create an account</p>
        </div>
        <div className='p-5 pt-0'>
          
            <div className='flex flex-col gap-3'>
              <div className='flex gap-2 flex-col'>
                <label htmlFor="name" className='text-sm font-medium'>Name</label>
                <input type="text" onChange={handleChange} name='name' className='rounded-md px-3 py-2 text-sm bg-primary border border-border ' placeholder='Arya' />
              </div>
              <div className='flex gap-2 flex-col'>
                <label htmlFor="email" className='text-sm font-medium'>Email</label>
                <input type="text" onChange={handleChange} name='email' className='rounded-md px-3 py-2 text-sm bg-primary border border-border ' placeholder='aryastark@winterfell.com' />
              </div>
              <div className='flex gap-2 flex-col'>
                <label htmlFor="password" className='text-sm font-medium'>Password</label>
                <input type="password" onChange={handleChange} name='password' className='rounded-md px-3 py-2 text-sm bg-primary border border-border ' />
              </div>
              <button 
              onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/user/signup`, userData)
                localStorage.setItem("token", response.data.token)
                navigate("/home")
              }} 
              className='text-sm font-medium bg-secondary text-primary h-10 rounded-md hover:bg-hover'>Sign Up</button>
            </div>
          
          <p className="text-center pt-2 text-sm">
            Already have an account?
            <Link to={"/signin"} className="ml-1 underline hover:text-blue-200">SignIn</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Signup