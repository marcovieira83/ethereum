var app = angular.module("mySimpleWalletDapp", ['ngRoute']);

app.controller('MainController', function ($scope) {
  var contract = SimpleWallet.deployed();
  $scope.balance = web3.eth.getBalance(contract.address).toNumber();
  $scope.balanceInEther = web3.fromWei($scope.balance, "ether");
});

app.controller("ShowEventsController", function ($scope) {
  $scope.myVar = "ShowEvents";
});

app.controller("SendFundsController", function ($scope) {
  $scope.accounts = web3.eth.accounts;
  $scope.depositFunds = function(address, amount) {
    var contract = SimpleWallet.deployed();

    web3.eth.sendTransaction({from: address, to: contract.address,
      value: web3.toWei(amount, "ether")}, function(error, result) {
        if (error) {
          $scope.has_errors = "I did not work";
        } else {
          $scope.transfer_success = true;
        }
        $scope.$apply();
      });
  }
});

app.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "views/main.html",
    controller: "MainController"
  }).when("/events", {
    templateUrl: "views/events.html",
    controller: "ShowEventsController"
  }).when("/sendfunds", {
    templateUrl: "views/sendfunds.html",
    controller: "SendFundsController"
  });
});
