import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const OurPolicy = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-6 text-center py-24 px-4 sm:px-[5vw] max-w-[1400px] mx-auto border-t border-saarthi-brown/10'
    >
      
      <motion.div variants={itemVariants} className='flex flex-col items-center group'>
        <div className='w-16 h-16 rounded-full bg-saarthi-cream flex items-center justify-center mb-6 editorial-border group-hover:bg-saarthi-ivory transition-colors duration-500'>
            <img src={assets.exchange_icon} className='w-6 opacity-70 group-hover:opacity-100 transition-opacity filter sepia brightness-50 contrast-150' alt="" />
        </div>
        <p className='font-display text-xl text-saarthi-dark mb-2 tracking-wide'>Easy Exchange Policy</p>
        <p className='text-saarthi-muted font-light max-w-xs'>We offer a hassle-free, complimentary exchange on all handcrafted items.</p>
      </motion.div>

      <motion.div variants={itemVariants} className='flex flex-col items-center group'>
        <div className='w-16 h-16 rounded-full bg-saarthi-cream flex items-center justify-center mb-6 editorial-border group-hover:bg-saarthi-ivory transition-colors duration-500'>
            <img src={assets.quality_icon} className='w-6 opacity-70 group-hover:opacity-100 transition-opacity filter sepia brightness-50 contrast-150' alt="" />
        </div>
        <p className='font-display text-xl text-saarthi-dark mb-2 tracking-wide'>7 Days Return</p>
        <p className='text-saarthi-muted font-light max-w-xs'>Experience our luxury risk-free with our 7-day complimentary return window.</p>
      </motion.div>

      <motion.div variants={itemVariants} className='flex flex-col items-center group'>
        <div className='w-16 h-16 rounded-full bg-saarthi-cream flex items-center justify-center mb-6 editorial-border group-hover:bg-saarthi-ivory transition-colors duration-500'>
            <img src={assets.support_img} className='w-6 opacity-70 group-hover:opacity-100 transition-opacity filter sepia brightness-50 contrast-150' alt="" />
        </div>
        <p className='font-display text-xl text-saarthi-dark mb-2 tracking-wide'>Dedicated Support</p>
        <p className='text-saarthi-muted font-light max-w-xs'>Our concierge team is available 24/7 to assist you with styling or orders.</p>
      </motion.div>

    </motion.div>
  )
}

export default OurPolicy
