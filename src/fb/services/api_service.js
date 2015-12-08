angular
  .module('FB')
  .service('FB_Api', Api);

Api.$inject = ['$q'];

function Api($q) {
  var vm = this;

  vm.get = api;
  vm.post = api;
  vm.put = api;
  vm.delete = api;

  function api(parameters) {
    var data = {},
        deferred = $q.defer();

    FB.api(parameters.path, parameters.method, parameters.params, function(response) {
      data.body = response;

      if(response.hasOwnProperty('error')) {
        data.status = 'error';

        deferred.reject(data);
      } else {
        data.status = 'success';

        deferred.resolve(data);
      }
    });

    return deferred.promise;
  };
};