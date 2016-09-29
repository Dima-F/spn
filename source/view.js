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
                newImg.id = (j == 0) ? "2_" + i : "1_" + i;
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

    this.lightSector = function (angle, type) {
        if (isNaN(angle) || angle > 359 || angle < 0 || (type != 1 && type != 2)) {
            console.error('Wrong parameters in view.lightSector.');
        }
        else {
            var id = type+ '_' + Math.floor(angle / 22.5);
            document.getElementById(id).setAttribute('src', './images/lamps/yellow_lamp.png');
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
        var vklNizkieAndRuchnoe = function () {
            lampVklNizkoe.setAttribute("src", "images/lamps/green_lamp.png");
            //simplified
            lampVklRychnoe.setAttribute("src", "images/lamps/yellow_lamp.png");
        };
        var vklAntenna = function () {
            if (self.station.currentAntenna == "a") {
                lampAntAnt.setAttribute("src", "images/lamps/red_lamp.png");
                lampAntEkv.setAttribute("src", "images/lamps/gray_lamp.png");
            }
            else {
                lampAntAnt.setAttribute("src", "images/lamps/gray_lamp.png");
                lampAntEkv.setAttribute("src", "images/lamps/green_lamp.png");
            }
        };
        var vklEmu = function () {
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
        var vklDiagrams = function () {
            if(station.currentDiagrams=="w"){
                trDiagramuUzkie.setAttribute("class", "orangePassive");
                trDiagramuShirokie.setAttribute("class", "orangeActive");
            }
            else {
                trDiagramuUzkie.setAttribute("class", "orangeActive");
                trDiagramuShirokie.setAttribute("class", "orangePassive");
            }
        };
        var vklVidUpr = function () {
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
        var vklVisokoe = function () {
            if(self.station.visokoe){
                lampVklVisokoe.setAttribute("src", "images/lamps/green_lamp.png");
            }
            else {
                lampVklVisokoe.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        };
        var vklPeredatchick = function () {
            if(station.peredachik){
                lampVklPeredatchik.setAttribute("src", "images/lamps/red_lamp.png");
                if(station._3kV){
                    lampAvariyaVzs.setAttribute("src", "images/lamps/gray_lamp.png");
                }
                else {
                    lampAvariyaVzs.setAttribute("src", "images/lamps/red_lamp.png");
                }
            }
            else {
                lampVklPeredatchik.setAttribute("src", "images/lamps/gray_lamp.png");
            }
        };
        var vklPomeha = function () {
            if(station.peredachik && station._3kV){
                lampVkl3kV.setAttribute("src", "images/lamps/green_lamp.png");
                trMoshnost.setAttribute("class", "orangeActive");
            }
            else {
                lampVkl3kV.setAttribute("src", "images/lamps/gray_lamp.png");
                trMoshnost.setAttribute("class", "orangePassive");
            }
        };
        var vklAction = function () {
            switch(station.currentRegum){
                case "pa":
                    //poluavtomat
                    trPoluAvtomat.setAttribute("class", "greenActive");
                    trObzor.setAttribute("class", "greenPassive");
                    trPoisk.setAttribute("class", "greenPassive");
                    trSoprovogdenie.setAttribute("class", "greenPassive");
                    trOdinochnaya.setAttribute("class", "orangePassive");
                    trOdinochnaya2.setAttribute("class", "greenPassive");
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
            };
        };
            

        var self = this;
        if (!self.station.started) {
            this.displayLampsOff();
            this.displayTransparantsOff();
            this.displaySectorLampsOff();
        }
        else {
            //each of methods depends on concrete situation
            vklNizkieAndRuchnoe();
            vklAntenna();
            vklEmu();
            vklDiagrams();
            vklVidUpr();
            vklVisokoe();
            vklPeredatchick();
            vklPomeha();
            vklAction();

        }
    };

    this.refreshRotation = function () {
        RotateA(this.station.a - this.a0);
        RotateU(this.station.u - this.u0);
        this.a0 = this.station.a;
        this.u0 = this.station.u;
        this.UpdateUmLabel();
    };

    this.UpdateUmLabel = function () {
        var label = document.getElementById('umLabel');
        label.innerHTML=this.station.u;
    };
}
