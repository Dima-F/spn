/**
 * Created by Dima on 29.08.2016.
 */
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


//buttons
var butEmuAzOn = document.getElementById("emu-az-on");
var butEmuAzOff = document.getElementById("emu-az-off");
var butEmuUmOn = document.getElementById("emu-um-on");
var butEmuUmOff = document.getElementById("emu-um-off");
var butVcu = document.getElementById("butVcu");
var butAvt = document.getElementById("butAvt");
var butUzkDiagram = document.getElementById("butUzkDiagram");
var butShirDiagram = document.getElementById("butShirDiagram");
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


function View(station) {
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
                newImg.id = (j == 0) ? "a" + i : "b" + i;
                newDiv.appendChild(newImg);
                container.appendChild(newDiv);
            }
        }
    };

    this.displaySectorLampsOff = function () {
        for (var i = 0; i < 16; i++) {
            var e1 = document.getElementById('a' + i);
            e1.setAttribute("src", "images/lamps/gray_lamp.png");
            var e2 = document.getElementById('b' + i);
            e2.setAttribute("src", "images/lamps/gray_lamp.png");
        }
    };

    this.displayKanalyLampsOff = function () {
        for (var i = 1; i < 65; i++) {
            var elem = document.getElementById(i + "k");
            elem.setAttribute("src", "images/lamps/gray_lamp.png");
        }
    };

    this.lightSector = function (angle, type) {
        if (isNaN(angle) || angle > 359 || angle < 0 || (type != 'a' && type != 'b')) {
            console.error('Wrong parameters in view.lightSector.');

        }
        else {
            var id = type + Math.floor(angle / 22.5);
            document.getElementById(id).setAttribute('src', './images/lamps/yellow_lamp.png');
        }
    };

    this.unLightSector = function (identifier) {
        var letter = identifier[0];
        var number = identifier.substring(1);
        if ((letter != 'a' && letter != 'b') || isNaN(number) || number > 15 || number < 0) {
            console.error('Wrong parameter ' + identifier + ' in view.unLightSector.');
        }
        else {
            document.getElementById(identifier).setAttribute('src', './images/lamps/gray_lamp.png');
        }
    };

    this.lightKanal = function (number) {
        if (number < 1 || number > 64)
            return null;
        else {
            var elem = document.getElementById(number + "k");
            elem.setAttribute("src", "images/lamps/yellow_lamp.png");
        }
    };

    this.randomLight = function () {
        var count = Math.floor(Math.random() * 5);
        for (var i = 0; i <= count; i++) {
            var letter = count > 2 ? 'a' : 'b';
            this.lightSector(Math.floor(Math.random() * 360), letter);
            this.lightKanal(Math.floor(Math.random() * 65));
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
        }
        else {
            stationTumbler.setAttribute("src", "images/tumblers/off_1.png");
            this.displayKanalyLampsOff();
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
        if (!self.station.started) {
            this.displayLampsOff();
            this.displayTransparantsOff();
            this.displaySectorLampsOff();
        }
        else {
            lampVklNizkoe.setAttribute("src", "images/lamps/green_lamp.png");
            //simplified
            lampVklRychnoe.setAttribute("src", "images/lamps/yellow_lamp.png");
            //current vid upravleniya
            if (self.station.currentVidUpravleniya == "avt") {
                self.T_Avtonomno_On();
            }
            else {
                self.T_Vcu_On();
            }
            //current diagrams
            if (self.station.currentDiagrams == "w") {
                self.T_DiagramShirokie_On();
            }
            else {
                self.T_DiagramUzkie_On();
            }
            //current regum
            if (self.station.currentRegum == "ob") {
                if (station.currentSector == 360) {
                    self.T_Obzor_On();
                } else {
                    self.T_Poisk_On();
                }
            }
            else if (self.station.currentRegum == "av") {
                if (self.station.soprovogdenie) {
                    self.T_Soprovogdenie_On();
                } else {
                    self.T_Poisk_On();
                }
            }
            else {// currentRegum=="pa"
                self.T_Poluavtomat_On();
            }
            //visokoe & peredatchik
            self.DisplayVisokoe(self.station.visokoe);
            self.DisplayPeredatchik(self.station.peredachik);
            //avariya AK
            new function () {
                if (self.station.avariyaAk) {
                    lampAvariyaAk.setAttribute("src", "images/lamps/red_lamp.png");
                }
                else {
                    lampAvariyaAk.setAttribute("src", "images/lamps/gray_lamp.png");
                }
            }();
            //emu
            new function () {
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
            }();
            //ekvivalent-antena
            new function () {
                if (self.station.currentAntenna == "a") {
                    lampAntAnt.setAttribute("src", "images/lamps/red_lamp.png");
                    lampAntEkv.setAttribute("src", "images/lamps/gray_lamp.png");
                }
                else {
                    lampAntAnt.setAttribute("src", "images/lamps/gray_lamp.png");
                    lampAntEkv.setAttribute("src", "images/lamps/green_lamp.png");
                }
            }();

        }
    };

    this.refreshRotation = function () {
        RotateA(this.station.a - this.a0);
        RotateU(this.station.u - this.u0);
        this.a0 = this.station.a;
        this.u0 = this.station.u;
    };

    this.T_Poluavtomat_On = function () {
        trPoluAvtomat.setAttribute("class", "greenActive");
        trObzor.setAttribute("class", "greenPassive");
        trPoisk.setAttribute("class", "greenPassive");
        trSoprovogdenie.setAttribute("class", "greenPassive");
        this.T_Odinochnaya(false);
    };
    this.T_Obzor_On = function () {
        trPoluAvtomat.setAttribute("class", "greenPassive");
        trObzor.setAttribute("class", "greenActive");
        trPoisk.setAttribute("class", "greenPassive");
        trSoprovogdenie.setAttribute("class", "greenPassive");
        this.T_Odinochnaya(false);
    };
    this.T_Poisk_On = function () {
        trPoluAvtomat.setAttribute("class", "greenPassive");
        trObzor.setAttribute("class", "greenPassive");
        trPoisk.setAttribute("class", "greenActive");
        trSoprovogdenie.setAttribute("class", "greenPassive");
        this.T_Odinochnaya(false);
    };
    this.T_Soprovogdenie_On = function () {
        trPoluAvtomat.setAttribute("class", "greenPassive");
        trObzor.setAttribute("class", "greenPassive");
        trPoisk.setAttribute("class", "greenPassive");
        trSoprovogdenie.setAttribute("class", "greenActive");
        this.T_Odinochnaya(true);
    };
    this.T_Vcu_On = function () {
        trAvtonomno.setAttribute("class", "orangePassive");
        trAvtonomno2.setAttribute("class", "greenPassive");
        trVcu.setAttribute("class", "orangeActive");
        trVcu2.setAttribute("class", "greenActive");
    };
    this.T_Avtonomno_On = function () {
        trAvtonomno.setAttribute("class", "orangeActive");
        trAvtonomno2.setAttribute("class", "greenActive");
        trVcu.setAttribute("class", "orangePassive");
        trVcu2.setAttribute("class", "greenPassive");
    };
    this.T_DiagramUzkie_On = function () {
        trDiagramuUzkie.setAttribute("class", "orangeActive");
        trDiagramuShirokie.setAttribute("class", "orangePassive");
    };
    this.T_DiagramShirokie_On = function () {
        trDiagramuUzkie.setAttribute("class", "orangePassive");
        trDiagramuShirokie.setAttribute("class", "orangeActive");
    };
    this.T_Odinochnaya = function (value) {
        if (value) {
            trOdinochnaya.setAttribute("class", "orangeActive");
            trOdinochnaya2.setAttribute("class", "greenActive");
        }
        else {
            trOdinochnaya.setAttribute("class", "orangePassive");
            trOdinochnaya2.setAttribute("class", "greenPassive");
        }
    };
    this.T_Grupa = function (value) {
        if (value) {
            trGrupa.setAttribute("class", "orangeActive");
            trGrupa2.setAttribute("class", "greenActive");
        }
        else {
            trGrupa.setAttribute("class", "orangePassive");
            trGrupa2.setAttribute("class", "greenPassive");
        }
    };
    this.DisplayPeredatchik = function (value) {
        if(value){
            lampVkl3kV.setAttribute("src", "images/lamps/green_lamp.png");
            lampVklPeredatchik.setAttribute("src", "images/lamps/red_lamp.png");
            trMoshnost.setAttribute("class", "orangeActive");
        }
        else {
            lampVkl3kV.setAttribute("src", "images/lamps/gray_lamp.png");
            lampVklPeredatchik.setAttribute("src", "images/lamps/gray_lamp.png");
            trMoshnost.setAttribute("class", "orangePassive");
        }
    };
    this.DisplayVisokoe = function (value) {
        if(value){
            lampVklVisokoe.setAttribute("src", "images/lamps/green_lamp.png");
        }
        else {
            lampVklVisokoe.setAttribute("src", "images/lamps/gray_lamp.png");
        }
    };
}
