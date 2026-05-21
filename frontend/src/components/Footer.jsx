import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-saarthi-maroon text-saarthi-ivory pt-20 pb-10 mt-32 relative overflow-hidden -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      
      {/* Background Decor */}
      <div className='absolute inset-0 opacity-[0.03] bg-mandala-pattern bg-cover bg-center pointer-events-none'></div>

      <div className='relative z-10 flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 mb-16 text-sm max-w-[1600px] mx-auto'>

        <div>
            <h2 className='font-display text-4xl sm:text-5xl text-saarthi-gold tracking-widest uppercase mb-6'>Saarthi</h2>
            <p className='w-full md:w-3/4 text-saarthi-ivory/70 font-light leading-relaxed text-base tracking-wide'>
              Preserving the heritage of Indian textiles. We empower rural women artisans by bringing their masterful embroidery and handwoven fashion to the world.
            </p>
        </div>

        <div>
            <p className='text-xl font-display text-saarthi-gold tracking-widest uppercase mb-6'>Company</p>
            <ul className='flex flex-col gap-4 text-saarthi-ivory/80 font-light tracking-wide'>
                <li className='hover:text-saarthi-gold cursor-pointer transition-colors'>Home</li>
                <li className='hover:text-saarthi-gold cursor-pointer transition-colors'>Our Story</li>
                <Link to='/heritage'><li className='hover:text-saarthi-gold cursor-pointer transition-colors'>Heritage</li></Link>
                <li className='hover:text-saarthi-gold cursor-pointer transition-colors'>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-display text-saarthi-gold tracking-widest uppercase mb-6'>Contact</p>
            <ul className='flex flex-col gap-4 text-saarthi-ivory/80 font-light tracking-wide'>
                <li className='hover:text-saarthi-gold cursor-pointer transition-colors'>+91 98765 43210</li>
                <li className='hover:text-saarthi-gold cursor-pointer transition-colors'>namaste@saarthi.com</li>
                <li className='hover:text-saarthi-gold cursor-pointer transition-colors mt-2 text-xs uppercase tracking-widest opacity-60'>Craftsmen Village, Jaipur, India</li>
            </ul>
        </div>

      </div>

      <div className='relative z-10 max-w-[1600px] mx-auto'>
          <hr className='border-saarthi-gold/20' />
          <div className='flex flex-col sm:flex-row justify-between items-center pt-8 text-xs tracking-widest uppercase text-saarthi-ivory/50 font-light'>
            <p>Copyright 2026 © Saarthi</p>
            <p className='mt-2 sm:mt-0'>Handcrafted with Pride in India</p>
          </div>
      </div>

    </footer>
  )
}

export default Footer
