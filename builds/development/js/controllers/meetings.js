myApp.controller('meetingsController', function($rootScope,$scope, $firebase,$firebaseAuth,FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);
	var authObj = $firebaseAuth(ref);

	var authUser=authObj.$getAuth();

	//authObj.$getAuth().then(function(authUser){

		if(authUser!==null){
			var ref= new Firebase(FIREBASE_URL+'/users/'+ authUser.uid+'/meetings');
			var meetingsInfo=$firebase(ref);
			var meetingsObj = $firebase(ref).$asObject();
			var meetingsArray = $firebase(ref).$asArray();

			var userRef = new Firebase(FIREBASE_URL+'/users/'+authUser.uid);
			var userObj = $firebase(userRef).$asObject();
			userObj.$loaded().then(function(){
			 	$rootScope.currentUser = userObj;
			});

			meetingsObj.$loaded().then(function(data){
				$scope.meetings = meetingsObj;
			});

			meetingsArray.$loaded().then(function(data){
				$rootScope.howManyMeetings = meetingsArray.length;
			})
			//$scope.meetings=meetings.$asObject();
			meetingsArray.$watch(function(event){
				$rootScope.howManyMeetings = meetingsArray.length;
			});

			$scope.addmeeting=function(){
				meetingsInfo.$push({
					name: $scope.meetingname,
					date: Firebase.ServerValue.TIMESTAMP
				}).then(function(){
					$scope.meetingname='';
				});
			}
			$scope.deleteMeeting=function(key){
				meetingsInfo.$remove(key);
			}

		}
	//})
});