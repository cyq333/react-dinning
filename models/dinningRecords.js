const mongoose = require('mongoose')

const DinningRecordsSchema = new mongoose.Schema({
    recordId: Number,
    dishes: String,
    totalPrice: Number,
    remark: String
})
mongoose.model('Dinning',DinningRecordsSchema)
