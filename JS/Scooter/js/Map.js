function Map() {
    this.position = {
        sx: 2280,
        sy: 0,
        swidth: 960,
        sheight: 631,
        x: 0,
        y: 0,
        width: 960,
        height:631,
    }
    var mapImg = new Image();

    this.init = function () {
       
        mapImg.src = links.img.map;
        mapImg.onload = function () {
            ctx1.drawImage(mapImg, map.position.sx, map.position.sy, map.position.swidth, map.position.sheight, map.position.x, map.position.y, map.position.width, map.position.height);
        }
    }

    this.update = function () {
        ctx1.clearRect(0, 0, 960, 631);
        ctx1.drawImage(mapImg, map.position.sx, map.position.sy, map.position.swidth, map.position.sheight, map.position.x, map.position.y, map.position.width, map.position.height);

        //console.log(map.position.sx)
    }

    //this.bullet1 = new objects.bullet(1839, 465, 0);
}