/*const mongoose = require('mongoose')

const DinningRecordsSchema = new mongoose.Schema({
    recordId: Number,
    dishes: String,
    totalPrice: Number,
    remark: String
})
mongoose.model('Dinning',DinningRecordsSchema)
*/

var mongoose = require('mongoose'),
    DB_URL = 'mongodb://115.159.184.71:27017/test';


mongoose.connect(DB_URL);

mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var consumpitionSchema = new Schema({          
    recordId : { type: Number },                   
    dishes : { type: String },
    totalPrice : {type: Number },
    remark : {type:String}
});

module.exports = mongoose.model('tests',consumpitionSchema);
