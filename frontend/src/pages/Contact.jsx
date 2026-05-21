import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

// Icon Component
const Icon = ({ children }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

const MailIcon = () => <Icon><path d="M4 4h16v16H4z" /><polyline points="22,6 12,13 2,6" /></Icon>
const PhoneIcon = () => <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11 18" /><path d="M11 6a12.84 12.84 0 0 0 .7 2.81" /></Icon>
const MapPinIcon = () => <Icon><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Icon>

const Contact = () => {
  const { backendUrl } = useContext(ShopContext)
  const [form, setForm] = useState({ name: '', email: '', concern: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(backendUrl + '/api/contact/submit', form)
      if (res.data.success) {
        toast.success('Message sent')
        setIsSubmitted(true)
        setForm({ name: '', email: '', concern: '' })
        setTimeout(() => setIsSubmitted(false), 3000)
      } else toast.error(res.data.message)
    } catch (err) {
      toast.error('Failed to send message')
    }
  }

  const contactInfo = [
    { icon: <MailIcon />, text: 'namaste@saarthi.com' },
    { icon: <PhoneIcon />, text: '+91 98765 43210' },
    { icon: <MapPinIcon />, text: 'Craftsmen Village, Jaipur, India' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="font-sans min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
    >
      <main className="w-full max-w-6xl mx-auto">
        <div className="bg-saarthi-ivory editorial-border grid md:grid-cols-2 relative overflow-hidden">

          {/* Left Info Section - Editorial Style */}
          <div className="relative p-12 lg:p-20 bg-saarthi-maroon text-saarthi-ivory flex flex-col justify-center">
            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-[0.03] bg-mandala-pattern bg-cover bg-center pointer-events-none'></div>

            <div className='relative z-10'>
              <p className='font-sans tracking-[0.3em] text-xs text-saarthi-gold uppercase mb-4'>Inquiries</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-8 leading-[1.1]">Let's Connect.</h1>
              <p className="text-saarthi-ivory/80 mb-12 font-light leading-relaxed text-lg max-w-md">Whether you have a question about our artisans or wish to place a custom handcrafted order, we invite you to reach out.</p>

              <div className="space-y-6 border-l border-saarthi-gold/30 pl-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="text-saarthi-gold group-hover:scale-110 transition-transform">{item.icon}</div>
                    <span className="text-base font-light tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="p-12 lg:p-20 bg-transparent flex flex-col justify-center">
            <h2 className="font-display text-3xl text-saarthi-dark mb-10">Send a Message</h2>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 border border-green-800/20 bg-green-50/50 text-green-800 font-light tracking-wide"
              >
                Message received. We will be in touch shortly.
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">

                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-saarthi-brown/40 bg-transparent px-2 py-3 text-saarthi-dark font-light placeholder-saarthi-muted focus:border-saarthi-maroon outline-none transition-colors"
                  placeholder="Full Name"
                  required
                />

                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  type="email"
                  className="w-full border-b border-saarthi-brown/40 bg-transparent px-2 py-3 text-saarthi-dark font-light placeholder-saarthi-muted focus:border-saarthi-maroon outline-none transition-colors"
                  placeholder="Email Address"
                  required
                />

                <textarea
                  value={form.concern}
                  onChange={(e) => setForm({ ...form, concern: e.target.value })}
                  className="w-full border-b border-saarthi-brown/40 bg-transparent px-2 py-3 text-saarthi-dark font-light placeholder-saarthi-muted focus:border-saarthi-maroon outline-none transition-colors h-24 resize-none"
                  placeholder="How can we assist you?"
                  required
                />

                <button type="submit" className="w-full bg-saarthi-dark text-saarthi-ivory py-4 font-sans tracking-[0.2em] uppercase text-xs hover:bg-saarthi-maroon transition-colors duration-500 mt-4">
                  Submit Inquiry
                </button>

              </form>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  )
}

export default Contact
