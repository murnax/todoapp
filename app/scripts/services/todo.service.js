(function(){
	'use strict';
	angular.module('todoApp')
		.factory('Todo', Todo);

	/////////////////////////////////////////////

	function Todo(localStorageService){
		var todos = [];

		if(localStorageService.get('todos') !== null){
			todos = localStorageService.get('todos');
		}

		return {
			create: create,
			toggleCompleted: toggleCompleted,
			updateTodo: updateTodo,
			destroy: destroy,
			clearAll: clearAll,
			get: get
		}

		function create(todo){
			todo.created_date = new Date();
			todos.unshift(todo);
			_updateStorage(todos);
		}

		// update status of todo from 'active' to 'completed' and vice-verca
		function toggleCompleted(index, todo){
			todos[index] = todo;
			_updateStorage(todos);
		}

		function updateTodo(index, todo){
			todos[index] = todo;
			_updateStorage(todos);
		}

		// destroy todo specify by id
		function destroy(index){
			todos.splice(index, 1);
			_updateStorage(todos);
		}

		// destroy all todos
		function clearAll(){
			todos = [];
			_updateStorage(todos);
		}

		// status can be 'all', 'active', 'completed'
		function get(status){
			return todos;
		}

		function _updateStorage(todos){
			localStorageService.set('todos', todos);
		}
	}

})();