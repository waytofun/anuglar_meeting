myApp.controller('StatusController', function($scope,$rootScope,$firebase, FIREBASE_URL,$firebaseAuth,Authentication,$location){
	
	$scope.logout=function(){
		Authentication.logout();
		$rootScope.currentUser= null;
		$location.path('/login');
	}
	$rootScope.$on('$firebaseAuth:authWithPassword',function(e,authUser){	
		//console.log(authUser);
		var ref = new Firebase(FIREBASE_URL+'/users/'+authUser.uid);
		var user =  $firebase(ref).$asObject();
		user.$loaded().then(function(){
			$rootScope.currentUser = user;
		})
	});
});