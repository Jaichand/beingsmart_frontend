angular.module('dropzone', []).directive('dropzone', function ($cookies) {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];

    // create a Dropzone for the element with the given options
    // config.options.user = $cookies.get('user');
    dropzone = new Dropzone(element[0], config.options);
    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});