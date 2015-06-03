myApp.factory('Authentication',function($firebase,$location,FIREBASE_URL,$firebaseAuth){
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);

	var myObject= {
		login: function(user){
			return authObj.$authWithPassword({
			email:user.email,
			password:user.password
		});
		}
	}
	return myObject;
})