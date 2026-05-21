import express from 'express'
import { submitConcern, listConcerns } from '../controllers/contactController.js'
import adminAuth from '../middleware/adminAuth.js'

const contactRouter = express.Router()

contactRouter.post('/submit', submitConcern)
contactRouter.post('/list', adminAuth, listConcerns)

export default contactRouter
