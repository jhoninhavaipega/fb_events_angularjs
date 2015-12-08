angular
  .module('events')
  .service('Account', Account);

Account.$inject = ['FB_Account'];

function Account(FB_Account) {
  var vm = this;

  vm.checkAuthentication = checkAuthentication;

  function checkAuthentication(callback) {
    FB_Account.checkAuthentication()
      .then(
        function(response) {
          callback();
        },
        function(response) {
          login(callback);
        },
        function(response) {
          login(callback);
        }
      );
  };

  function login(callback) {
    FB_Account.login({
      scope: 'user_events'
    }).then(
      function(response) {
        callback();
      },
      function(response) {
        console.error(response.status);
      }
    );
  };
};
