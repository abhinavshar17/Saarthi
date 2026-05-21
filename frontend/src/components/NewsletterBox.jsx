import React from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className='text-center my-32 px-4'
    >
      <h2 className='text-3xl sm:text-4xl font-display text-saarthi-dark mb-4'>Join The <span className='italic font-light text-saarthi-maroon'>Saarthi</span> Family</h2>
      <p className='text-saarthi-muted mt-3 font-light max-w-xl mx-auto leading-relaxed'>
        Subscribe to our newsletter for exclusive access to new handcrafted collections, stories from our artisans, and special privileges.
      </p>
      
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center border border-saarthi-brown/30 mx-auto my-8 bg-saarthi-ivory/50 backdrop-blur-sm shadow-sm'>
        <input 
          className='w-full sm:flex-1 outline-none bg-transparent px-6 py-4 text-saarthi-dark placeholder-saarthi-muted/50 font-light' 
          type="email" 
          placeholder='Enter your email address' 
          required
        />
        <motion.button 
          whileHover={{ backgroundColor: '#5c1a1b', color: '#f8f5f0' }}
          type='submit' 
          className='bg-saarthi-dark text-saarthi-ivory text-xs tracking-[0.2em] uppercase px-8 py-4 h-full border-l border-saarthi-brown/30 transition-colors duration-300'
        >
          Subscribe
        </motion.button>
      </form>
    </motion.div>
  )
}

export default NewsletterBox
