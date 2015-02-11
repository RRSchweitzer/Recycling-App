var app = angular.module('mapTrack')

app.service('mapService', function($firebase, $q){

	// var ref = new Firebase('https://favoritepins.firebaseio.com/pins');
	// var sync = $firebase(ref);
	// var itemsArray = sync.$asArray(); //three way binding
	
	// this.getItems = function(){
	// 	return itemsArray;
	// }
	
	// this.removePin = function(pin){
		
	// 	itemsArray.$remove(pin);
	// }

	// var uid = ref.getAuth().uid.replace('simplelogin:', '');

	//return $firebase(new Firebase(firebaseUrl + '/login/users/' + uid))

//reference "firebaseurl/"+uid+"/spots"
//$asArray()


	this.pinSpot = function(pinsArray){
		var dfd = $q.defer();

		navigator.geolocation
		.getCurrentPosition(function(position){
			console.log(position)

			pinsArray.$add({
				coords: position.coords,
				address: 
			}).then(function(){
				dfd.resolve(pinsArray);
			})
			//success callback
			//this is what you get back position.coords.latitude, position.coords.longitude
			
			//save to firebase
			//array.$add(position.coords)
		}, function(){
				alert("geolocation failed");
				dfd.reject();
			//error callback
			//they need to accept geolocation
		}, {
			enableHighAccuracy: true
		})
		console.log("bottom of function");

		return dfd.promise;
	}
	
})
	
		