import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-saarthi-ivory border-r border-saarthi-brown/20'>
        <div className='flex flex-col pt-8'>

            <NavLink className='flex items-center gap-4 px-8 py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/add">
                <img className='w-4 h-4 opacity-70 grayscale' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-4 px-8 py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/list">
                <img className='w-4 h-4 opacity-70 grayscale' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-4 px-8 py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/orders">
                <img className='w-4 h-4 opacity-70 grayscale' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>

            <NavLink className='flex items-center gap-4 px-8 py-4 text-saarthi-muted hover:bg-saarthi-cream hover:text-saarthi-dark transition-colors border-r-4 border-transparent font-sans uppercase tracking-[0.2em] text-xs' to="/concerns">
                <img className='w-4 h-4 opacity-70 grayscale' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Concerns</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar