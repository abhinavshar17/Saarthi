import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Craftsmanship from './pages/Craftsmanship'
import Heritage from './pages/Heritage'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Profile from './pages/Profile'
import { NotificationProvider } from './context/NotificationContext'

import Chatbot from './components/Chatbot' // <- use components path; file exists there
import SplashScreen from './components/SplashScreen'
import Lenis from 'lenis'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <NotificationProvider>
      <SplashScreen />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

        <ToastContainer />
        <Navbar />
        <SearchBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/craftsmanship' element={<Craftsmanship />} />
          <Route path='/heritage' element={<Heritage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>

        <Footer />

        {/* ⭐ Floating Chatbot Icon */}
        <Chatbot />

      </div>
    </NotificationProvider>
  )
}

export default App
