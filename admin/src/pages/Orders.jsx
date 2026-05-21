import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  const statusHandler = async ( event, orderId ) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status' , {orderId, status:event.target.value}, { headers: {token}})
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div className='w-full'>
      <p className='font-sans uppercase tracking-[0.3em] text-xs text-saarthi-muted mb-6'>Client Orders</p>
      <div className='flex flex-col gap-4'>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border border-saarthi-brown/20 bg-saarthi-ivory shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 text-sm font-light text-saarthi-dark' key={index}>
              <img className='w-12 opacity-70 grayscale' src={assets.parcel_icon} alt="" />
              <div>
                <div className='mb-4'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return <p className='py-0.5 font-display text-lg' key={index}> {item.name} <span className='text-saarthi-muted font-sans text-xs'>x {item.quantity} ({item.size})</span> </p>
                    }
                    else {
                      return <p className='py-0.5 font-display text-lg' key={index}> {item.name} <span className='text-saarthi-muted font-sans text-xs'>x {item.quantity} ({item.size})</span> ,</p>
                    }
                  })}
                </div>
                <p className='mt-3 mb-1 font-sans font-medium uppercase tracking-widest text-xs'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className='text-saarthi-muted'>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                </div>
                <p className='text-saarthi-muted mt-1'>{order.address.phone}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-sm'><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Items:</span> {order.items.length}</p>
                <p><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Method:</span> {order.paymentMethod}</p>
                <p><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Payment:</span> <span className={order.payment ? 'text-green-700' : 'text-saarthi-maroon'}>{ order.payment ? 'Complete' : 'Pending' }</span></p>
                <p><span className='text-saarthi-muted uppercase text-xs tracking-widest'>Date:</span> {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-lg font-display'>{currency}{order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='px-4 py-3 font-sans uppercase tracking-widest text-xs border border-saarthi-brown/20 bg-saarthi-cream cursor-pointer focus:border-saarthi-gold outline-none'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders