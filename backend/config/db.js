const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI = 'mongodb+srv://admin:admin@cluster0.t3ye3im.mongodb.net/UserDB?retryWrites=true&w=majority')

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB