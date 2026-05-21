import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import WhyChooseUs from '../components/WhyChooseUs'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className='max-w-[1400px] mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='text-center pt-16 pb-12'
      >
        <Title text1={'THE'} text2={'ARTISANS'} />
      </motion.div>

      <div className='my-16 flex flex-col lg:flex-row gap-20 items-center'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className='w-full lg:w-1/2 relative grid grid-cols-2 gap-4'
        >
          {/* Editorial Image Collage */}
          <div className='flex flex-col gap-4 mt-8'>
            <img className='w-full shadow-lg object-cover aspect-[3/4] editorial-border' src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=2070&auto=format&fit=crop" alt="Indian Handcrafted Textile" />
            <img className='w-full shadow-lg object-cover aspect-square editorial-border' src="https://images.unsplash.com/photo-1620013098522-835697d8db19?q=80&w=2070&auto=format&fit=crop" alt="Indian Pattern" />
          </div>
          <div className='flex flex-col gap-4'>
            <img className='w-full shadow-lg object-cover aspect-square editorial-border' src="https://images.unsplash.com/photo-1583391733959-b209e9921768?q=80&w=1974&auto=format&fit=crop" alt="Artisan Stitching" />
            <img className='w-full shadow-lg object-cover aspect-[3/4] editorial-border' src="https://images.unsplash.com/photo-1558850020-f57134372e61?q=80&w=2070&auto=format&fit=crop" alt="Indian Weaver" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className='flex flex-col justify-center gap-8 lg:w-1/2 text-saarthi-dark font-light text-lg leading-[2] tracking-wide'
        >
          <p className='first-letter:text-7xl first-letter:font-display first-letter:text-saarthi-maroon first-letter:float-left first-letter:mr-4 first-letter:-mt-2'>
            Saarthi was born out of a deep respect for Indian heritage and a passionate desire to empower women artisans in rural areas. Our journey began with a simple vision: to connect the incredible craftsmanship of local weavers and embroiders with fashion lovers worldwide.
          </p>

          <p>We work directly with small-town communities, ensuring fair wages and preserving traditional arts like block printing, handloom weaving, and intricate crochet. Every garment you purchase is a testament to the skill, patience, and love poured into it by an artisan.</p>

          <div className='pl-6 border-l-2 border-saarthi-maroon mt-4'>
            <b className='text-saarthi-maroon font-display text-2xl mb-4 block tracking-widest uppercase'>Our Mission</b>
            <p className='text-saarthi-muted'>To celebrate Indian culture through premium fashion, while providing sustainable livelihoods for women artisans. We strive to bring you ethically-made clothing that tells a beautiful story of empowerment and artistry.</p>
          </div>
        </motion.div>
      </div>

      <WhyChooseUs />
      <NewsletterBox />

    </div>
  )
}

export default About
