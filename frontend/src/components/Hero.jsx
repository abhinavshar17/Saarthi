import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { assets } from '../assets/assets'

const Hero = () => {
  const containerRef = useRef(null)

  // Setup Framer Motion scroll hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects based on scroll position
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const threadDraw = useTransform(scrollYProgress, [0, 0.8], [400, 0]) // Dash offset

  return (
    <div ref={containerRef} className='relative w-full h-[100vh] bg-saarthi-dark overflow-hidden -mt-[85px] mb-20'>
      
      {/* Background Image - Full Bleed */}
      <motion.div 
        style={{ scale: imageScale }}
        className='absolute inset-0 z-0 origin-top'
      >
        <img 
          src="/hero_background.png" 
          alt="Indian Embroidery Textile" 
          className='w-full h-full object-cover opacity-60' 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-saarthi-dark/40 via-transparent to-saarthi-ivory"></div>
      </motion.div>

      {/* Center Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        className='relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-32'
      >
        <p className='font-sans tracking-[0.3em] text-xs sm:text-sm text-saarthi-gold uppercase mb-6'>
          Heritage & Craftsmanship
        </p>
        
        <h1 className='font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-saarthi-cream leading-[1.1] mb-8 drop-shadow-lg max-w-5xl'>
          The Thread <br/><span className='italic font-light text-saarthi-gold'>of Tradition</span>
        </h1>
        
        <p className='text-saarthi-ivory/90 text-base sm:text-lg lg:text-xl font-light mb-12 max-w-2xl leading-relaxed drop-shadow-md'>
          Experience the finest handcrafted fashion, woven with the stories and soul of Indian women artisans.
        </p>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='px-10 py-4 bg-saarthi-maroon text-saarthi-ivory font-display tracking-[0.2em] uppercase text-sm border border-saarthi-maroon hover:bg-transparent hover:border-saarthi-ivory transition-colors duration-500'
        >
          Discover The Collection
        </motion.button>
      </motion.div>

      {/* Flowing Thread SVG */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-64 z-20 pointer-events-none">
        <svg viewBox="0 0 100 400" className="w-full h-full overflow-visible">
          <motion.path 
            d="M 50 0 C 50 100, 100 150, 50 200 C 0 250, 50 300, 50 400" 
            fill="transparent" 
            stroke="#c9a25b" 
            strokeWidth="3"
            strokeLinecap="round"
            style={{ 
              strokeDasharray: 400,
              strokeDashoffset: threadDraw 
            }}
          />
        </svg>
      </div>

    </div>
  )
}

export default Hero
