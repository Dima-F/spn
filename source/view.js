/**
 * Created by Dima on 29.08.2016.
 */
 // clock
 (function() {
     var clock = document.getElementById('myClock');
     // But there is a little problem
     // we need to pad 0-9 with an extra
     // 0 on the left for hours, seconds, minutes
     var pad = function(x) {
         return x < 10 ? '0'+x : x;
     };
     var ticktock;
     ticktock = function () {
         var d = new Date();
         var h = pad(d.getHours());
         var m = pad(d.getMinutes());
         var s = pad(d.getSeconds());
         clock.innerHTML = [h, m, s].join(':');
     };
     ticktock();
     // Calling ticktock() every 1 second
     setInterval(ticktock, 1000);
 }());

//tumblers
var stationTumbler = document.getElementById("img-station");
var antennaTumbler = document.getElementById("antennaTumbler");
var avtokontrolTumbler = document.getElementById("avtokontrolTumbler");
var vcuTumbler = document.getElementById("vcuTumbler");
var dopoiskTumbler = document.getElementById("dopoiskTumbler");
var peredatchikTumbler = document.getElementById("peredatchikTumbler");
var kanalyTumbler = document.getElementById("kanalyTumbler");
var peregovornayaSetTumbler = document.getElementById("peregovornayaSetTumbler");


//lamps
var lampEmuAz = document.getElementById("lamp-emu-az");
var lampEmuUm = document.getElementById("lamp-emu-um");
var lampVklNizkoe = document.getElementById("lampNizkoe");
var lampVklVisokoe = document.getElementById("lampVisokoe");
var lampVkl3kV = document.getElementById("lamp3kV");
var lampVklPeredatchik = document.getElementById("lampPeretatchik");
var lampVklRychnoe = document.getElementById("lampRychnoe");
var lampAntEkv = document.getElementById("antennaLampEkv");
var lampAntAnt = document.getElementById("antennaLampAnt");
var lampAvariyaAk = document.getElementById("lampAvariyaAk");
var lampAvariyaVzs = document.getElementById("lampAvariyaVzs");


//buttons
var butEmuAzOn = document.getElementById("emu-az-on");
var butEmuAzOff = document.getElementById("emu-az-off");
var butEmuUmOn = document.getElementById("emu-um-on");
var butEmuUmOff = document.getElementById("emu-um-off");
var butVcu = document.getElementById("butVcu");
var butAvt = document.getElementById("butAvt");
var butUzkDiagram = document.getElementById("butUzkDiagram");
var butShirDiagram = document.getElementById("butShirDiagram");
var butExstrapol = document.getElementById("butExstrapol");
var butObzor = document.getElementById("butObzor");
var butAvtomat = document.getElementById("butAvtomat");
var butPolyavtomat = document.getElementById("butPolyavtomat");
var butSbrosVcu = document.getElementById("butSbrosVcu");
var butSbrosOb = document.getElementById("butSbrosOb");
var butSbrosInd = document.getElementById("butSbrosInd");


var but360 = document.getElementById("but360");
var but120 = document.getElementById("but120");
var but90 = document.getElementById("but90");
var but60 = document.getElementById("but60");
var but20 = document.getElementById("but20");
var but12 = document.getElementById("but12");
var but6 = document.getElementById("but6");

var butVlevoMedleno = document.getElementById("butVlevoMedleno");
var butVlevoBistro = document.getElementById("butVlevoBistro");
var butVpravoMedleno = document.getElementById("butVpravoMedleno");
var butVpravoBistro = document.getElementById("butVpravoBistro");
var butVverhMedleno = document.getElementById("butVverhMedleno");
var butVverhBistro = document.getElementById("butVverhBistro");
var butVnizMedleno = document.getElementById("butVnizMedleno");
var butVnizBistro = document.getElementById("butVnizBistro");


