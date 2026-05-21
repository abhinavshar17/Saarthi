import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Profile = () => {
  const { backendUrl, token } = useContext(ShopContext)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', alternateEmail: '' })
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [nameOtpStep, setNameOtpStep] = useState(false)
  const [nameOtp, setNameOtp] = useState('')

  const fetchMe = async () => {
    try {
      setLoading(true)
      const res = await axios.get(backendUrl + '/api/user/me', { headers: { token } })
      if (res.data.success) {
        setForm({
          name: res.data.user.name || '',
          email: res.data.user.email || '',
          phone: res.data.user.phone || '',
          alternateEmail: res.data.user.alternateEmail || ''
        })
      } else {
        toast.error(res.data.message)
      }
    } catch (e) {
      console.log(e)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const onSave = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      const payload = { phone: form.phone, alternateEmail: form.alternateEmail }
      const res = await axios.put(backendUrl + '/api/user/me', payload, { headers: { token } })
      if (res.data.success) {
        toast.success('Profile updated')
        setForm((f)=>({ ...f, phone: res.data.user.phone || '', alternateEmail: res.data.user.alternateEmail || '' }))
      } else {
        toast.error(res.data.message)
      }
    } catch (e) {
      console.log(e)
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => { if (token) fetchMe() }, [token])

  if (loading) return <div className='py-10'>Loading profile...</div>

  return (
    <form onSubmit={onSave} className='max-w-xl mx-auto py-10 flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>My Profile</h1>
      <div>
        <label className='block text-sm text-gray-600 mb-1'>Name</label>
        {!editingName ? (
          <div className='flex items-center gap-3'>
            <input value={form.name} disabled className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100' />
            <button type='button' onClick={()=>{ setEditingName(true); setNameValue(form.name); setNameOtpStep(false); setNameOtp('') }} className='px-3 py-2 border rounded'>Edit</button>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <input value={nameValue} onChange={(e)=>setNameValue(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded' />
            {!nameOtpStep ? (
              <div className='flex items-center gap-2'>
                <button type='button' onClick={async ()=>{
                  try {
                    const res = await axios.post(backendUrl + '/api/user/name-change-init', { newName: nameValue }, { headers: { token } })
                    if (res.data.success) { setNameOtpStep(true); toast.success('OTP sent to your email') } else { toast.error(res.data.message) }
                  } catch (e) { toast.error('Failed to send OTP') }
                }} className='bg-black text-white px-4 py-2 rounded'>Send code</button>
                <button type='button' onClick={()=>{ setEditingName(false); }} className='px-3 py-2 border rounded'>Cancel</button>
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                <p className='text-sm text-gray-600'>Enter the 6-digit code sent to {form.email}</p>
                <input value={nameOtp} onChange={(e)=>setNameOtp(e.target.value)} maxLength={6} inputMode='numeric' pattern='[0-9]*' className='w-full px-3 py-2 border border-gray-300 rounded tracking-widest text-center' placeholder='______' />
                <div className='flex items-center gap-2'>
                  <button type='button' onClick={async ()=>{
                    try {
                      const res = await axios.post(backendUrl + '/api/user/name-change-verify', { newName: nameValue, otp: nameOtp }, { headers: { token } })
                      if (res.data.success) {
                        setForm((f)=>({ ...f, name: res.data.user.name }))
                        toast.success('Name updated')
                        setEditingName(false)
                      } else { toast.error(res.data.message) }
                    } catch (e) { toast.error('Failed to verify OTP') }
                  }} className='bg-black text-white px-4 py-2 rounded'>Confirm</button>
                  <button type='button' onClick={async ()=>{
                    try {
                      const res = await axios.post(backendUrl + '/api/user/name-change-init', { newName: nameValue }, { headers: { token } })
                      if (res.data.success) toast.success('Code resent'); else toast.error(res.data.message)
                    } catch (e) { toast.error('Failed to resend') }
                  }} className='px-3 py-2 border rounded'>Resend</button>
                  <button type='button' onClick={()=>{ setEditingName(false); }} className='px-3 py-2 border rounded'>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <label className='block text-sm text-gray-600 mb-1'>Email</label>
        <input value={form.email} disabled className='w-full px-3 py-2 border border-gray-300 rounded bg-gray-100' />
      </div>
      <div>
        <label className='block text-sm text-gray-600 mb-1'>Phone</label>
        <input value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} placeholder='Add phone number' className='w-full px-3 py-2 border border-gray-300 rounded' />
      </div>
      <div>
        <label className='block text-sm text-gray-600 mb-1'>Alternate Email</label>
        <input value={form.alternateEmail} onChange={(e)=>setForm({...form, alternateEmail: e.target.value})} placeholder='Add alternate email' className='w-full px-3 py-2 border border-gray-300 rounded' />
      </div>
      <div className='text-right'>
        <button type='submit' disabled={saving} className='bg-black text-white px-6 py-2 rounded disabled:opacity-60'>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default Profile
