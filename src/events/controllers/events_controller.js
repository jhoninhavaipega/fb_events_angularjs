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