var butVidergka5 = document.getElementById("butVidergka5");
var butVidergka10 = document.getElementById("butVidergka10");
var butVidergka20 = document.getElementById("butVidergka20");
var butVidergka30 = document.getElementById("butVidergka30");
var butVidergka0 = document.getElementById("butVidergka0");

//transparants
var trVcu = document.getElementById("trVcu");
var trAvtonomno = document.getElementById("trAvtonomno");
var trVisokVkl = document.getElementById("trVisokVkl");
var trNizkVkl = document.getElementById("trNizkVkl");
var trOdinochnaya = document.getElementById("trOdinochnaya");
var trGrupa = document.getElementById("trGrupa");
var trZona1 = document.getElementById("trZona1");
var trZona2 = document.getElementById("trZona2");
var trZona3 = document.getElementById("trZona3");
var trDopoiskVkl = document.getElementById("trDopoiskVkl");
var trNovoeVcu = document.getElementById("trNovoeVcu");

var trVcu2 = document.getElementById("trVcu2");
var trAvtonomno2 = document.getElementById("trAvtonomno2");
var trPoluAvtomat = document.getElementById("trPoluAvtomat");
var trObzor = document.getElementById("trObzor");
var trPoisk = document.getElementById("trPoisk");
var trSoprovogdenie = document.getElementById("trSoprovogdenie");
var trOdinochnaya2 = document.getElementById("trOdinochnaya2");
var trGrupa2 = document.getElementById("trGrupa2");
var trMoshnost = document.getElementById("trMoshnost");
var trEkstrapolacia = document.getElementById("trEkstrapolacia");
var trDiagramuUzkie = document.getElementById("trDiagramuUzkie");
var trDiagramuShirokie = document.getElementById("trDiagramuShirokie");

//for music
var music = document.getElementById("clickSound");

function SmartCanva(element, imgPath, type) {
    element.width = 212;
    element.height = 212;
    var context = element.getContext('2d');
    var picture = new Image();
    picture.src = imgPath;
    var drawPicture = function () {
        if (type == "a") {
            context.drawImage(picture, -100, -100);
        } else {
            context.drawImage(picture, -106, -106);
        }
    };
    picture.onload = function () {
        context.translate(106, 106);
        drawPicture();
    };
    this.rotate = function(angle){
        context.rotate(angle * Math.PI / 180);
        context.clearRect(-106, -106, 212, 212);
        drawPicture();
    };
}

