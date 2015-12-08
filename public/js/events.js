;(function() {
"use strict";

angular
  .module('events', ['FB']);
}());

;(function() {
"use strict";

angular
  .module('events')
  .controller('EventsController', EventsController);

EventsController.$inject = ['$scope', 'Events'];

function EventsController($scope, Events) {
  var vm = $scope;

  vm.showModal = false;

  vm.showEvents = showEvents;
  vm.selectEvent = selectEvent;
  vm.hideModal = hideModal;

  function showEvents() {
    Events.show();

    showModal();
  };

  function selectEvent(event) {
    vm.event = event;

    hideModal();
  };

  function showModal() {
    vm.showModal = true;
  };

  function hideModal() {
    vm.showModal = false;
  };

  vm.$on('events', function(event, response) {
    vm.events = response.body.data;
  });
};
}());

;(function() {
"use strict";

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
}());

;(function() {
"use strict";

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
}());
