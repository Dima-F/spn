function run() {
    var reo = new REO();
    reo.generateTargets(3);
    reo.printTargets();
    var station = new Station(reo);
    var view = new View(station);
    view.displayKanalyLampsOff();
    view.generateSectorLamps();
    station.subscribe(view);
    //event handlers---------------------------------------------------------------------------------------------------
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
        if(view.t_peredatchik){
            view.togglePeredatchikTumbler();
            if(station.peredachik){
                station.peredachik = false;
                view.refreshStatic(station);
            }
        }
        else
        {
            if(station.transmit()){
                view.togglePeredatchikTumbler();
                view.refreshStatic(station);
            }
            else{
                alert('Передатчик не готов!');
            }
        }

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
        if(station.started){
            view.displayKanalyLampsOff();
            view.displaySectorLampsOff();
        }
    };
    butSbrosInd.onclick = function () {
        if(station.started){
            view.displayKanalyLampsOff();
            view.displaySectorLampsOff();
        }
    };
    butSbrosOb.onclick = function () {
        if(station.started){
            view.displayKanalyLampsOff();
            view.displaySectorLampsOff();
        }
    };

    butVlevoMedleno.onmousedown = function () {
        station.vlevo(config.slowAz);
    };
    butVlevoMedleno.onmouseup = function () {
        station.stopMove();
    };
    butVpravoMedleno.onmousedown = function () {
        station.vpravo(config.slowAz);
    };
    butVpravoMedleno.onmouseup = function () {
        station.stopMove();
    };
    butVlevoBistro.onmousedown = function () {
        station.vlevo(config.fastAz);
    };
    butVlevoBistro.onmouseup = function () {
        station.stopMove();
    };
    butVpravoBistro.onmousedown = function () {
        station.vpravo(config.fastAz);
    };
    butVpravoBistro.onmouseup = function () {
        station.stopMove();
    };
    butVverhMedleno.onmousedown = function () {
        station.vverh(config.slowUm);
    };
    butVverhMedleno.onmouseup = function () {
        station.stopMove();
    };
    butVverhBistro.onmousedown = function () {
        station.vverh(config.fastUm);
    };
    butVverhBistro.onmouseup = function () {
        station.stopMove();
    };
    butVnizMedleno.onmousedown = function () {
        station.vniz(config.slowUm);
    };
    butVnizMedleno.onmouseup = function () {
        station.stopMove();
    };
    butVnizBistro.onmousedown = function () {
        station.vniz(config.fastUm);
    };
    butVnizBistro.onmouseup = function () {
        station.stopMove();
    };
    but360.onclick = function () {
        station.setSector(360);
    };
    but120.onclick = function () {
        station.setSector(120);
    };
    but90.onclick = function () {
        station.setSector(90);
    };
    but60.onclick = function () {
        station.setSector(60);
    };
    but20.onclick = function () {
        station.setSector(20);
    };
    but12.onclick = function () {
        station.setSector(12);
    };
    but6.onclick = function () {
        station.setSector(6);
    };
    butVidergka0.onclick = function () {
        station.setVidergka(0);
    };
    butVidergka5.onclick = function () {
        station.setVidergka(5);
    };
    butVidergka10.onclick = function () {
        station.setVidergka(10);
    };
    butVidergka20.onclick = function () {
        station.setVidergka(20);
    };
    butVidergka30.onclick = function () {
        station.setVidergka(30);
    };
}
window.onload=run;