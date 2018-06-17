var electron = require("electron");
var currentWindow = electron.remote.getCurrentWindow();
var app = angular.module("electro-music", []);

/**
 * Main controller
 */
app.controller("MainController", function ($scope, $timeout) {

    // Store shared data
    $scope.shared = currentWindow.shared;

    // Get songs
    $scope.songs = $scope.shared.files;
});

/**
 * Duration filter
 */
app.filter("duration", function ($filter) {
  return function (seconds) {
    if (seconds >= 3600) {
      var output = $filter("date")(new Date(0, 0, 0).setSeconds(seconds), "HH:mm:ss");
    }
    return $filter("date")(new Date(0, 0, 0).setSeconds(seconds), "mm:ss");
  };
});
