import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  concern: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
})

const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema)

export default contactModel
