import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpStep, setOtpStep] = useState(false) // for Sign Up flow

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          if (!otpStep) {
            // Step 1: initiate registration and send OTP
            const response = await axios.post(backendUrl + '/api/user/register-init',{name,email,password})
            if (response.data.success) {
              setOtpStep(true)
              toast.success('OTP sent to your email')
            } else {
              toast.error(response.data.message)
            }
          } else {
            // Step 2: verify OTP
            const response = await axios.post(backendUrl + '/api/user/verify-otp',{email, otp})
            if (response.data.success) {
              setToken(response.data.token)
              localStorage.setItem('token',response.data.token)
            } else {
              toast.error(response.data.message)
            }
          }
        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}{currentState==='Sign Up' && otpStep ? ' - Verify' : ''}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        { currentState === 'Login' ? (
          <>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
            <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
          </>
        ) : (
          !otpStep ? (
            <>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
              <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
            </>
          ) : (
            <>
              <p className='text-sm text-gray-600 w-full'>Enter the 6-digit code sent to <b>{email}</b></p>
              <input onChange={(e)=>setOtp(e.target.value)} value={otp} type="text" inputMode='numeric' pattern='[0-9]*' maxLength={6} className='w-full px-3 py-2 border border-gray-800 tracking-widest text-center' placeholder='______' required/>
              <button type='button' onClick={async ()=>{
                try {
                  const response = await axios.post(backendUrl + '/api/user/register-init',{name,email,password})
                  if (response.data.success) toast.success('OTP resent'); else toast.error(response.data.message)
                } catch (e) { toast.error('Failed to resend OTP') }
              }} className='text-sm text-blue-600 underline self-end'>Resend code</button>
            </>
          )
        )}
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className=' cursor-pointer'>Forgot your password?</p>
            {
              currentState === 'Login' 
              ? <p onClick={()=>{setCurrentState('Sign Up'); setOtpStep(false)}} className=' cursor-pointer'>Create account</p>
              : (!otpStep ? <p onClick={()=>setCurrentState('Login')} className=' cursor-pointer'>Login Here</p> : <span />)
            }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>
          {currentState === 'Login' ? 'Sign In' : (otpStep ? 'Verify OTP' : 'Sign Up')}
        </button>
    </form>
  )
}

export default Login
