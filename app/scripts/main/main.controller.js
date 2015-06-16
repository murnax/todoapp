(function(){
	'use strict';
	angular.module('todoApp')
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope', 'localStorageService', 'Todo'];
	function MainCtrl($scope, localStorageService, Todo){

		$scope.todos = Todo.get('all');
		$scope.totalActive = getTotalActive();

		$scope.title = '';
		$scope.selectedTodo = null;
		$scope.editedTodo = null;
		
		$scope.filterStatus = '';
		if(localStorageService.get('settings') !== null){
			$scope.filterStatus = localStorageService.get('settings');
		}

		$scope.createTodo = createTodo;
		$scope.destroyTodo = destroyTodo;
		$scope.clearAll = clearAll;
		$scope.filter = filter;
		$scope.toggleCompleted = toggleCompleted;
		$scope.editTodo = editTodo;
		$scope.selectTodo = selectTodo;
		$scope.updateTodo = updateTodo;

		/////////////////////////////////////////////

		function createTodo(title){

			// todo model
			var todo = {
				title: title,
				completed: false
			}

			Todo.create(todo);
			$scope.title = ''; // clear input field
			$scope.totalActive = getTotalActive();
			// $scope.todos.reverse();
		}

		function clearAll(){
			Todo.clearAll();
			$scope.todos = Todo.get();
			$scope.totalActive = getTotalActive();
		}

		function destroyTodo(index){
			Todo.destroy(index);
		}

		function editTodo(todo){
			$scope.selectedTodo = null;
			$scope.editedTodo = todo;
		}

		function filter(status){
			$scope.filterStatus = status;
			localStorageService.set('settings', status);
		}

		function getTotalActive(){
			return _.filter($scope.todos, function(todo){
				return !todo.completed;
			}).length;
		}

		function selectTodo(todo){
			$scope.selectedTodo = todo;
			$scope.editedTodo = null;
		}

		function updateTodo(index, todo){
			Todo.toggleCompleted(index, todo);
			$scope.editedTodo = null;
			$scope.selectedTodo = null;
			$scope.totalActive = getTotalActive();
		}

		function toggleCompleted(index, todo){
			Todo.toggleCompleted(index, todo);
			$scope.totalActive = getTotalActive();
		}

		$scope.$watch('todos', function(newVal){
			$scope.totalActive = getTotalActive();
		});
	}
})();