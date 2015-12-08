angular
  .module('events')
  .service('Events', Events);

Events.$inject = ['$rootScope', 'Account', 'FB_Api'];

function Events($rootScope, Account, FB_Api) {
  var vm = this;

  vm.show = get;

  function all() {
    var events = null;

    FB_Api.get({
      path: 'me/events',
      method: 'GET',
      params: { fields: 'name, description, cover, start_time, end_time, interested_count' }
    }).then(
      function(response) {
        $rootScope.$broadcast('events', response);
      },
      function(response) {
        console.error(response.status);
      }
    );
  };

  function get() {
    Account.checkAuthentication(all);
  };
};
