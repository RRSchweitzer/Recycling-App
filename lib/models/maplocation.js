var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var PinSchema = new Schema({
	address: { 
		road: { type: String, required: true },
	  city: { type: String },
		county: { type: String },
		state: { type: String },
		postcode: { type: String },
		country: { type: String },
		country_code: { type: String }
	},
	days: [{ type: String, required: true }],
	coords: {
		latitude: { type: Number, required: true },
		longitude: { type: Number, required: true }
	},
	full_name: { type: String },
	user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', index: true },	
	})

module.exports = Mongoose.model('mapLocation', PinSchema);