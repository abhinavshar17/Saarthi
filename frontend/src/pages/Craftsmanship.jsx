import React from 'react'
import { motion } from 'framer-motion'
import AnimatedImage from '../components/AnimatedImage'

const Craftsmanship = () => {
  return (
    <div className='w-full min-h-screen bg-saarthi-cream pt-20 pb-24'>
      <div className='max-w-[1400px] mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        
        {/* Header Section */}
        <div className='text-center mb-24'>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='font-sans tracking-[0.3em] text-sm text-saarthi-maroon uppercase mb-4'
          >
            Our Artisans
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className='font-display text-5xl sm:text-6xl md:text-7xl text-saarthi-dark leading-tight mb-8 max-w-4xl mx-auto'
          >
            The Art of <span className='italic font-light text-saarthi-gold'>Rabari</span> Embroidery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className='text-saarthi-muted text-lg max-w-2xl mx-auto font-light leading-relaxed'
          >
            For generations, the women of Kutch have woven their stories, beliefs, and vibrant culture into every stitch. At Saarthi, we honor this legacy.
          </motion.p>
        </div>

        {/* Story Section 1 */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32'>
          <AnimatedImage 
            src="/indian_artisan_woman.png" 
            alt="Artisan at work" 
            containerClassName="aspect-[4/5] lg:aspect-[3/4]"
          />
          <div className='flex flex-col justify-center'>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='font-display text-4xl text-saarthi-dark mb-6'
            >
              Preserving Heritage
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-saarthi-muted text-lg font-light leading-relaxed mb-8'
            >
              Our artisans employ traditional techniques like Zardozi and Rabari embroidery, often featuring majestic elephant motifs that symbolize wisdom and prosperity. These intricate designs are not just decoration; they are a living language of the community.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='text-saarthi-muted text-lg font-light leading-relaxed'
            >
              Each garment takes weeks, sometimes months, to complete, ensuring that every piece you wear is a unique work of art, carrying the warmth of the hands that made it.
            </motion.p>
          </div>
        </div>

        {/* Full Bleed Image Section */}
        <div className='w-full h-[60vh] md:h-[80vh] mb-32'>
          <AnimatedImage 
            src="/indian_embroidery_elephant.png" 
            alt="Elephant Motif Embroidery" 
            containerClassName="w-full h-full"
            className="object-cover"
          />
        </div>

        {/* Story Section 2 */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <div className='flex flex-col justify-center order-2 lg:order-1'>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='font-display text-4xl text-saarthi-dark mb-6'
            >
              Empowering Women
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-saarthi-muted text-lg font-light leading-relaxed'
            >
              By partnering directly with rural artisans, Saarthi provides sustainable livelihoods and fair wages. We believe in slow fashion that respects both the creator and the environment. When you choose Saarthi, you are supporting a movement that values human touch over mass production.
            </motion.p>
          </div>
          <AnimatedImage 
            src="https://images.unsplash.com/photo-1583391733958-d25e61c2d366?q=80&w=1958&auto=format&fit=crop" 
            alt="Indian Fabrics" 
            containerClassName="aspect-square lg:aspect-[4/5] order-1 lg:order-2"
          />
        </div>

      </div>
    </div>
  )
}

export default Craftsmanship
