const mongoose = require('mongoose')

const transferSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: Number,
            required: [true, 'Please add a value']
        },
        balance: {
            type: Number,
            required: [true, 'Please add a balance'],
            default: 0,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Transfer', transferSchema)