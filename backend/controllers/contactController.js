import contactModel from '../models/contactModel.js'
import validator from 'validator'

export const submitConcern = async (req, res) => {
  try {
    const { name, email, concern } = req.body
    if (!name || !email || !concern) return res.json({ success: false, message: 'All fields are required' })
    if (!validator.isEmail(email)) return res.json({ success: false, message: 'Please enter a valid email' })
    if (concern.trim().length < 5) return res.json({ success: false, message: 'Concern is too short' })

    const doc = new contactModel({ name: name.trim(), email: email.trim(), concern: concern.trim() })
    await doc.save()
    res.json({ success: true, message: 'Thanks for reaching out. We will get back to you soon.' })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export const listConcerns = async (req, res) => {
  try {
    const items = await contactModel.find({}).sort({ date: -1 })
    res.json({ success: true, items })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
