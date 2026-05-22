import { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import NotificationIcon from './NotificationIcon'
import { motion } from 'framer-motion'

const Navbar = () => {

    const [visible,setVisible] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems} = useContext(ShopContext);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className='bg-saarthi-ivory border-b border-saarthi-brown/20 sticky top-0 z-50'
    >
      <div className='max-w-[1400px] mx-auto flex flex-col'>
        
        {/* Top Banner (Optional for luxury feel) */}
        <div className='w-full bg-saarthi-maroon text-saarthi-cream text-center py-2 text-xs font-light tracking-widest uppercase'>
          Free Shipping on Handcrafted Orders Over ₹5000
        </div>

        <div className='flex items-center justify-between py-6 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] font-medium'>
          
          {/* Menu Icon Mobile */}
          <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden filter invert-[0.3]' alt="Menu" /> 

          {/* Logo */}
          <Link to='/' className="flex items-center justify-center flex-1 sm:flex-none">
            <h1 className='font-display text-3xl sm:text-4xl text-saarthi-dark tracking-widest uppercase'>Saarthi</h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className='hidden sm:flex gap-8 lg:gap-12 text-sm text-saarthi-dark font-display tracking-widest uppercase items-center absolute left-1/2 -translate-x-1/2'>
            <NavLink to='/' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors'>
                <p>Home</p>
                <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
            </NavLink>
            <NavLink to='/collection' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors'>
                <p>Collection</p>
                <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
            </NavLink>
            <NavLink to='/craftsmanship' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors'>
                <p>Craftsmanship</p>
                <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
            </NavLink>
            <NavLink to='/contact' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors'>
                <p>Contact</p>
                <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
            </NavLink>
            <a href='https://boisterous-mooncake-7c2ac4.netlify.app' target='_blank' rel='noopener noreferrer' className='group flex flex-col items-center gap-1 hover:text-saarthi-maroon transition-colors'>
                <p>Admin</p>
                <hr className='w-0 group-hover:w-full border-none h-[1px] bg-saarthi-maroon transition-all duration-300' />
            </a>
          </ul>

          {/* Icons */}
          <div className='flex items-center gap-5 sm:gap-7'>
                <img onClick={()=> { setShowSearch(true); navigate('/collection') }} src={assets.search_icon} className='w-5 cursor-pointer hover:opacity-70 transition-opacity filter invert-[0.3]' alt="Search" />
                
                <div className='group relative'>
                    <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer hover:opacity-70 transition-opacity filter invert-[0.3]' src={assets.profile_icon} alt="Profile" />
                    {/* Dropdown Menu */}
                    {token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                        <div className='flex flex-col gap-2 w-40 py-4 px-6 bg-saarthi-ivory border border-saarthi-brown/20 text-saarthi-dark shadow-xl'>
                            <p onClick={()=>navigate('/profile')} className='cursor-pointer hover:text-saarthi-maroon transition-colors font-light'>Profile</p>
                            <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-saarthi-maroon transition-colors font-light'>Orders</p>
                            <hr className='border-saarthi-brown/10 my-1' />
                            <p onClick={logout} className='cursor-pointer hover:text-saarthi-maroon transition-colors font-light'>Logout</p>
                        </div>
                    </div>}
                </div> 

                <Link to='/cart' className='relative hover:opacity-70 transition-opacity'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 filter invert-[0.3]' alt="Cart" />
                    <p className='absolute right-[-6px] bottom-[-6px] w-[18px] text-center leading-[18px] bg-saarthi-maroon text-saarthi-cream aspect-square rounded-full text-[9px] font-bold'>{getCartCount()}</p>
                </Link> 

          </div>
        </div>
      </div>

        {/* Sidebar menu for small screens */}
        <div className={`fixed top-0 left-0 bottom-0 overflow-hidden bg-saarthi-ivory transition-all z-[100] ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-saarthi-dark font-display tracking-widest text-lg h-full'>
                    <div className='flex items-center justify-between p-6 border-b border-saarthi-brown/20'>
                        <h2 className='text-2xl uppercase tracking-widest'>Menu</h2>
                        <div onClick={()=>setVisible(false)} className='cursor-pointer p-2'>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <div className='flex flex-col py-6'>
                      <NavLink onClick={()=>setVisible(false)} className='py-4 px-8 hover:bg-saarthi-brown/5 transition-colors uppercase' to='/'>Home</NavLink>
                      <NavLink onClick={()=>setVisible(false)} className='py-4 px-8 hover:bg-saarthi-brown/5 transition-colors uppercase' to='/collection'>Collection</NavLink>
                      <NavLink onClick={()=>setVisible(false)} className='py-4 px-8 hover:bg-saarthi-brown/5 transition-colors uppercase' to='/craftsmanship'>Craftsmanship</NavLink>
                      <NavLink onClick={()=>setVisible(false)} className='py-4 px-8 hover:bg-saarthi-brown/5 transition-colors uppercase' to='/contact'>Contact</NavLink>
                      <a onClick={()=>setVisible(false)} href='http://localhost:5174' target='_blank' rel='noopener noreferrer' className='py-4 px-8 hover:bg-saarthi-brown/5 transition-colors uppercase'>Admin</a>
                    </div>
                </div>
        </div>

    </motion.header>
  )
}

export default Navbar
