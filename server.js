var Dotenv = require('dotenv').load();
var Express = require('express');
var Passport = require('passport');
var Session = require('express-session')
var BodyParser = require('body-parser');
var Mongoose = require('mongoose');
var request = require('request');
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var port = 9080;
var app = Express();

//controllers
var userCtrl = require('./lib/controllers/userCtrl')
var mapCtrl = require('./lib/controllers/mapCtrl')

//Mongo Connection
var mongoURI = 'localhost:27017/RecycleUtah';
Mongoose.connect(mongoURI, function() {
	console.log('Connected to MongoDB at: ' + mongoURI);
})


//middleware
app.use(Express.static(__dirname + '/public'));
app.use(BodyParser.json());
app.use(Session({
	secret: 'JFDSF98hew98h8hDSOIFoiDiji3333'
}));
app.use(Passport.initialize());
app.use(Passport.session());

//packaging into a cookie to send to the front-end
Passport.serializeUser(function(user, done) {
  done(null, user);
});

//saves into req.user
Passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//Facebook Login
Passport.use(new FacebookStrategy({
	clientID: '556621937773894',
	clientSecret: 'bb48d656ff5e6a9f739df2bb95f7d7d1',
	callbackURL: 'http://localhost:9080/auth/facebook/callback'
}, function (token, refreshToken, profile, done) {
	return done(null, profile)
}));

app.get('/auth/facebook',
	Passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
	Passport.authenticate('facebook',
	{
		successRedirect: '/#/map',
		failureRedirect: '/#/login'
	}))


var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}
app.get('/', function(req, res) {
	return res.sendFile(__dirname + '/Public/login/loginTmpl.html');
})

// Google Login
Passport.use(new GoogleStrategy({
	clientID: '40867727104-7kiqdv6gqmm2r5t49h5c9o802p0vqou3.apps.googleusercontent.com',
	clientSecret: 'pKph1GLBthGDxBHtzTd9cRjJ',
	callbackURL: 'http://127.0.0.1:' + port + '/auth/google/callback'
}, function(token, tokenSecret, profile, done) {
			userCtrl.updateOrCreate(profile)
				.then(function(user) {
					done(null, user);
				}, function(err) {
					done(err, profile);
				})
  }));


app.get('/auth/google', Passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

app.get('/auth/google/callback',
	Passport.authenticate('google', 
	{ failureRedirect: '/#/login' }),
	function (req, res) {
		res.redirect('/#/map')
	});



//Save User Info______________________________________

//endpoints
	app.post('/api/user/postPin', mapCtrl.pinSpot);
	app.get('/api/user/getpins', mapCtrl.getPins);
	app.put('/api/user/editDays/:pinID', mapCtrl.editDays);
	app.post('/api/user/manualAdd', mapCtrl.manualAdd);
	app.get('/api/user/logout', function(req, res){
	  req.logout();
	  res.redirect('/#/login');
	})

	app.get('/api/user/userInfo', function (req, res) {
		res.status(200).json(req.user)
	})
	app.delete('/api/user/removePin/:pinID', mapCtrl.removePin)


app.listen(port, function() {
	console.log('port: ' + port)
})
