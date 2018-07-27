angular.module('Apps', ['ngMaterial', 'ui.router', 'ngCookies', 'ngAria', 'ngAnimate', 'ngMessages'])

.run(function($state, $rootScope, $mdToast) {
	
    IP = 'http://' + location.host;
    SERVER = IP + "/post";
    $rootScope.error = {};
    $rootScope.toast = {};
    $rootScope.toast.error = function(title , textcontent) {
        $mdToast.show(
            $mdToast.simple()
            .textContent(title)
            .position('top right')
            .hideDelay(2000)
        );
    }
    
    $rootScope.toast.success = function(title , textcontent) {
        $mdToast.show(
            $mdToast.simple()
            .textContent(title)
            .position('top right')
            .hideDelay(2000)
        );
    }
    
    $state.go('login');

})

.config(['$stateProvider', function($stateProvider) {
    login = {
        name: 'login',
        url: '/Login',
        views: {
            'content': {
                templateUrl: 'views/login.html',
                controller: 'AppsCtrl'
            }
        }
    },

    register = {
        name: 'register',
        url: '/Register',
        views: {
            'content': {
                templateUrl: 'views/register.html',
                controller: 'AppsCtrl',
            }
        }
    },

    home = {
        name: 'home',
        url: '/Home',
        views: {
            'content': {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
            }
        }
    },

    $stateProvider.state(login);
    $stateProvider.state(register);
    $stateProvider.state(home);

}])

.controller('AppsCtrl', function($http, $rootScope, $scope, $state, $cookies, $mdToast) {
	$scope.datareg = {};
	$scope.score = {};

    $scope.submit = function(form) {
        var post = {};
        $rootScope.error = {};
        post.instruction = '_login';
        post.username = $scope.username;
        post.password = $scope.password;

        if( $scope.username == undefined || $scope.username == '' ) {
            $rootScope.error.username = true;
            $rootScope.error.msg = 'Username is empty';
        } else if( $scope.password == undefined || $scope.password == '' ) {
            $rootScope.error.password = true;
            $rootScope.error.msg = 'Password is empty';
        } else {
            $http.post( IP + "/login", post)
            .success( function(data) {
                if ( data.success ) {
                	$rootScope.toast.success(data.msg);
                    $cookies.put('user', $scope.username);
                    $state.go('home');
                } else {
				    $rootScope.error.errorlogin = data.msg;
                }
            });
        }
    }
    
    $scope.registration = function(datareg) {
		$http.post( IP + "/post", {
		    "instruction"   : "_registration",
		    "uname"         : datareg.uname,
		    "username"      : datareg.username,
		    "password"      : datareg.password,
		    "confpassword"  : datareg.confpassword,
		    "email"			: datareg.email,
		})
		.success( function(data) {
		    if( data.success ) {
		    	$rootScope.toast.success(data.msg);
		    	$cookies.put('user', datareg.username);
		    	$state.go('home');
		    } else {
		    	$rootScope.toast.error(data.msg);
		    }
		})
    }
    
	$scope.reset = function() {
		$scope.username = "";
		$scope.password = "";
		$rootScope.error = {};
	}

	$scope.gotoregister = function() {
		$state.go('register');
	}
	$scope.backlogin = function() {
		$state.go('login');
	}
})
.controller('HomeCtrl', function($http, $rootScope, $scope, $state, $cookies, $mdToast) {
	$scope.scorefrom = false;
	$rootScope.profile = {};
	$scope.score = {};
	$scope.error = {};

	$rootScope.username = $cookies.get('user');

	$scope.getdatascore = function() {
		$http.post( IP + "/post", {
			"instruction"	: "_profile",
			"user"			: $cookies.get('user')
		})
		.success( function(data) {
			if( data.failed ) {
				$rootScope.toast.error(data.msg);
			} else {
				$rootScope.toast.success(data.msg);
				$state.go('home');
				$rootScope.profile = data;
				$rootScope.profile.birthdate = new Date(data.birthdate);
			}
		})
	}
	
	$scope.getdataprofile = function() {
		$http.post( IP + "/post", {
			"instruction"	: "_score"
		})
		.success( function(data) {
			$rootScope.scoring = data.data[0].score;
		})
	}
	
	$scope.getdataprofile();
	$scope.getdatascore();
	
	$scope.saveprofile = function(formdata) {
		console.log(JSON.stringify(formdata));
		$http.post( IP + "/post", {
			"instruction": "_saveprofile",
			"user": $cookies.get('user'),
			"name": formdata.name,
			"sex": formdata.sex,
			"religion": formdata.religion,
			"address": formdata.address,
			"city": formdata.city,
			"hobby": formdata.hobby,
			"about": formdata.about,
			"workplace": formdata.workplace,
			"workstatus": formdata.workstatus,
			"nationality": formdata.nationality,
			"language": formdata.language,
			"birthdate": formdata.birthdate,
			"email": formdata.email,
			"phone": formdata.phone,
			"linkedin": formdata.linkedin,
			"gplus": formdata.gplus,
		})
		.success( function(data) {
			if( data.success ) {
				$scope.scorefrom = true;
				$rootScope.toast.success(data.msg);
			} else {
				$rootScope.toast.error(data.msg);
			}
		})
	}
	
    $scope.savescore = function(formdata) {
		$scope.error = {};
		$http.post( IP + "/post", {
		    "instruction": "_savescore",
		    "user": $cookies.get('user'),
		    "saving": formdata.saving,
		    "loan": formdata.loan,
		})
		.success( function(data) {
		    if( data.success ) {
		    	$scope.error.save = true;
		    	$scope.error.msg = data.msg
		    } else {
		    	$scope.successsave = true;
		    	$scope.successmsg = data.msg;
		    	setTimeout( function() {		    		
					$scope.successsave = false;
					$scope.successmsg = "";
		    	}, 2000)
		    }
		})
    }

	$scope.gotoregister = function() {
		$state.go('register');
	}
	$scope.backlogin = function() {
		$state.go('login');
	}

})
