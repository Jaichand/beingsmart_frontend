var app = angular.module('smartBeing', ['ngResource', 'ngCookies', 'dropzone'])
app.controller('todoController', ['$scope', 'todoService', '$cookies', '$location', 
	function($scope, todoService, $cookies, $location){
	$scope.todoList = [];
	$scope.checked = false;
	$scope.url = '/home/jaichand/beingSmart/beingsmart_backend/'
	if (!$cookies.get('user')){
		//First time it will call if cookie is not set
		todoService.getAllTodo({user: $cookies.get('user')}).$promise
		.then( function (cookie) {
			$cookies.put('user', cookie.user);
		})
		.catch (function (err) {
			console.log("Getting Error, while setting cookie", err);
		});
	}
	else {
		// If cookie is already set Call this
		todoService.getAllTodo({user: $cookies.get('user')}).$promise
		.then( function (response) {
			if (response) {
				$scope.todoList = response.todos;
			}
		})
		.catch (function (err) {
			console.log("Error While finding todos", err);
		});
	}

	// For adding todo
	$scope.addTodo = function (todo) {
		if (!todo) {
			return
		}
		todoService.addTodo({todo: todo, date: new Date(), user: $cookies.get('user')}).$promise
		.then (function (response) {
			$scope.todoList.push(response.todo);
		})
		.catch (function (err) {
			console.log("Error While adding Todo", err);
		});
		$scope.todo = ''
	};
  $scope.updateTodo = function (task) {
  	$scope.toggle = 'disabled';
  	$scope.editAbleTodo = JSON.parse(JSON.stringify(task));
  }
	$scope.editTodo = function (editTodo) {
		todoService.editTodo({
			todo: $scope.editAbleTodo,
			user: $cookies.get('user')
		}).$promise
		.then (function (response) {
			editTodo.edit = false;
			editTodo.todo = response.todo.todo;
		})
		.catch(function (err){
			console.log("Error While Editing", err);
		});
		$scope.toggle = 'enabled';
	};

  $scope.cancel = function () {
  	$scope.toggle = 'enabled';
  }

	$scope.deleteTodo = function (todo) {
		todoService.deleteTodo({todo: todo}).$promise
		.then(function (updatedTodo) {
			todo.archive = true;
		})
		.catch(function (err) {
			console.log("Error while deleting", err);
		})
	};
	$scope.dropzoneConfig = {
    'options': { // passed into the Dropzone constructor
      'url': 'http://localhost:8081/api/upload',
      'headers': {
        'X-CSRFToken': $cookies.get('user')
    	}
    },
    'eventHandlers': {
      'sending': function (file, xhr, formData) {
      },
      'success': function (file, response) {
      }
    }
	 };
}]);