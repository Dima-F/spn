var azCanvas = document.getElementById("azCanva");
azCanvas.width = 212;
azCanvas.height = 212;
var ctxAz = azCanvas.getContext('2d');

var picAz = new Image();
picAz.src = 'images/azimut.png';

picAz.onload = function () {
    ctxAz.translate(106, 106);
    ctxAz.drawImage(picAz, -100, -100);
};
function RotateA(angle) {
    ctxAz.rotate(angle * Math.PI / 180);
    ctxAz.clearRect(-106, -106, 212, 212);
    ctxAz.drawImage(picAz, -100, -100);
}


var umCanvas = document.getElementById("umCanva");
umCanvas.width = 212;
umCanvas.height = 212;
var ctxUm  = umCanvas.getContext('2d');
// Контекст
var picUm = new Image();
picUm.src    = 'images/ugolmesta.png';
picUm.onload = function() {
    ctxUm.translate(106,106);
    ctxUm.drawImage(picUm, -106, -106);
};
function RotateU(angle) {
    ctxUm.rotate(angle * Math.PI / 180);
    ctxUm.clearRect(-106, -106, 212, 212);
    ctxUm.drawImage(picUm, -106, -106);
}



/*var ugolMestaManager= {
    canvas:document.getElementById("umCanva"),
    context:null,
    picture:new Image(),
    init: function () {
        this.context = this.canvas.getContext('2d');
        this.context.width=212;
        this.context.height=212;
        this.picture.src = 'images/ugolmesta.png';
        var self = this;
        this.picture.onload = function() {
            self.context.translate(106,106);
            self.context.drawImage(self.picture, -106, -106);
        };
    },
    rotate: function (angle) {
        this.context.rotate(angle*Math.PI/180);
        this.context.clearRect(-106,-106,212,212);
        this.context.drawImage(this.picture, -106, -106);
    }
};*/
