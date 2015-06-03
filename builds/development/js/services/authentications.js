myApp.factory('Authentication',function($rootScope,$firebase,$location,FIREBASE_URL,$firebaseAuth){
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);

	var myObject= {
		login: function(user){
			//console.log(user);
			 var userRef = new Firebase(FIREBASE_URL+'/users/'+user.uid);
			 var userObj = $firebase(userRef).$asObject();
			 userObj.$loaded().then(function(){
			 	$rootScope.currentUser = userObj;
			 });

			return authObj.$authWithPassword({
				email:user.email,
				password:user.password
			})
		},
		logout: function(){
			return authObj.$unauth();
		},
		register: function(user){
			return authObj.$createUser({
				email:user.email,
				password:user.password
			}).then(function(regUser){
				var ref = new Firebase(FIREBASE_URL+'users');
				var firebaseUsers= $firebase(ref);

				var userInfo = {
					date:Firebase.ServerValue.TIMESTAMP,
					regUser:regUser.uid,
					firstname:user.firstname,
					lastname:user.lastname,
					email:user.email
				}
				firebaseUsers.$set(regUser.uid,userInfo);
			});
		},
		signedIn: function(){
			// if(authObj.$getAuth()!=null){
			// 	var ref1 = new Firebase(FIREBASE_URL+'/users/'+authObj.$getAuth().uid);
			// 	var user1 =  $firebase(ref1).$asObject();
			// 	user1.$loaded().then(function(){
			// 		$rootScope.currentUser = user1;
			// 	})
			// }
			return authObj.$getAuth() !=null;
		}
	} 
	$rootScope.signedIn=function(){
			return myObject.signedIn();
		}
	return myObject;
})