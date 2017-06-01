function run() {
    var reo = new REO();
    reo.generateTargets();
    var station = new Station(reo);
    var view = new View(station);
    view.displayKanalyLampsOff();
    view.generateSectorLamps();
    station.subscribe(view);

    //event handlers----------------------
    stationTumbler.onclick = function () {
        view.toggleStationTumbler();
        station.toggleStart();
        view.refreshStatic(station);
    };
    antennaTumbler.onclick = function () {
        if(station.started){
            if(station.peredachik){
                alert("Нельзя переключать тумблер 'Эквивалент-Антенна' при работающем передатчике");
                return;
            }
            view.toggleAntennaTumbler();
            station.toggleAntenna();
            view.refreshStatic(station);
        }
        else {
            view.toggleAntennaTumbler();
        }
    };
    avtokontrolTumbler.onclick = function () {
        view.toggleAvtokontrolTumbler();
    };
    vcuTumbler.onclick = function () {
        view.toggleVcuTumbler();
    };
    dopoiskTumbler.onclick = function () {
        view.toggleDopoiskTumbler();
    };
    peredatchikTumbler.onclick = function () {
        if(station.peredachik)
        {
            station.setPeredatchik(false);
        }
        else {
            if(!station.setPeredatchik(true)){
                alert('Передатчик не готов к включению!');
                return;
            }
        }
        view.togglePeredatchikTumbler();
        view.refreshStatic();
    };
    kanalyTumbler.onclick = function () {
        view.toggleKanalyTumbler();
    };
    peregovornayaSetTumbler.onclick = function () {
        view.togglePeregovornayaSetTumbler();
    };
    butEmuAzOn.onclick = function () {
        station.setEmuAz(true);
        view.refreshStatic(station);
    };
    butEmuAzOff.onclick = function () {
        station.setEmuAz(false);
        view.refreshStatic(station);
    };
    butEmuUmOn.onclick = function () {
        station.setEmuUm(true);
        view.refreshStatic(station);
    };
    butEmuUmOff.onclick = function () {
        station.setEmuUm(false);
        view.refreshStatic(station);
    };
    butVcu.onclick = function () {
        station.setUpravl("vcu");
        view.refreshStatic(station);
    };
    butAvt.onclick = function () {
        station.setUpravl("avt");
        view.refreshStatic(station);
    };
    butUzkDiagram.onclick = function () {
        station.setDiagram("n");
        view.refreshStatic(station);
    };
    butShirDiagram.onclick = function () {
        station.setDiagram("w");
        view.refreshStatic(station);
    };
    butAvtomat.onclick = function(){
        station.avtomat();
    };
    butObzor.onclick = function(){
        station.obzor();
    };
    butPolyavtomat.onclick = function(){
        station.poluavtomat();
    };
    butSbrosVcu.onclick = function () {
        /*if(station.started){
            view.displayKanalyLampsOff();
            view.displaySectorLampsOff();
        }*/
    };
    butSbrosInd.onclick = function () {
        if(station.started){
            view.displayKanalyLampsOff();
        }
    };
    butSbrosOb.onclick = function () {
        if(station.started){
            view.displaySectorLampsOff();
        }
    };
    butVlevoMedleno.onmousedown = function () {
        butVlevoMedleno.onmouseout = function () {
            station.stopMove();
        };
        butVlevoMedleno.onmouseup = function () {
            station.stopMove();
        };
        station.vlevo(config.slowAz);
    };
    butVpravoMedleno.onmousedown = function () {
        butVpravoMedleno.onmouseup = function () {
            station.stopMove();
        };
        butVpravoMedleno.onmouseout = function () {
            station.stopMove();
        };
        station.vpravo(config.slowAz);
    };
    butVlevoBistro.onmousedown = function () {
        butVlevoBistro.onmouseup = function () {
            station.stopMove();
        };
        butVlevoBistro.onmouseout = function () {
            station.stopMove();
        };
        station.vlevo(config.fastAz);
    };
    butVpravoBistro.onmousedown = function () {
        butVpravoBistro.onmouseup = function () {
            station.stopMove();
        };
        butVpravoBistro.onmouseout = function () {
            station.stopMove();
        };
        station.vpravo(config.fastAz);
    };
    butVverhMedleno.onmousedown = function () {
        butVverhMedleno.onmouseup = function () {
            station.stopMove();
        };
        butVverhMedleno.onmouseout = function () {
            station.stopMove();
        };
        station.vverh(config.slowUm);
    };
    butVverhBistro.onmousedown = function () {
        butVverhBistro.onmouseup = function () {
            station.stopMove();
        };
        butVverhBistro.onmouseout = function () {
            station.stopMove();
        };
        station.vverh(config.fastUm);
    };
    butVnizMedleno.onmousedown = function () {
        butVnizMedleno.onmouseup = function () {
            station.stopMove();
        };
        butVnizMedleno.onmouseout= function () {
            station.stopMove();
        };
        station.vniz(config.slowUm);
    };
    butVnizBistro.onmousedown = function () {
        butVnizBistro.onmouseup = function () {
            station.stopMove();
        };
        butVnizBistro.onmouseout = function () {
            station.stopMove();
        };
        station.vniz(config.fastUm);
    };
    but360.onclick = function () {
        station.setSector(360);
        view.refreshStatic(station);
    };
    but120.onclick = function () {
        station.setSector(120);
        view.refreshStatic(station);
    };
    but90.onclick = function () {
        station.setSector(90);
        view.refreshStatic(station);
    };
    but60.onclick = function () {
        station.setSector(60);
        view.refreshStatic(station);
    };
    but20.onclick = function () {
        station.setSector(20);
        view.refreshStatic(station);
    };
    but12.onclick = function () {
        station.setSector(12);
        view.refreshStatic(station);
    };
    but6.onclick = function () {
        station.setSector(6);
        view.refreshStatic(station);
    };
    butVidergka0.onclick = function () {
        station.setVidergka(0);
        view.refreshStatic(station);
    };
    butVidergka5.onclick = function () {
        station.setVidergka(5);
        view.refreshStatic(station);
    };
    butVidergka10.onclick = function () {
        station.setVidergka(10);
        view.refreshStatic(station);
    };
    butVidergka20.onclick = function () {
        station.setVidergka(20);
        view.refreshStatic(station);
    };
    butVidergka30.onclick = function () {
        station.setVidergka(30);
        view.refreshStatic(station);
    };
    butExstrapol.onclick = function () {
        if(station.started){
            station.setExstrapolation();
        }
    };

    //settings tab functionality
    document.getElementById('saveButton').onclick = function(e){
      e.preventDefault();
      saveSettings();
      reo.generateTargets();
      openTab(event,'pult');
    };
    document.getElementById('addButton').onclick = function(e){
      e.preventDefault();
      addTarget(reo);
      openTab(event,'pult');
    };
}
window.onload=run;
