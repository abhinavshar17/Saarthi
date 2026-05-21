import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-4 px-[4%] justify-between bg-saarthi-ivory border-b border-saarthi-brown/20'>
        <div className='flex flex-col'>
            <h1 className='text-3xl font-display text-saarthi-dark tracking-widest uppercase leading-none'>SAARTHI</h1>
            <p className='text-saarthi-gold font-sans uppercase tracking-[0.3em] text-[10px] mt-1'>Atelier Dashboard</p>
        </div>
        <button onClick={()=>setToken('')} className='border border-saarthi-dark text-saarthi-dark hover:bg-saarthi-dark hover:text-saarthi-ivory transition-colors duration-300 px-6 py-2 rounded-none text-xs tracking-widest uppercase'>End Session</button>
    </div>
  )
}

export default Navbar