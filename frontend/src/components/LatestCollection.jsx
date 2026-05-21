import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion'

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    }

    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    }

  return (
    <div className='my-24 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] max-w-[1600px] mx-auto'>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className='text-center py-12 text-3xl'
      >
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          <p className='w-full sm:w-3/4 m-auto text-sm md:text-base text-saarthi-muted font-light mt-6 max-w-2xl tracking-wide'>
            Discover our latest handcrafted collection, where traditional artistry meets modern elegance. Every piece is a testament to the skill of Indian women artisans.
          </p>
      </motion.div>

      {/* Rendering Products */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 gap-y-12'
      >
        {
          latestProducts.map((item,index)=>(
            <motion.div key={index} variants={itemVariants} className="h-full">
              <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
            </motion.div>
          ))
        }
      </motion.div>
    </div>
  )
}

export default LatestCollection
