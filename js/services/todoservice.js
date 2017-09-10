angular.module('smartBeing')
.factory('todoService', function($resource,$http){
	var todo = $resource('http://localhost:8080/api/todo/:id', {
		"id": "@id"
	}, {
		addTodo: {
			url: "http://localhost:8081/api/addTodo",
			method: "POST"
		},
		getAllTodo: {
			url: "http://localhost:8081/api/",
			method: "GET",

		},
		editTodo: {
			url: 'http://localhost:8081/api/editTodo',
			method: "POST"
		},
		deleteTodo: {
			url: 'http://localhost:8081/api/deleteTodo',
			method:"DELETE"
		}
	});
	return todo;
})