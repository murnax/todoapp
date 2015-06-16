(function(){
	'use strict';
	angular.module('todoApp')
		.config(config);

	/////////////////////////////////////////////

	function config($stateProvider){
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			});
	}

})();