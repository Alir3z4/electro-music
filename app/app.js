var electron = require("electron");
var currentWindow = electron.remote.getCurrentWindow();
var app = angular.module("electro-music", []);

/**
 * Main controller
 */
app.controller("MainController", function ($scope, $timeout) {

  // Checking for data
  $scope.checking = true;

  // Check for files
  var checkShared = function () {

    // Is there any data
    if (currentWindow.shared.files) {

      // Store shared data
      $scope.shared = currentWindow.shared;

      // Get songs
      $scope.songs = $scope.shared.files;

      // Done checking
      $scope.checking = false;
    }

    // No data, check again
    else {
      $timeout(checkShared, 1000);
    }
  }

  // Start checking for shared data
  checkShared();
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
