function Skybox() {
    var g = 2600;
    var geometry = new THREE.CubeGeometry(g, g, g, 1, 1, 1);

    var materials = [];
    for (var i = 0; i< 6; i++)
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: THREE.ImageUtils.loadTexture(Materials.graphics.skybox[i]) }));

    var faceMaterial = new THREE.MeshFaceMaterial(materials);
    var mesh = new THREE.Mesh(geometry, faceMaterial);
    
    mesh.position.y = -100
    
    return mesh;
}