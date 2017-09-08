var app = angular.module('smartBeing', [])
app.controller('todoController', ['$scope', function($scope){
	$scope.todoList = [];
	$scope.addTodo = function (todo) {
		$scope.todoList.push({todo: todo, date: new Date()});
		$scope.todo = ''
	}
}]);