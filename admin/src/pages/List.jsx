import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-full'>
      <p className='font-sans uppercase tracking-[0.3em] text-xs text-saarthi-muted mb-6'>Collection Inventory</p>
      <div className='flex flex-col gap-2'>

        {/* ------- List Table Title ---------- */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-4 px-6 border border-saarthi-brown/20 bg-saarthi-ivory text-xs font-sans tracking-widest uppercase text-saarthi-dark'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className='text-center'>Action</p>
        </div>

        {/* ------ Product List ------ */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-6 border-b border-x border-saarthi-brown/10 hover:bg-saarthi-ivory transition-colors text-sm font-light text-saarthi-dark' key={index}>
              <img className='w-16 h-20 object-cover shadow-sm editorial-border' src={item.image[0]} alt="" />
              <p className='font-display text-lg'>{item.name}</p>
              <p className='uppercase tracking-widest text-xs'>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-saarthi-maroon hover:text-saarthi-terracotta transition-colors font-sans uppercase tracking-widest text-xs'>Remove</p>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default List