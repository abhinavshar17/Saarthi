import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-saarthi-dark bg-mandala-pattern bg-blend-multiply'>
        <div className='bg-saarthi-ivory shadow-2xl rounded-sm px-10 py-12 max-w-md border border-saarthi-gold/30 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saarthi-dark via-saarthi-gold to-saarthi-dark'></div>
            <div className='text-center mb-8'>
                <p className='text-saarthi-gold font-sans uppercase tracking-[0.3em] text-xs mb-2'>Saarthi</p>
                <h1 className='text-4xl font-display text-saarthi-dark tracking-wide uppercase'>Atelier</h1>
                <p className='text-saarthi-muted font-light mt-2 italic'>Executive Access</p>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className='mb-5 min-w-72'>
                    <p className='text-xs font-sans tracking-widest uppercase text-saarthi-muted mb-2'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-none w-full px-4 py-3 border border-saarthi-brown/30 outline-none bg-transparent font-light focus:border-saarthi-gold transition-colors' type="email" placeholder='director@saarthi.com' required />
                </div>
                <div className='mb-8 min-w-72'>
                    <p className='text-xs font-sans tracking-widest uppercase text-saarthi-muted mb-2'>Passcode</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-none w-full px-4 py-3 border border-saarthi-brown/30 outline-none bg-transparent font-light focus:border-saarthi-gold transition-colors' type="password" placeholder='Enter your passcode' required />
                </div>
                <button className='mt-2 w-full py-4 px-4 rounded-none text-saarthi-ivory bg-saarthi-dark hover:bg-saarthi-maroon hover:text-saarthi-gold uppercase tracking-[0.2em] text-xs transition-colors duration-300' type="submit"> Authenticate </button>
            </form>
        </div>
    </div>
  )
}

export default Login