function View(station) {
    this.azCanva = new SmartCanva(document.getElementById("azCanva"),'images/azimut.png','a');
    this.umCanva = new SmartCanva(document.getElementById("umCanva"),'images/ugolmesta.png','u');
    this.station = station;
    //tumblers
    this.t_station = false;
    this.t_antenna = true;
    this.t_peredatchik = false;
    this.t_avtokontrol = false;
    this.t_vcu = true;
    this.t_dopoisk = false;
    this.t_kanaly = false;//false - 1-58, true - 1-35
    this.t_peregovornayaSet = false;
    this.t_vcu = false;//avtonomno - false, vcu - true

    //visualised antenna position
    this.a0 = 0;
    this.u = 0;

    this.generateSectorLamps = function () {
        var container = document.getElementById("lamp-field");
        var r = 57;
        var d = 82;
        for (var i = 0; i < 16; i++) {
            for (var j = 0; j < 2; j++) {
                var x = (r + j * 20) * Math.cos((180 - (2 * i + 1) * 11.25) * Math.PI / 180) + d;
                var y = (r + j * 20) * Math.sin((180 - (2 * i + 1) * 11.25) * Math.PI / 180) + d;
                var newDiv = document.createElement('div');
                newDiv.setAttribute('class', 'iDiv');
                newDiv.setAttribute('style', 'top:' + Math.floor(x) + 'px' + ';' + 'left:' + Math.floor(y) + 'px' + ';');
                var newImg = document.createElement('img');
                newImg.src = "./images/lamps/gray_lamp.png";
                newImg.id = (j === 0) ? "2_" + i : "1_" + i;
                newDiv.appendChild(newImg);
                container.appendChild(newDiv);
            }
        }
    };

    this.displaySectorLampsOff = function () {
        for (var i = 0; i < 16; i++) {
            for(var j=0;j<2;j++){
                var e = document.getElementById((j+1)+'_' + i);
                e.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        }
    };

    this.displayKanalyLampsOff = function () {
        for (var i = 1; i < 65; i++) {
            var elem = document.getElementById(i + "k");
            elem.setAttribute("src", "images/lamps/gray_lamp.png");
        }
    };

    this.lightSector = function (target) {
        if (target instanceof Target) {
            var id = target.getType()+ '_' + Math.floor(target.getAngle().a / 22.5);
            document.getElementById(id).setAttribute('src', './images/lamps/yellow_lamp.png');
        }
        else {
            throw new Error('Bad target in lightSector!');
        }
    };

    this.lightOffSector = function (target) {
        if (target instanceof Target) {
            var id = target.getType()+ '_' + Math.floor(target.getAngle().a / 22.5);
            document.getElementById(id).setAttribute('src', './images/lamps/gray_lamp.png');
        }
        else {
            throw new Error('Bad target in lightOffSector!');
        }
    };

    this.lightChannel = function (target) {
        if (target instanceof Target) {
            var elem = document.getElementById(target.getChannel() + "k");
            elem.setAttribute("src", "images/lamps/yellow_lamp.png");
        }
        else {
            throw new Error('Bad target in lightChannel!');
        }
    };

    this.lightOffChannel = function (target) {
        if (target instanceof Target) {
            var elem = document.getElementById(target.getChannel() + "k");
            elem.setAttribute("src", "images/lamps/gray_lamp.png");
        }
        else {
            throw new Error('Bad target in lightOffChannel!');
        }
    };

    this.displayLampsOff = function () {
        lampEmuAz.setAttribute("src", "images/lamps/gray_lamp.png");
        lampEmuUm.setAttribute("src", "images/lamps/gray_lamp.png");
        lampVklNizkoe.setAttribute("src", "images/lamps/gray_lamp.png");
        lampVklVisokoe.setAttribute("src", "images/lamps/gray_lamp.png");
        lampVkl3kV.setAttribute("src", "images/lamps/gray_lamp.png");
        lampVklPeredatchik.setAttribute("src", "images/lamps/gray_lamp.png");
        lampVklRychnoe.setAttribute("src", "images/lamps/gray_lamp.png");
        lampAntAnt.setAttribute("src", "images/lamps/gray_lamp.png");
        lampAntEkv.setAttribute("src", "images/lamps/gray_lamp.png");
        lampAvariyaAk.setAttribute("src", "images/lamps/gray_lamp.png");
        lampAvariyaVzs.setAttribute("src", "images/lamps/gray_lamp.png");
    };

    this.displayTransparantsOff = function () {
        trVcu.setAttribute("class", "orangePassive");
        trAvtonomno.setAttribute("class", "orangePassive");
        trVisokVkl.setAttribute("class", "orangePassive");
        trNizkVkl.setAttribute("class", "orangePassive");
        trOdinochnaya.setAttribute("class", "orangePassive");
        trGrupa.setAttribute("class", "orangePassive");
        trZona1.setAttribute("class", "orangePassive");
        trZona2.setAttribute("class", "orangePassive");
        trZona3.setAttribute("class", "orangePassive");
        trDopoiskVkl.setAttribute("class", "orangePassive");
        trNovoeVcu.setAttribute("class", "orangePassive");

        trVcu2.setAttribute("class", "greenPassive");
        trAvtonomno2.setAttribute("class", "greenPassive");
        trPoluAvtomat.setAttribute("class", "greenPassive");
        trObzor.setAttribute("class", "greenPassive");
        trPoisk.setAttribute("class", "greenPassive");
        trSoprovogdenie.setAttribute("class", "greenPassive");
        trOdinochnaya2.setAttribute("class", "greenPassive");
        trGrupa2.setAttribute("class", "greenPassive");
        trMoshnost.setAttribute("class", "orangePassive");
        trEkstrapolacia.setAttribute("class", "greenPassive");
        trDiagramuUzkie.setAttribute("class", "orangePassive");
        trDiagramuShirokie.setAttribute("class", "orangePassive");
    };

    this.toggleStationTumbler = function () {
        this.t_station = !this.t_station;
        if (this.t_station) {
            stationTumbler.setAttribute("src", "images/tumblers/on_1.png");
            //this.randomLight();
            if(this.t_antenna){
              station.antenna=true;
            } else {
              station.antenna=false;
            }
            music.play();
        }
        else {
            stationTumbler.setAttribute("src", "images/tumblers/off_1.png");
            this.displayKanalyLampsOff();
            music.pause();
        }
    };

    this.toggleAntennaTumbler = function () {
        this.t_antenna = !this.t_antenna;
        if (this.t_antenna) {
            antennaTumbler.setAttribute("src", "images/tumblers/right_1.png");
        }
        else {
            antennaTumbler.setAttribute("src", "images/tumblers/left_1.png");
        }
    };

    this.toggleAvtokontrolTumbler = function () {
        this.t_avtokontrol = !this.t_avtokontrol;
        if (this.t_avtokontrol) {
            avtokontrolTumbler.setAttribute("src", "images/tumblers/on_1.png");
        }
        else {
            avtokontrolTumbler.setAttribute("src", "images/tumblers/off_1.png");
        }
    };

    this.toggleVcuTumbler = function () {
        this.t_vcu = !this.t_vcu;
        if (this.t_vcu) {
            vcuTumbler.setAttribute("src", "images/tumblers/on_1.png");
        }
        else {
            vcuTumbler.setAttribute("src", "images/tumblers/off_1.png");
        }
    };

    this.toggleDopoiskTumbler = function () {
        this.t_dopoisk = !this.t_dopoisk;
        if (this.t_dopoisk) {
            dopoiskTumbler.setAttribute("src", "images/tumblers/on_1.png");
        }
        else {
            dopoiskTumbler.setAttribute("src", "images/tumblers/off_1.png");
        }
    };

    this.togglePeredatchikTumbler = function () {
        this.t_peredatchik = !this.t_peredatchik;
        if (this.t_peredatchik) {
            peredatchikTumbler.setAttribute("src", "images/tumblers/on_1.png");
        }
        else {
            peredatchikTumbler.setAttribute("src", "images/tumblers/off_1.png");
        }
    };

    this.toggleKanalyTumbler = function () {
        this.t_kanaly = !this.t_kanaly;
        if (this.t_kanaly) {
            kanalyTumbler.setAttribute("src", "images/tumblers/on_1.png");
        }
        else {
            kanalyTumbler.setAttribute("src", "images/tumblers/off_1.png");
        }
    };

    this.togglePeregovornayaSetTumbler = function () {
        this.t_peregovornayaSet = !this.t_peregovornayaSet;
        if (this.t_peregovornayaSet) {
            peregovornayaSetTumbler.setAttribute("src", "images/tumblers/on_1.png");
        }
        else {
            peregovornayaSetTumbler.setAttribute("src", "images/tumblers/off_1.png");
        }
    };

    this.refreshStatic = function () {
        var self = this;
        var drawNizkieAndRuchnoe = function () {
            lampVklNizkoe.setAttribute("src", "images/lamps/green_lamp.png");
            //simplified
            //lampVklRychnoe.setAttribute("src", "images/lamps/yellow_lamp.png");
        };
        var drawAntenna = function () {
            if (self.station.antenna) {
                lampAntAnt.setAttribute("src", "images/lamps/red_lamp.png");
                lampAntEkv.setAttribute("src", "images/lamps/gray_lamp.png");
            }
            else {
                lampAntAnt.setAttribute("src", "images/lamps/gray_lamp.png");
                lampAntEkv.setAttribute("src", "images/lamps/green_lamp.png");
            }
        };
        var drawEmu = function () {
            if (self.station.emuAzimut) {
                lampEmuAz.setAttribute("src", "images/lamps/yellow_lamp.png");
            }
            else {
                lampEmuAz.setAttribute("src", "images/lamps/gray_lamp.png");
            }
            if (self.station.emuUgolMesta) {
                lampEmuUm.setAttribute("src", "images/lamps/yellow_lamp.png");
            }
            else {
                lampEmuUm.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        };
        var drawDiagrams = function () {
            if(station.currentDiagrams=="w"){
                trDiagramuUzkie.setAttribute("class", "orangePassive");
                trDiagramuShirokie.setAttribute("class", "orangeActive");
            }
            else {
                trDiagramuUzkie.setAttribute("class", "orangeActive");
                trDiagramuShirokie.setAttribute("class", "orangePassive");
            }
        };
        var drawVidUpr = function () {
            if(station.currentVidUpravleniya=="vcu"){
                trAvtonomno.setAttribute("class", "orangePassive");
                trAvtonomno2.setAttribute("class", "greenPassive");
                trVcu.setAttribute("class", "orangeActive");
                trVcu2.setAttribute("class", "greenActive");
            }
            else{
                trAvtonomno.setAttribute("class", "orangeActive");
                trAvtonomno2.setAttribute("class", "greenActive");
                trVcu.setAttribute("class", "orangePassive");
                trVcu2.setAttribute("class", "greenPassive");
            }
        };
        var drawVisokoe = function () {
            if(self.station.visokoe){
                lampVklVisokoe.setAttribute("src", "images/lamps/green_lamp.png");
            }
            else {
                lampVklVisokoe.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        };
        var drawPeredatchick = function () {
            if(station.peredachik){
                lampVklPeredatchik.setAttribute("src", "images/lamps/red_lamp.png");
            }
            else {
                lampVklPeredatchik.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        };
        var drawPomeha = function () {
            if(station._3kV){
                lampVkl3kV.setAttribute("src", "images/lamps/green_lamp.png");
                trMoshnost.setAttribute("class", "orangeActive");
            }
            else {
                lampVkl3kV.setAttribute("src", "images/lamps/gray_lamp.png");
                trMoshnost.setAttribute("class", "orangePassive");
            }
        };
        var drawAvariyaVzs = function () {
            if(station.avariyaVzs){
                lampAvariyaVzs.setAttribute("src", "images/lamps/red_lamp.png");
            }
            else {
                lampAvariyaVzs.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        };
        var drawAvariyaAk = function () {
            if(station.avariyaAk){
                lampAvariyaAk.setAttribute("src", "images/lamps/red_lamp.png");
            }
            else {
                lampAvariyaAk.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        };
        var drawExtrapolation = function () {
            if(station.exstrapolating){
                trEkstrapolacia.setAttribute("class", "greenActive");
            }
            else {
                trEkstrapolacia.setAttribute("class", "greenPassive");
            }
        };
        var drawAction = function () {
            switch(station.currentRegum){
                case "pa":
                    //poluavtomat
                    trPoluAvtomat.setAttribute("class", "greenActive");
                    trObzor.setAttribute("class", "greenPassive");
                    trPoisk.setAttribute("class", "greenPassive");
                    trSoprovogdenie.setAttribute("class", "greenPassive");
                    trOdinochnaya.setAttribute("class", "orangePassive");
                    trOdinochnaya2.setAttribute("class", "greenPassive");
                    self.displayKanalyLampsOff();
                    self.displaySectorLampsOff();
                    break;
                case "ob":
                    if (station.currentSector == 360) {
                        //obzor
                        trPoluAvtomat.setAttribute("class", "greenPassive");
                        trObzor.setAttribute("class", "greenActive");
                        trPoisk.setAttribute("class", "greenPassive");
                        trSoprovogdenie.setAttribute("class", "greenPassive");
                        trOdinochnaya.setAttribute("class", "orangePassive");
                        trOdinochnaya2.setAttribute("class", "greenPassive");
                    } else {
                        //poisk
                        trPoluAvtomat.setAttribute("class", "greenPassive");
                        trObzor.setAttribute("class", "greenPassive");
                        trPoisk.setAttribute("class", "greenActive");
                        trSoprovogdenie.setAttribute("class", "greenPassive");
                        trOdinochnaya.setAttribute("class", "orangePassive");
                        trOdinochnaya2.setAttribute("class", "greenPassive");
                    }
                    break;
                case "av":
                    if(station.soprovogdenie){
                        //soprovogdenie
                        trPoluAvtomat.setAttribute("class", "greenPassive");
                        trObzor.setAttribute("class", "greenPassive");
                        trPoisk.setAttribute("class", "greenPassive");
                        trSoprovogdenie.setAttribute("class", "greenActive");
                        trOdinochnaya.setAttribute("class", "orangeActive");
                        trOdinochnaya2.setAttribute("class", "greenActive");
                    }
                    else {//poisk
                        trPoluAvtomat.setAttribute("class", "greenPassive");
                        trObzor.setAttribute("class", "greenPassive");
                        trPoisk.setAttribute("class", "greenActive");
                        trSoprovogdenie.setAttribute("class", "greenPassive");
                        trOdinochnaya.setAttribute("class", "orangePassive");
                        trOdinochnaya2.setAttribute("class", "greenPassive");
                    }
                    break;
                default:throw new Error('Undefined regum!');
            }
        };
        var drawShadows = function(){
            switch(station.currentSector){
                case 360:
                    but360.className='shadow';
                    but120.className='';
                    but90.className='';
                    but60.className='';
                    but20.className='';
                    but12.className='';
                    but6.className='';
                    break;
                case 120:
                    but360.className='';
                    but120.className='shadow';
                    but90.className='';
                    but60.className='';
                    but20.className='';
                    but12.className='';
                    but6.className='';
                    break;
                case 90:
                    but360.className='';
                    but120.className='';
                    but90.className='shadow';
                    but60.className='';
                    but20.className='';
                    but12.className='';
                    but6.className='';
                    break;
                case 60:
                    but360.className='';
                    but120.className='';
                    but90.className='';
                    but60.className='shadow';
                    but20.className='';
                    but12.className='';
                    but6.className='';
                    break;
                case 20:
                    but360.className='';
                    but120.className='';
                    but90.className='';
                    but60.className='';
                    but20.className='shadow';
                    but12.className='';
                    but6.className='';
                    break;
                case 12:
                    but360.className='';
                    but120.className='';
                    but90.className='';
                    but60.className='';
                    but20.className='';
                    but12.className='shadow';
                    but6.className='';
                    break;
                case 6:
                    but360.className='';
                    but120.className='';
                    but90.className='';
                    but60.className='';
                    but20.className='';
                    but12.className='';
                    but6.className='shadow';
                    break;
            }
            switch(station.currentRegum){
                case 'pa':
                    butPolyavtomat.className='shadow';
                    butAvtomat.className='';
                    butObzor.className='';
                    break;
                case 'ob':
                    butPolyavtomat.className='';
                    butAvtomat.className='';
                    butObzor.className='shadow';
                    break;
                case 'av':
                    butPolyavtomat.className='';
                    butAvtomat.className='shadow';
                    butObzor.className='';
                    break;
            }
            switch(station.currentVidUpravleniya){
                case 'avt':
                    butAvt.className='shadow';
                    butVcu.className='';
                    break;
                case 'vcu':
                    butAvt.className='';
                    butVcu.className='shadow';
                    break;
            }
            switch(station.vidergka){
                case 0:
                    butVidergka0.className='shadow';
                    butVidergka5.className='';
                    butVidergka10.className='';
                    butVidergka20.className='';
                    butVidergka30.className='';
                    break;
                case 5:
                    butVidergka0.className='';
                    butVidergka5.className='shadow';
                    butVidergka10.className='';
                    butVidergka20.className='';
                    butVidergka30.className='';
                    break;
                case 10:
                    butVidergka0.className='';
                    butVidergka5.className='';
                    butVidergka10.className='shadow';
                    butVidergka20.className='';
                    butVidergka30.className='';
                    break;
                case 20:
                    butVidergka0.className='';
                    butVidergka5.className='';
                    butVidergka10.className='';
                    butVidergka20.className='shadow';
                    butVidergka30.className='';
                    break;
                case 30:
                    butVidergka0.className='';
                    butVidergka5.className='';
                    butVidergka10.className='';
                    butVidergka20.className='';
                    butVidergka30.className='shadow';
                    break;
            }
        };
        if (!self.station.started) {
            this.displayLampsOff();
            this.displayTransparantsOff();
            this.displaySectorLampsOff();
        }
        else {
            //each of methods depends on concrete situation
            drawNizkieAndRuchnoe();
            drawAntenna();
            drawEmu();
            drawDiagrams();
            drawVidUpr();
            drawVisokoe();
            drawPeredatchick();
            drawAvariyaVzs();
            drawAvariyaAk();
            drawPomeha();
            drawExtrapolation();
            drawAction();
            drawShadows();
        }
    };

    this.refreshRotation = function () {
        this.azCanva.rotate(this.station.a - this.a0);
        this.umCanva.rotate(this.station.u - this.u0);
        this.a0 = this.station.a;
        this.u0 = this.station.u;
        this.UpdateUmLabel();
    };

    this.UpdateUmLabel = function () {
        var label = document.getElementById('umLabel');
        label.innerHTML=this.station.u;
    };

    this.markShadow = function(id){
        document.getElementById(id).className='shadow';

    };
    //this method is using for writing on reoCanvas
    this.drawReo = function(angle){
      var element = document.getElementById("reoCanva");
      element.width=605;
      element.height=605;
      var context = element.getContext('2d');
      var r=Math.floor(element.width/2);
      context.beginPath();
      context.strokeStyle = "red";
      context.translate(r,r);
      context.save();
      if(station._3kV){
        context.strokeStyle = "orange";
        context.shadowBlur=40;
        context.shadowColor="red";
        context.lineWidth=3;
      }
      context.moveTo(0,0);
      context.lineTo(Math.floor(r*Math.cos((angle-90)*Math.PI/180)),Math.floor(r*Math.sin((angle-90)*Math.PI/180)));
      context.stroke();
      context.restore();
      var targets = station.reo.getAllTargets();
      for(var i=0;i<targets.length;i++){
        if(!targets[i].supressed){
          if(targets[i].online){
            context.fillStyle="red";
            context.strokeStyle = "red";
          } else {
            context.fillStyle="gray";
            context.strokeStyle = "gray";
          }
        } else {
          context.fillStyle = "orange";
          context.strokeStyle = "orange";
        }
        var d = targets[i].getDistance();
        var a=targets[i].getAngle().a;
        var x = Math.floor(d*Math.cos((a-90)*Math.PI/180))-5;
        var y = Math.floor(d*Math.sin((a-90)*Math.PI/180))-5;
        context.fillRect(x,y,10,10);
        context.font="10px Arial";
        context.fillText((i+1),x,y-2);
      }
    };
    this.printReo = function(){
      document.getElementById("reoInfo").innerHTML=station.reo.getReoInfoHtml();
    };
    var self=this;
    setInterval(function(){
      self.drawReo(station.a);
      self.printReo();
    },config.reoPictureUpdating);
}
