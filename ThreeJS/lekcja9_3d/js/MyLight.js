﻿/*
    klasa światła, utworzona w pliku MyLight.js
*/

function MyLight(X, Z) {

    var contLights = new THREE.Object3D();

    function init() {
        var light = new THREE.PointLight(0xff6600, 0.6, 2000);
        light.castShadow = false;
        contLights.add(light)
    }
    init();
    this.getLight = function () {
        return contLights;
    }
}