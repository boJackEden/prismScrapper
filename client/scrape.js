var app = angular.module('aboutMe', []);
app.controller('AboutMeController', function($http) {
  var vm = this;
  console.log('Fetching Data...');
  $http.get('/scrape').then(function(resObj) {
    vm.people = resObj.data.people;
    console.log('BOOM!');
  });
});
