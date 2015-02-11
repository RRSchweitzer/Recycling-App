var app = angular.module('mapTrack');

app.service('firebaseService', function ($firebase) {
  var firebaseUrl = 'https://favoritepins.firebaseio.com/login/';

  this.getUser = function(userId){
    return $firebase(new Firebase(firebaseUrl + 'users/' + userId)).$asObject();
  };

  this.getPins = function(userId){
    return $firebase(new Firebase(firebaseUrl + 'users/' + userId + '/pins')).$asArray();
  }
})