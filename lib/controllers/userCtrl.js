var User = require('./../models/user');
var q = require('q');

module.exports = {
	updateOrCreate: function(user) {
		var dfd = q.defer();
		var queryObj = { googleId: user.id };
		var updateObj = {
					googleId: user.id,
					name: user.displayName,
					plusLink: user._json.link,
					picture: user._json.picture,
					gender: user._json.gender
				};
		//if it doesn't find googleId this option will create a new user.
		var options = {
			upsert: true
		}

		User.findOneAndUpdate(queryObj, updateObj, options, function (err, result) {
			if (err) {
				dfd.reject(err);
			} else {
				dfd.resolve(result);
			}
		})
		return dfd.promise
	}
}





		