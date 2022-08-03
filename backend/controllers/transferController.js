const asyncHandler = require('express-async-handler')

const Transfer = require('../models/transferModel')
const User = require('../models/userModel')

// Get transfers
// GET /api/transfers
// Private

const getTransfers = asyncHandler(async (req, res) => {
    const transfer = await Transfer.find({ user: req.user.id })

    res.status(200).json(transfer)
})

// Set transfer
// POST /api/transfers
// Private

const setTransfer = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error('Please input a number')
    }
    
    if (!req.body.balance) {
        res.status(400)
        throw new Error('Please input a number')
    }

    const transfer = await Transfer.create({
        text: req.body.text,
        user: req.user.id,
        balance: req.body.balance,
    })

    res.status(200).json(transfer)
})

// future use in cancelling transactions ?
// delete transfers
// DELETE /api/transfers/:id
// private

const deleteTransfer = asyncHandler(async (req, res) => {
    const transfer = await Transfer.findById(req.params.id)

    if(!transfer) {
        res.status(400)
        throw new Error('Goal not found')
    }
    
    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user id matches transfer user id
    if(transfer.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await transfer.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTransfers,
    setTransfer,
    deleteTransfer
}