import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { motion } from 'framer-motion'

const Collection = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-14 pt-16 border-t border-saarthi-brown/20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] max-w-[1600px] mx-auto'>
      
      {/* Filter Options */}
      <div className='min-w-64'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-2xl flex items-center justify-between cursor-pointer font-display text-saarthi-dark tracking-widest uppercase border-b border-saarthi-brown/20 pb-4'>
          Filters
          <img className={`h-4 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        {/* Category Filter */}
        <div className={`py-6 border-b border-saarthi-brown/10 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-6 text-sm font-sans tracking-[0.2em] text-saarthi-maroon uppercase font-medium'>Category</p>
          <div className='flex flex-col gap-4 text-sm font-light text-saarthi-dark tracking-wide'>
            <label className='flex gap-4 items-center cursor-pointer hover:text-saarthi-maroon transition-colors group'>
              <div className='w-4 h-4 border border-saarthi-brown/40 flex items-center justify-center group-hover:border-saarthi-maroon transition-colors'>
                {category.includes('Men') && <div className='w-2 h-2 bg-saarthi-maroon'></div>}
              </div>
              <input className='hidden' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
            </label>
            <label className='flex gap-4 items-center cursor-pointer hover:text-saarthi-maroon transition-colors group'>
              <div className='w-4 h-4 border border-saarthi-brown/40 flex items-center justify-center group-hover:border-saarthi-maroon transition-colors'>
                {category.includes('Women') && <div className='w-2 h-2 bg-saarthi-maroon'></div>}
              </div>
              <input className='hidden' type="checkbox" value={'Women'} onChange={toggleCategory}/> Women
            </label>
            <label className='flex gap-4 items-center cursor-pointer hover:text-saarthi-maroon transition-colors group'>
              <div className='w-4 h-4 border border-saarthi-brown/40 flex items-center justify-center group-hover:border-saarthi-maroon transition-colors'>
                {category.includes('Kids') && <div className='w-2 h-2 bg-saarthi-maroon'></div>}
              </div>
              <input className='hidden' type="checkbox" value={'Kids'} onChange={toggleCategory}/> Kids
            </label>
          </div>
        </div>
        
        {/* SubCategory Filter */}
        <div className={`py-6 border-b border-saarthi-brown/10 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-6 text-sm font-sans tracking-[0.2em] text-saarthi-maroon uppercase font-medium'>Collection Type</p>
          <div className='flex flex-col gap-4 text-sm font-light text-saarthi-dark tracking-wide'>
            <label className='flex gap-4 items-center cursor-pointer hover:text-saarthi-maroon transition-colors group'>
              <div className='w-4 h-4 border border-saarthi-brown/40 flex items-center justify-center group-hover:border-saarthi-maroon transition-colors'>
                {subCategory.includes('Topwear') && <div className='w-2 h-2 bg-saarthi-maroon'></div>}
              </div>
              <input className='hidden' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/> Topwear
            </label>
            <label className='flex gap-4 items-center cursor-pointer hover:text-saarthi-maroon transition-colors group'>
              <div className='w-4 h-4 border border-saarthi-brown/40 flex items-center justify-center group-hover:border-saarthi-maroon transition-colors'>
                {subCategory.includes('Bottomwear') && <div className='w-2 h-2 bg-saarthi-maroon'></div>}
              </div>
              <input className='hidden' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
            </label>
            <label className='flex gap-4 items-center cursor-pointer hover:text-saarthi-maroon transition-colors group'>
              <div className='w-4 h-4 border border-saarthi-brown/40 flex items-center justify-center group-hover:border-saarthi-maroon transition-colors'>
                {subCategory.includes('Winterwear') && <div className='w-2 h-2 bg-saarthi-maroon'></div>}
              </div>
              <input className='hidden' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center text-base sm:text-2xl mb-12 gap-6'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/* Product Sort */}
            <select onChange={(e)=>setSortType(e.target.value)} className='editorial-border bg-saarthi-ivory text-saarthi-dark text-sm px-6 py-3 font-sans tracking-widest uppercase focus:outline-none focus:border-saarthi-maroon transition-colors appearance-none cursor-pointer'>
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {/* Map Products */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12'
        >
          {
            filterProducts.map((item,index)=>(
              <motion.div key={index} variants={itemVariants} className="h-full">
                <ProductItem name={item.name} id={item._id} price={item.price} image={item.image} />
              </motion.div>
            ))
          }
        </motion.div>
      </div>

    </div>
  )
}

export default Collection
