angular
  .module('FB')
  .service('FB_Account', Account);

Account.$inject = ['$q'];

function Account($q) {
  var vm = this;

  vm.checkAuthentication = checkAuthentication;
  vm.login = login;

  function checkAuthentication() {
    var data = {},
        deferred = $q.defer();

    FB.getLoginStatus(function(response) {
      data.body = response;

      switch(response.status) {
        case 'connected':
          data.status = response.status;

          deferred.resolve(data);
          break;

        case 'not_authorized':
          data.status = response.status;

          deferred.reject(data);
          break;

        default:
          data.status = 'not_logged_on_facebook';

          deferred.notify(data);
          break;
      }
    });

    return deferred.promise;
  };

  function login(scopes) {
    var data = {},
        deferred = $q.defer();

    FB.login(function(response) {
      data.body = response;

      if (response.authResponse) {
        data.status = 'success';

        deferred.resolve(data);
      } else {
        data.status = 'error';

        deferred.reject(data);
      }
    }, scopes);

    return deferred.promise;
  };
};