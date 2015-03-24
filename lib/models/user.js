var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
	name: { type: String, required: true },
	googleId: { type: String, required: true, unique: true },
	plusLink: { type: String, required: true, unique: true },
	picture: { type: String, required: true },
	gender: { type: String, enum: ['male', 'female'], required: true }
})

module.exports = Mongoose.model('User', userSchema);