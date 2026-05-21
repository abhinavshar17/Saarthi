import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <div className="group h-full">
      <Link onClick={()=>scrollTo(0,0)} className='block h-full cursor-pointer bg-saarthi-ivory overflow-hidden editorial-border hover:editorial-shadow transition-shadow duration-500' to={`/product/${id}`}>
        
        <div className='relative w-full aspect-[3/4] overflow-hidden bg-saarthi-cream'>
          <motion.img 
            initial={{ scale: 1.2, filter: 'blur(10px)' }}
            whileInView={{ scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out' 
            src={image[0]} 
            alt={name} 
          />
          
          {/* Handcrafted Tag Overlay */}
          <div className='absolute top-4 left-4 border border-saarthi-ivory/50 bg-saarthi-dark/40 backdrop-blur-md px-3 py-1 text-[9px] font-sans tracking-[0.2em] text-saarthi-ivory uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
            Artisan Made
          </div>
        </div>

        <div className='p-5 flex flex-col justify-between bg-saarthi-ivory text-center border-t border-saarthi-brown/10'>
          <p className='text-saarthi-dark font-display text-lg mb-2 truncate group-hover:text-saarthi-maroon transition-colors duration-500'>{name}</p>
          <div className='flex items-center justify-center gap-3'>
            <span className='w-4 h-[1px] bg-saarthi-gold/50 group-hover:bg-saarthi-maroon transition-colors duration-500'></span>
            <p className='text-sm font-light tracking-widest text-saarthi-brown'>{currency}{price}</p>
            <span className='w-4 h-[1px] bg-saarthi-gold/50 group-hover:bg-saarthi-maroon transition-colors duration-500'></span>
          </div>
        </div>

      </Link>
    </div>
  )
}

export default ProductItem
