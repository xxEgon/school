 var app = angular.module("myApp", ["ngRoute"]);

 app.controller("controller", function ($scope, $routeParams, $location) {
     //console.log($location.path())
     $scope.tryb = $location.path().substr(-2, 2);
     console.log($scope.tryb);
     //$scope.zmienne = $routeParams;
     //document.getElementById("title").innerHTML = "MEMORY (" + $scope.zmienne.ile + "[s])";
 })

 app.controller("importantCtrl", function ($scope, $rootScope, $route) {
     $rootScope.showAlert = true;
     $rootScope.alert = "";
     $scope.restart = function () {
         console.log("RESTART");
         $rootScope.stopTimer();
         $route.reload();
     }
     $scope.return = function () {
         console.log("RETURN");
         $rootScope.stopTimer();
     }
 })

 app.config(function ($routeProvider) {
     $routeProvider
         .when("/", {
             templateUrl: "template.html"
         })
         .when("/tryb/30", {
             templateUrl: "ile.html",
             controller: "controller",
         })
         .when("/tryb/60", {
             templateUrl: "ile.html",
             controller: "controller",
         })
         .when("/tryb/90", {
             templateUrl: "ile.html",
             controller: "controller",
         })
         .otherwise({
             redirectTo: "/"
         })
 });

 app.controller("gameController", function ($scope, $timeout, $rootScope) {

     $rootScope.showAlert = false;
     $rootScope.alert = "";

     var pairsNr = 8;
     var tTopCard = [];
     var tPic = [];
     var tCardNr = [];
     var tOpened = [];
     for (var i = 0; i < 16; i++) {
         tCardNr[i] = i + 1;
         tTopCard[i] = 0;
     }
     for (var i = 0; i < 16; i++) {
         var rand = Math.floor(Math.random() * tCardNr.length);
         if (tCardNr[rand] <= 8)
             tPic[i] = tCardNr[rand];
         else
             tPic[i] = tCardNr[rand] - 8;
         tCardNr.splice(rand, 1);
     }
     var TopCard = 0;
     $scope.tTopCard = tTopCard;
     $scope.tPic = tPic;
     var firstClick = true;
     $scope.clickPiece = function (that, ind) {
         //console.log(tOpened.length)
         if (firstClick) {
             $rootScope.startTimer();
             firstClick = false;
         }

         switch (tOpened.length) {
             case 0:
                 tTopCard[ind] = tPic[ind];
                 tOpened.push(ind);
                 break;
             case 1:
                 tOpened.push(ind);
                 tTopCard[ind] = tPic[ind];
                 //console.log(tTopCard[tOpened[0]], ind)
                 if (tPic[tOpened[0]] == tPic[ind]) {
                     pairsNr--;
                     console.log("ZNALEZIONA PARA - pozostało: " + pairsNr)
                     tOpened.splice(0, tOpened.length);
                     if (pairsNr == 0) {
                         console.log("WYGRANA KONIEC");
                         $scope.showAlert = true;
                         $scope.alert = "WYGRANA!";
                         $rootScope.endOfTime = true;
                         $rootScope.stopTimer();
                     }
                 } else
                     $timeout(function () {
                         console.log("CLEAR");
                         for (var i = 0; i < tOpened.length; i++) {
                             tTopCard[tOpened[i]] = TopCard;
                         }
                         tOpened.splice(0, tOpened.length);
                     }, 500);
                 break;
         }
     }
 })

 app.directive("myPlayfield", function () {
     return {
         templateUrl: "gra.html",
         controller: "gameController"
     }
 })

 app.directive("myTime", ['$interval', '$rootScope', function ($interval, $rootScope) {
     function link(scope) {
         $rootScope.startTimer = function () {
             scope.endOfTime = false;
             scope.color = "#ffffff";
             var changed = false;
             var full = scope.time * 1000;
             var d = new Date().getTime() + full;
             var d2 = d - (new Date().getTime());
             $rootScope.int = $interval(function () {
                 time = new Date().getTime();
                 var time = d - time;
                 time2 = time;

                 var m = Math.floor(time / (60 * 1000));
                 time -= (m * 60 * 1000)
                 if (m.toString().length == 1)
                     m = "0" + m;
                 var s = Math.floor(time / 1000);
                 time -= (s * 1000)
                 if (s.toString().length == 1)
                     s = "0" + s;
                 var ms = time;
                 if (ms.toString().length == 2)
                     ms = "0" + ms
                 if (ms.toString().length == 1)
                     ms = "00" + ms;

                 czas = m + ":" + s + "." + ms;

                 left = time2;
                 scope.left = (left * 100) / d2;
                 scope.leftTime = left / 10;
                 if (!changed && scope.left < 20) {
                     scope.color = "#ff6666";
                     changed = true;
                 }
                 if (scope.left <= 0) {
                     scope.endOfTime = true;
                     console.log("KONIEC CZASU!");
                     $rootScope.showAlert = true;
                     scope.left = 0;
                     scope.timeToShow = "00:00.000";
                     $rootScope.alert = "KONIEC CZASU!";
                     $interval.cancel($rootScope.int);
                 } else
                     scope.timeToShow = czas;
             }, 1);
         }

         $rootScope.stopTimer = function () {
             $interval.cancel($rootScope.int);
             console.log("TIMER STOPPED")
         }
     }
     return {
         templateUrl: "czas.html",
         link: link,
         scope: {
             time: "@myTime",
         }
     }
 }])