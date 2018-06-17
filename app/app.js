var electron = require("electron");
var currentWindow = electron.remote.getCurrentWindow();
var app = angular.module("electro-music", ["angularSoundManager"]);

/**
 * Main controller
 */
app.controller("MainController", function ($scope, angularPlayer) {

  // Store shared data
  $scope.shared = currentWindow.shared;

  // Repeat by default
  angularPlayer.repeatToggle();

  /**
   * On angular player ready
   */
  $scope.$on("angularPlayer:ready", function (event, data) {
    // Add all files to playlist
    angular.forEach($scope.shared.files, function (file, index) {
      angularPlayer.addTrack(file);
    });
    // Auto play
    angularPlayer.play();
  });
});

/**
 * Duration filter
 */
app.filter("duration", function ($filter) {
  return function (seconds) {
    var output = $filter("date")(new Date(0, 0, 0).setSeconds(seconds), "HH:mm:ss");
    if (output.toString().indexOf("00:") === 0) {
      output = $filter("date")(new Date(0, 0, 0).setSeconds(seconds), "mm:ss");
    }
    return output;
  };
})
