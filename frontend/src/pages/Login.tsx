import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SigninInput } from '@aman.dev/common'
import axios from 'axios'
import BACKEND_URL from '../config'

function Login() {
  const [userData, setUserData] = useState<SigninInput>({
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
    <div className='h-[100vh] w-full flex items-center justify-center'>
      <div className='text-secondary w-[350px] rounded-lg border border-border'>
        <div className='p-5 flex flex-col gap-2 items-center'>
          <h1 className='text-2xl font-bold'>Sign In</h1>
          <p className=' text-gray-400'>Enter your credentials to access your account</p>
        </div>
        <div className='p-5 pt-0'>
          
            <div className='flex flex-col gap-3'>
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
                const response = await axios.post(`${BACKEND_URL}/user/signin`, userData)
                localStorage.setItem("token", response.data.token)
                navigate("/home")
              }} 
              className='text-sm font-medium bg-secondary text-primary h-10 rounded-md hover:bg-hover'>Sign In</button>
            </div>
          
          <p className="text-center pt-2 text-sm">
          Don't have an account?
            <Link to={"/signup"} className="ml-1 underline hover:text-blue-200">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login