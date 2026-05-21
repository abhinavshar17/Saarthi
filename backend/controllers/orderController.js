import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: 'Cart is empty' })
        }
        if (!amount || amount <= 0) {
            return res.json({ success: false, message: 'Invalid order amount' })
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body
        const { origin } = req.headers;

        if (!Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: 'Cart is empty' })
        }
        if (!amount || amount <= 0) {
            return res.json({ success: false, message: 'Invalid order amount' })
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency:currency,
                product_data: {
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency:currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true,session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Verify Stripe 
const verifyStripe = async (req,res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true});
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        
        // Notify via SSE
        if (updatedOrder) {
            // Prepare notification payload
            const payload = {
                type: 'ORDER_STATUS',
                orderId: updatedOrder._id,
                userId: updatedOrder.user, // ObjectId or string
                status: updatedOrder.status,
                message: `Your order #${updatedOrder._id} status is now ${updatedOrder.status}`,
                timestamp: new Date(),
            };

            // Broadcast to all connected clients (or filter by userId)
            // If you registered clients with userId, pass a filterFn: client => client.userId === payload.userId
            if (typeof global.sendSSE === 'function') {
                global.sendSSE(payload /*, client => client.userId === String(payload.userId) */);
            }
        }

        res.json({success:true,message:'Status Updated', order: updatedOrder})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus}