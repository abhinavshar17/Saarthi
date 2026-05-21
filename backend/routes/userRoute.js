import express from 'express';
import { loginUser,registerUserInit,verifyUserOtp,adminLogin, getMe, updateMe, initNameChange, verifyNameChange } from '../controllers/userController.js';
import authUser from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post('/register-init',registerUserInit)
userRouter.post('/verify-otp',verifyUserOtp)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/me', authUser, getMe)
userRouter.put('/me', authUser, updateMe)
userRouter.post('/name-change-init', authUser, initNameChange)
userRouter.post('/name-change-verify', authUser, verifyNameChange)

export default userRouter;