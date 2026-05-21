import React from 'react'
import { motion } from 'framer-motion'

const Marquee = () => {
  return (
    <div className='w-full overflow-hidden bg-saarthi-dark py-4 border-y border-saarthi-gold/30 flex items-center'>
      <motion.div 
        className='flex whitespace-nowrap'
        animate={{ x: [0, -1035] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* Repeat the text multiple times to create a seamless infinite scroll effect */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className='flex items-center mx-4'>
            <span className='text-saarthi-cream font-sans tracking-[0.3em] uppercase text-xs sm:text-sm mx-4'>Handcrafted in India</span>
            <span className='text-saarthi-gold text-lg mx-4'>✦</span>
            <span className='text-saarthi-cream font-sans tracking-[0.3em] uppercase text-xs sm:text-sm mx-4'>Empowering Women Artisans</span>
            <span className='text-saarthi-gold text-lg mx-4'>✦</span>
            <span className='text-saarthi-cream font-sans tracking-[0.3em] uppercase text-xs sm:text-sm mx-4'>Sustainable Luxury Fashion</span>
            <span className='text-saarthi-gold text-lg mx-4'>✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Marquee
