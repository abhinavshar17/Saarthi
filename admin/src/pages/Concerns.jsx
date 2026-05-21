import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Concerns = ({ token }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const res = await axios.post(backendUrl + '/api/contact/list', {}, { headers: { token } })
      if (res.data.success) setItems(res.data.items)
      else toast.error(res.data.message)
    } catch (e) {
      console.log(e)
      toast.error('Failed to load concerns')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() },[])

  if (loading) return <div className='p-4'>Loading...</div>

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Concerns</h2>
      <div className='border rounded overflow-hidden'>
        <div className='grid grid-cols-4 gap-2 font-semibold bg-gray-100 p-3'>
          <div>Name</div>
          <div>Email</div>
          <div>Concern</div>
          <div>Date</div>
        </div>
        {items.map((c)=> (
          <div key={c._id} className='grid grid-cols-4 gap-2 border-t p-3 text-sm'>
            <div className='break-words'>{c.name}</div>
            <div className='break-words'>{c.email}</div>
            <div className='break-words'>{c.concern}</div>
            <div>{ new Date(c.date).toLocaleString() }</div>
          </div>
        ))}
        {items.length === 0 && <div className='p-4 text-gray-500'>No concerns yet.</div>}
      </div>
    </div>
  )
}

export default Concerns
