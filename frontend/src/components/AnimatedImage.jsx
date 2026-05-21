import React from 'react'
import { motion } from 'framer-motion'

const AnimatedImage = ({ src, alt, className, containerClassName }) => {
  return (
    <div className={`relative overflow-hidden ${containerClassName || ''}`}>
      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
        className="absolute inset-0 bg-saarthi-maroon z-10"
      />
      <motion.img
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className || ''}`}
      />
    </div>
  )
}

export default AnimatedImage
