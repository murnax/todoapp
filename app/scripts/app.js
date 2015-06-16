(function(){
	'use strict';

	/**
	* @ngdoc overview
	* @name todoappApp
	* @description
	* # todoappApp
	*
	* Main module of the application.
	*/
	angular.module('todoApp', [
		'ngCookies',
		'ui.router',
		'LocalStorageModule'
	])
		.config(config)
		.run(run);

	/////////////////////////////////////////////

	function config($locationProvider, $urlRouterProvider, localStorageServiceProvider){
		$urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        // set prefix to avoid overwriting
        localStorageServiceProvider
        	.setPrefix('todoApp');
	}

	function run($rootScope, $state){

	}

	angular.module('todoApp')
	.filter('reverse', function() {
  		return function(items) {
    		return items.slice().reverse();
  		};
	});

})();
