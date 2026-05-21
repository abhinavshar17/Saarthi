import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SplashScreen = () => {
  const [show, setShow] = useState(true)

  // Array of 20 high-quality, extremely vibrant images
  const images = useMemo(() => [
    { src: "/indian_artisan_woman.png", flip: false }, { src: "/vibrant_artisan_3.png", flip: false }, { src: "/product_saree.png", flip: false }, { src: "/artisan_dyeing.png", flip: false }, { src: "/indian_embroidery_elephant.png", flip: false },
    { src: "/product_lehenga.png", flip: false }, { src: "/vibrant_fabric_3.png", flip: false }, { src: "/product_kurta.png", flip: false }, { src: "/vibrant_artisan_4.png", flip: false }, { src: "/product_anarkali.png", flip: false },
    { src: "/artisan_hands.png", flip: false }, { src: "/product_dupatta.png", flip: false }, { src: "/hero_background.png", flip: false }, { src: "/product_sherwani.png", flip: false }, { src: "/splash_bg_luxury.png", flip: false },
    // Repeat 5 images but flip them horizontally so they look like distinct new images
    { src: "/vibrant_artisan_3.png", flip: true }, { src: "/vibrant_fabric_3.png", flip: true }, { src: "/artisan_dyeing.png", flip: true }, { src: "/vibrant_artisan_4.png", flip: true }, { src: "/artisan_hands.png", flip: true }
  ], [])

  // Shuffle images slightly so the grid looks organic but uses our assets
  const shuffledImages = useMemo(() => {
    const arr = [...images];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [images])

  useEffect(() => {
    // Hide completely after the animation finishes
    const timer = setTimeout(() => {
      setShow(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  // Randomize the order in which cells fade in for a dynamic effect
  const getDelay = (index) => {
      // Create a pseudo-random stagger effect between 0.2s and 2.5s
      return 0.2 + (index % 5) * 0.2 + Math.random() * 1.5;
  }

  return (
    <AnimatePresence>
      <motion.div 
        className='fixed inset-0 z-[9999] bg-saarthi-dark overflow-hidden'
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      >
        
        {/* The 20-Image Symmetrical Grid */}
        <div className='absolute inset-0 w-full h-full grid grid-cols-4 md:grid-cols-5 grid-rows-5 md:grid-rows-4 gap-0'>
            {shuffledImages.map((imgObj, idx) => (
                <motion.div 
                    key={idx}
                    className='w-full h-full overflow-hidden bg-saarthi-dark'
                    initial={{ opacity: 0, scale: 1.1, filter: "brightness(0)" }}
                    animate={{ opacity: 1, scale: 1, filter: "brightness(0.9) saturate(1.5)" }} // Much more vibrant and brighter
                    transition={{ duration: 1.5, ease: "easeOut", delay: getDelay(idx) }}
                >
                    <img src={imgObj.src} className={`w-full h-full object-cover transition-transform duration-1000 ${imgObj.flip ? 'scale-x-[-1]' : ''}`} alt={`Grid ${idx}`} />
                </motion.div>
            ))}
        </div>

        {/* Center Text Reveal */}
        <motion.div 
          className='absolute inset-0 z-20 flex flex-col items-center justify-center bg-saarthi-dark/50 backdrop-blur-sm'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 3.5 }}
        >
          <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 2, delay: 3.8, ease: "easeOut" }}
             className='flex flex-col items-center'
          >
            <p className='text-saarthi-gold font-sans uppercase tracking-[0.5em] text-xs md:text-sm mb-6'>
                The Hands Behind
            </p>
            <h1 
                className='text-saarthi-ivory font-display text-6xl md:text-[8rem] lg:text-[10rem] tracking-widest uppercase leading-none drop-shadow-2xl'
                style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
            >
                Saarthi
            </h1>
          </motion.div>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  )
}

export default SplashScreen
