myApp.controller('RegistrationController',function($rootScope,$scope,$location,$firebaseAuth,Authentication,FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);

	$scope.login= function(){
		Authentication.login($scope.user)
		.then(function(user){
			$rootScope.$broadcast('$firebaseAuth:authWithPassword',user);
			//console.log(user);
			$location.path('/meetings');
		},function(error){
			$scope.message=error.toString();
		});
	}
	$scope.register= function(){
		Authentication.register($scope.user)
		.then(function(user){
			Authentication.login($scope.user)
				.then(function(user){
					$rootScope.$broadcast('$firebaseAuth:authWithPassword',user);
				});
				$location.path('/meetings');
		},function(error){
			$scope.message=error.toString();
		});
	}
});