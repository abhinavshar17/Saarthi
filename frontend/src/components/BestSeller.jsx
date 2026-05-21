import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5))
    },[products])

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
      }
    }

    const itemVariants = {
      hidden: { opacity: 0, scale: 0.95, y: 30 },
      visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
    }

  return (
    <div className='my-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] max-w-[1600px] mx-auto'>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className='text-center text-3xl py-12'
      >
        <Title text1={'BEST'} text2={'SELLERS'}/>
        <p className='w-full sm:w-3/4 m-auto text-sm md:text-base text-saarthi-muted font-light mt-6 max-w-2xl tracking-wide'>
          Explore our most loved handcrafted collections. Each piece carries the warmth and dedication of its maker.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 gap-y-12'
      >
        {
            bestSeller.map((item,index)=>(
                <motion.div key={index} variants={itemVariants} className="h-full">
                  <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                </motion.div>
            ))
        }
      </motion.div>
    </div>
  )
}

export default BestSeller
