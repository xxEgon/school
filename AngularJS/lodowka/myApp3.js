 var app = angular.module("myApp", ["ngRoute"]);

 app.config(function ($routeProvider) {
     $routeProvider
         .when("/", {
             templateUrl: "./start.html"
         })
         .when("/moja", {
             templateUrl: "./lodowka.html"
         })
         .otherwise({
             redirectTo: "/"
         })
 });

 app.controller("myCtrl", function ($scope, draggable, $compile, resizable, $location, myajax, $rootScope, indexUp, $timeout) {
     draggable.log();
     resizable.log();
     $rootScope.showLayer = false;
     $rootScope.naLodowce = 0;
     $rootScope.przebieg = 0;
     $rootScope.loadFromArray = function (magnets) {
         var max = 0;
         var indMax = -1;
         for (var i = 0; i < magnets.length; i++) {
             console.log("Add magnet from tab ", i);
             var el = $compile("<div my-magnet></div>")($scope);
             angular.element(document.querySelector('#magnetTab')).append(el);
             el.css({
                 position: "absolute",
                 top: magnets[i].top + "px",
                 left: magnets[i].left + "px",
                 width: magnets[i].width + "px",
                 height: magnets[i].height + "px",
                 zIndex: magnets[i].zindex,
                 minWidth: "200px",
                 minHeight: "150px",
                 border: "3px black solid",
                 borderRadius: "20px",
                 backgroundColor: "rgba(0, 0, 0, 0.8)",
                 color: "white",
                 padding: "10px",
                 cursor: "all-scroll",
             });
             el.children()[0].innerHTML = magnets[i].tekst;
             el.attr("id", magnets[i].id + "m")
             if (magnets[i].zindex > max) {
                 max = magnets[i].zindex;
                 indMax = magnets[i].id + "m";
             }
         }
         indexUp.setCounter(max);
         angular.element(document.getElementById(indMax)).css("backgroundColor", "rgba(25,25,112, 0.95)");
     }
     $scope.add = function () {
         console.log("Add magnet");
         var el = $compile("<div my-magnet></div>")($scope);
         el.css({
             position: "absolute",
             top: "200px",
             left: "200px",
             width: "200px",
             height: "150px",
             minWidth: "200px",
             minHeight: "150px",
             border: "3px black solid",
             borderRadius: "20px",
             backgroundColor: "rgba(0, 0, 0, 0.8)",
             color: "white",
             padding: "10px",
             cursor: "all-scroll"
         });
         angular.element(document.querySelector('#magnetTab')).append(el);

         $rootScope.naLodowce++;
         $rootScope.przebieg++;

         $scope.el = el;

         console.log("index1:", el.css("z-index"))
         $timeout(function () {
             myajax.execute({
                 action: "add",
                 name: $rootScope.name,
                 height: el.css("height").slice(0, -2),
                 width: el.css("width").slice(0, -2),
                 top: el.css("top").slice(0, -2),
                 left: el.css("left").slice(0, -2),
                 zindex: el.css("z-index"),
                 tekst: el.children()[0].innerHTML
             }, $scope)
         })
     }
     $scope.goclick = function () {
         if ($scope.nameLodowka == null)
             $location.path('/');
         else {
             console.log("GO", $scope.nameLodowka);
             $rootScope.name = $scope.nameLodowka;
             $location.path('/moja');

             myajax.execute({
                 action: "go",
                 data: $scope.nameLodowka
             }, $rootScope)
             indexUp.setCounter(-1);


         }
     }
 })

 app.service("myajax", function ($http, $rootScope) {
     this.execute = function (obj, scope) {
         $http({
             url: "ajax.php",
             method: "GET",
             params: obj
         }).then(function (response) {
             console.log("DATA:", response.data)
             switch (obj.action) {
             case "go":
                 scope.naLodowce = response.data.counter1;
                 scope.przebieg = response.data.counter2;
                 var magnets = response.data.magnets;
                 if (magnets.length > 0)
                     $rootScope.loadFromArray(magnets);
                 break;
             case "add":
                 scope.el.attr("id", response.data.id + "m");
                 break;
             }
         })
     }
 })

 app.service("draggable", function (myajax, $rootScope) {

     this.log = function () {
         console.log("Serwis 'draggable' log");
     }
     var liczNotatek = 0;
     this.init = function (element, doc) {
         var x = 0;
         var y = 0;
         var startX = 0;
         var startY = 0;
         var el = element;

         function mousemove(event) {
             y = event.pageY - startY;
             x = event.pageX - startX;
             el.css({
                 top: y + 'px',
                 left: x + 'px'
             });
             //console.log(x, y, startX, startY);
         }

         function mouseup() {
             doc.off('mousemove', mousemove);
             doc.off('mouseup', mouseup);

             //console.log(x, y, startX, startY);

             myajax.execute({
                 action: "updatePosition",
                 name: $rootScope.name,
                 id: el.attr("id").slice(0, -1),
                 top: el.css("top").slice(0, -2),
                 left: el.css("left").slice(0, -2)
             }, $rootScope)
         }

         el.on('mousedown', function (event) {
             event.preventDefault();
             //console.log(el.css("left").slice(0, -2), el.css("top").slice(0, -2))
             startX = event.pageX - el.css("left").slice(0, -2);
             startY = event.pageY - el.css("top").slice(0, -2);
             doc.on('mousemove', mousemove);
             doc.on('mouseup', mouseup);
             console.log("Drag");
         });
     }
 });

 app.service("resizable", function (myajax, $rootScope) {
     this.log = function () {
         console.log("Serwis 'resizable' log");
     };
     this.init = function (element, doc) {
         var el = angular.element("<div class='resizeDiv'></div>");
         element.append(el);
         var el2 = element;
         var startX = 0;
         var startY = 0;
         var x = 200;
         var y = 150;

         function mousemove(event) {
             y = event.pageY - startY;
             x = event.pageX - startX;
             el2.css({
                 height: y + 'px',
                 width: x + 'px'
             });
         }

         function mouseup() {
             doc.off('mousemove', mousemove);
             doc.off('mouseup', mouseup);

             myajax.execute({
                 action: "updateSize",
                 name: $rootScope.name,
                 id: el2.attr("id").slice(0, -1),
                 height: el2.css("height").slice(0, -2),
                 width: el2.css("width").slice(0, -2)
             }, $rootScope)
         }

         el.on('mousedown', function (event) {
             event.stopPropagation();
             //console.log(el2.css("width").slice(0, -2), el2.css("height").slice(0, -2))
             startX = event.pageX - el2.css("width").slice(0, -2);
             startY = event.pageY - el2.css("height").slice(0, -2);
             doc.on('mousemove', mousemove);
             doc.on('mouseup', mouseup);
             console.log("Resize");
         });
     }
 });

 app.service("remove", function (myajax, $rootScope, indexUp, $compile) {
     this.init = function (element) {
         var el = angular.element("<div class='removeDiv'></div>");
         //var el = $compile("<div class='removeDiv'></div>")($rootScope)
         element.append(el);
         el.on("click", function () {
             indexUp.remove(element);
             element.remove();
             myajax.execute({
                 action: "remove",
                 name: $rootScope.name,
                 id: element.attr("id").slice(0, -1)
             }, $rootScope)
             $rootScope.naLodowce--;
         })
     }
 })
 app.service("edit", function (myajax, $rootScope, $timeout) {
     this.init = function (element) {
         var el = angular.element("<div class='editDiv'></div>");
         //console.log("mmm", element, el[0]);
         //angular.element(element[0]).append(el)
         element.append(el);
         el.on("click", function (event) {
             tinymce.remove();
             tinymce.init({
                 target: document.getElementById('wysiwyg'),
                 width: "500px",
                 height: "300px",
                 resize: false,
                 setup: function (ed) {
                     $rootScope.showLayer = true;
                     ed.on("init",
                         function (ed) {
                             tinyMCE.activeEditor.setContent(element.children()[0].innerHTML);
                             tinyMCE.execCommand('mceRepaint');
                         }
                     );
                 },
                 init_instance_callback: function () {

                     angular.element(document.getElementsByClassName("mce-tinymce")[0]).on("mousedown", function (event) {
                         event.stopPropagation();
                     })
                     var cancelEdit = angular.element("<button class='cancelEdit'></button>");
                     cancelEdit.css({
                         position: "absolute",
                         right: "5px",
                         bottom: "5px",
                         width: "30px",
                         height: "30px",
                         background: "url('img/cancel.png')",
                         backgroundSize: "100% 100%",
                         cursor: "pointer",
                     });
                     //var beforeText = element.children()[0].innerHTML;
                     cancelEdit.on("click", function () {
                         console.log("Cancel");
                         tinymce.remove();
                         //element.children()[0].innerHTML = beforeText;
                         document.getElementById('wysiwyg').innerHTML = "";
                         $timeout(function () {
                             //console.log( "show1:", $rootScope.showLayer)
                             $rootScope.showLayer = false;
                             // console.log( "show2:", $rootScope.showLayer)
                         })
                     });
                     angular.element(document.getElementsByClassName("mce-tinymce")[0]).append(cancelEdit);
                     var saveEdit = angular.element("<button class='saveEdit'></button>");
                     saveEdit.css({
                         position: "absolute",
                         right: "40px",
                         bottom: "5px",
                         width: "30px",
                         height: "30px",
                         background: "url('img/confirm.png')",
                         backgroundSize: "100% 100%",
                         cursor: "pointer",
                     });
                     saveEdit.on("click", function () {
                         console.log("Save");
                         var textFrom = tinymce.activeEditor.getContent({
                             format: 'raw'
                         });
                         //console.log("textFrom:", textFrom);
                         element.children()[0].innerHTML = textFrom;
                         tinymce.remove();
                         document.getElementById('wysiwyg').innerHTML = "";
                         myajax.execute({
                             action: "updateTekst",
                             name: $rootScope.name,
                             id: element.attr("id").slice(0, -1),
                             tekst: element.children()[0].innerHTML
                         }, $rootScope);
                         $rootScope.showLayer = false;
                     });
                     angular.element(document.getElementsByClassName("mce-tinymce")[0]).append(saveEdit);
                 }
             });
         })
     }
 })
 app.service("indexUp", function (myajax, $rootScope) {
     var indexCounter = -1;
     this.init = function (element) {
         //console.log("SET ZINDEX:", element.css("z-index"))
         if (element.css("z-index") == "") {
             console.log("index2:", element.css("z-index"))
             var tC = document.querySelector('#magnetTab').childNodes;
             for (var i = 0; i < tC.length; i++) {
                 tC[i].style.backgroundColor = "rgba(0, 0, 0, 0.8)";
             }
             element.css("z-index", ++indexCounter);
             element.css("backgroundColor", "rgba(25,25,112, 0.95)");
         }
         element.on("mousedown", function () {
             console.log("indexUp", element.css("z-index"));
             var max = 0;
             var tC = document.querySelector('#magnetTab').childNodes;
             for (var i = 0; i < tC.length; i++) {
                 if (max < tC[i].style.zIndex)
                     max = tC[i].style.zIndex;
                 if (tC[i].style.zIndex > element.css("z-index")) {
                     tC[i].style.zIndex--;
                     //                     myajax.execute({
                     //                         action: "updateIndex",
                     //                         name: $rootScope.name,
                     //                         id: tC[i].id.slice(0, -1),
                     //                         zindex: tC[i].style.zIndex
                     //                     }, $rootScope)
                     console.log("indexSend:" + i, parseInt(tC[i].style.zIndex) + 1, "=>", tC[i].style.zIndex);
                 } else
                     console.log("index:" + i, parseInt(tC[i].style.zIndex), "=>", tC[i].style.zIndex);
                 tC[i].style.backgroundColor = "rgba(0, 0, 0, 0.8)";

             }
             console.log("max:" + i, element.css("z-index"), "=>", max);
             myajax.execute({
                 action: "updateIndex",
                 name: $rootScope.name,
                 id: element.attr("id").slice(0, -1),
                 zindex: element.css("z-index")
             }, $rootScope);
             element.css("z-index", max);
             element.css("backgroundColor", "rgba(25,25,112, 0.95)");
         });
     }
     this.remove = function (element) {
         var tC = document.querySelector('#magnetTab').childNodes;
         //         for (var i = 0; i < tC.length; i++) {
         //             if (tC[i].style.zIndex > element.css("z-index")) {
         //                 tC[i].style.zIndex = --tC[i].style.zIndex;
         //                 myajax.execute({
         //                     action: "updateIndex",
         //                     name: $rootScope.name,
         //                     id: tC[i].id.slice(0, -1),
         //                     zindex: tC[i].style.zIndex
         //                 }, $rootScope)
         //             }
         //         }
         myajax.execute({
             action: "setIndex",
             name: $rootScope.name,
             id: element.attr("id").slice(0, -1),
             zindex: element.css("z-index")
         }, $rootScope);
         indexCounter--;
     }
     this.setCounter = function (number) {
         indexCounter = number;
     }
 })

 app.directive("myMagnet", ['draggable', '$document', 'resizable', 'remove', 'edit', 'indexUp', '$timeout', function (draggable, $document, resizable, remove, edit, indexUp, $timeout) {
     function link(scope, element) {
         $timeout(function () {
             resizable.init(element, $document);
             draggable.init(element, $document);
             remove.init(element);
             edit.init(element);
             indexUp.init(element);
         })
     }
     return {
         template: '<div class="magnet"></div>',
         link: link
     }
 }])