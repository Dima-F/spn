function Station(reo) {
    //private members
    var idAvariya = 0;
    var idVisokoe = 0;

    //properties

    this.view = null;
    this.antenna = true;//if ekvivalent - then false
    this.started = false;
    this.nizkoe = false;
    this.avariyaAk = false;
    this.avariyaVzs = false;
    this.visokoe = false;
    this._3kV = false;
    this.soprovogdenie = false;
    this.peredachik = false;
    this.exstrapolation = false;
    this.exstrapolating = false;
    this.emuAzimut = false;
    this.emuUgolMesta = false;
    this.currentRegum = "pa";
    this.currentVidUpravleniya = "avt";
    this.currentSector = 360;
    this.currentDiagrams = "w";

    this.vidergka = 0;//can be 0,5,10,20,30

    this.a = 0;
    this.u = 0;
    this.poiskDirection = "z";

    this.idA = 0;
    this.idU = 0;
    this.idViderzka = 0;
    this.idSoprovogdenie = 0;
    this.idExstrapolating = 0;
    this.reo = reo;
    this.view = null;

    //event technology
    this.updateS = function () {
        this.view.refreshStatic();
    };
    this.updateR = function () {
        this.view.refreshRotation();
        this.updateS();
        if(this.currentRegum!="pa" && !this.soprovogdenie && !this.exstrapolating)
            this.resive();
    };
    this.subscribe = function (view) {
        this.view = view;
    };

    //starting
    this.start = function () {
        this.started = true;
        this.nizkoe = true;
        this.avariyaAk = true;
        var self = this;
        idAvariya = setTimeout(function () {
            if (!self.started) {
                return null;
            }
            self.avariyaAk = false;
            self.updateS();
        }, config.delayAvariya * 1000);

        idVisokoe = setTimeout(function () {
            if (self.started && self.nizkoe && !self.avariyaAk) {
                self.visokoe = true;
                self.updateS();
            }
        }, config.delayVisokoe * 1000);
    };
    this.toggleStart = function () {
        if (this.started) {
            this.reset();
        } else {
            this.start();
        }
    };
    this.toggleAntenna = function () {
        this.antenna = !this.antenna;
    };
    this.reset = function () {
        this.started = false;
        this.antenna = true;
        this.peredachik = false;
        this._3kV = false;
        this.avariyaVzs = false;
        this.avariyaAk = false;
        this.visokoe = false;
        this.nizkoe = false;
        this.soprovogdenie=false;
        this.exstrapolation = false;
        this.exstrapolating = false;
        this.emuAzimut = false;
        this.emuUgolMesta = false;
        this.currentRegum = "pa";
        this.currentSector = 360;
        this.currentDiagrams = "w";
        this.vidergka = 0;
        this.clearTimersLamps();
        this.clearTimersAngles();
        //для азимута и угла места сброс не требуется, т. к. антена сохраняет свое положение
    };

    //AFS mooving
    this.up = function () {
        if (!this.emuUgolMesta)
            return false;
        else {
            if (this.u == 60)
                return false;
            else {
                this.u++;
                this.updateR();
                return true;
            }
        }
    };
    this.down = function () {
        if (!this.emuUgolMesta)
            return false;
        else {
            if (this.u == 0)
                return false;
            else {
                this.u--;
                this.updateR();
                return true;
            }
        }
    };
    this.left = function () {
        if (!this.emuAzimut)
            return false;
        else {
            this.a--;
            if (this.a < 0)
                this.a = 359;
            this.updateR();
            return true;
        }
    };
    this.right = function () {
        if (!this.emuAzimut)
            return false;
        else {
            this.a++;
            if (this.a > 359)
                this.a = 0;
            this.updateR();
            return true;
        }
    };
    this.vverh = function (delay) {
        if (this.currentRegum != "pa") {
            alert('Текущий режим работы не полуавтомат!');
            return;
        }
        this.clearTimersAngles();
        var self = this;
        self.idU = setInterval(function () {
            self.up();
        }, delay);
    };
    this.vniz = function (delay) {
        if (this.currentRegum != "pa") {
            alert('Текущий режим работы не полуавтомат!');
            return;
        }
        this.clearTimersAngles();
        var self = this;
        self.idU = setInterval(function () {
            self.down();
        }, delay);
    };
    this.vlevo = function (delay) {
        if (this.currentRegum != "pa") {
            alert('Текущий режим работы не полуавтомат!');
            return;
        }
        this.clearTimersAngles();
        var self = this;
        this.idU = setInterval(function () {
            self.left();
        }, delay);
    };
    this.vpravo = function (delay) {
        if (this.currentRegum != "pa") {
            alert('Текущий режим работы не полуавтомат!');
            return;
        }
        this.clearTimersAngles();
        var self = this;
        this.idU = setInterval(function () {
            self.right();
        }, delay);
    };
    this.stopMove = function () {
        if (this.currentRegum == "pa") {
            this.clearTimersAngles();
        }
    };

    //setters
    this.setEmuAz = function (flag) {
        if (!this.started) {
            return null;
        }
        else {
            this.emuAzimut = flag;
        }
    };
    this.setEmuUm = function (flag) {
        if (!this.started) {
            return false;
        }
        else {
            this.emuUgolMesta = flag;
            return true;
        }
    };
    this.setUpravl = function (val) {
        if (!this.started) {
            return false;
        }
        if (val == "avt" || val == "vcu") {
            this.currentVidUpravleniya = val;
            return true;
        }
        return false;
    };
    this.setDiagram = function (val) {
        if (!this.started || this.currentDiagrams==val) {
            return false;
        }
        if(this.currentRegum!="pa"){
            alert("Переключать диаграмы можно только в режиме 'Полуавтомат'!");
            return;
        }
        if (val == "w" || val == "n") {
            this.currentDiagrams = val;
            return true;
        }
        return false;
    };
    this.setSector = function (val) {
        if (isNaN(val))
            throw new Error("Bad value!");
        if (!this.started) {
            return;
        }
        if (this.currentRegum != "pa") {
            alert("Переключать сектора возможно только в режиме 'Полуавтомат'");
            return;
        }
        this.currentSector = val;
    };
    this.setVidergka = function (val) {
        if (isNaN(val) || val < 0 || val > 30) {
            throw new Error("Bad value!");
        }
        if (this.started) {
            this.vidergka = val;
        }
    };
    this.setPeredatchik = function (flag) {
        if(flag){
            if(this.started && this.visokoe){
                this.peredachik=true;
                if(this.soprovogdenie){
                    this._3kV=true;
                }
                this.avariyaVzs = !this._3kV;
                return true;
            }
            return false;
        }
        else {
            this.peredachik=false;
            this._3kV = false;
            this.avariyaVzs = false;
        }
    };
    this.setExstrapolation = function () {
        if(this.soprovogdenie){
            this.exstrapolation = true;
        }
    };

    //regums
    this.obzor = function () {
        if (!this.started || this.currentRegum == "ob" || !this.emuAzimut) {
            return;
        }
        if (this.currentRegum == "av") {
            alert("Установите режим 'Обзор' из режима 'Полуавтомат'");
            return;
        }
        var self = this;
        switch (this.currentSector) {
            case 6:
            case 12:
            case 20:
                alert("Неправильный сектор обзора!");
                return;
            case 360:
                this.currentRegum = "ob";
                this.updateS();
                this.clearTimersAngles();
                this.idA = setInterval(function () {
                    self.right();
                }, config.obzorAz);
                break;
            case 120:
            case 90:
            case 60:
                this.currentRegum = "ob";
                self.updateS();
                this.clearTimersAngles();
                this.poiskA();
                break;
            default:
                alert("Bad value!");
        }
    };
    this.poluavtomat = function () {
        if (!this.started)
            return;
        if(this.soprovogdenie){
            self._3kV = false;
            if(self.peredachik){
                self.avariyaVzs=true;
            }
        }
        this.clearTimersAngles();
        this.currentRegum = "pa";
        this.poiskDirection = "z";
        this.updateS();

    };
    this.avtomat = function () {
        if (!this.visokoe || !this.emuAzimut || !this.emuUgolMesta || this.currentRegum == "av") {
            return;
        }
        if (this.currentRegum == "ob") {
            alert("Установите режим 'Автомат' из режима 'Полуавтомат'");
            return;
        }
        switch (this.currentSector) {
            case 360:
                alert("Режим 'Автомат' не работает в круговую!");
                return;

            case 6:
            case 12:
            case 20:
                this.currentRegum = "av";
                this.updateS();
                this.clearTimersAngles();
                this.poiskV();
                break;
            case 120:
            case 90:
            case 60:
                this.currentRegum = "av";
                this.updateS();
                this.clearTimersAngles();
                this.poiskA();
                break;
            default:
                alert("Bad value!");
        }
    };

    //poisk
    this.poiskA = function () {
        var self = this;
        var counter = 0;
        //embedded functions
        var za = function (limit) {
            self.idA = setInterval(function () {
                if (counter <= limit) {
                    self.right();
                    counter++;
                } else {
                    clearInterval(self.idA);
                    counter = 0;
                    self.poiskDirection = "p";
                    protu();
                }
            }, config.obzorAz);
        };
        var protu = function () {
            self.idA = setInterval(function () {
                if (counter <= self.currentSector) {
                    self.left();
                    counter++;
                } else {
                    clearInterval(self.idA);
                    counter = 0;
                    self.poiskDirection = "z";
                    za(self.currentSector);
                }
            }, config.obzorAz);
        };
        if (this.poiskDirection == "z") {
            za(self.currentSector / 2);
        }
        else
            protu(self.currentSector / 2);
    };
    this.poiskU = function () {
        var counter = 0;
        var self = this;
        //embedded functions
        var high = function (limit) {
            self.idU = setInterval(function () {
                if (counter <= limit) {
                    self.up();
                    counter++;
                } else {
                    clearInterval(self.idU);
                    counter = 0;
                    low();
                }
            }, config.obzorUm);
        };
        var low = function () {
            self.idU = setInterval(function () {
                if (counter <= self.currentSector) {
                    self.down();
                    counter++;
                } else {
                    clearInterval(self.idU);
                    counter = 0;
                    high(self.currentSector);
                }
            }, config.obzorUm);
        };
        high(self.currentSector / 2);
    };
    this.poiskV = function () {
        this.poiskA();
        this.poiskU();
    };

    //timers
    this.clearTimersLamps = function () {
        clearTimeout(idAvariya);
        clearTimeout(idVisokoe);
    };
    this.clearTimersAngles = function () {
        clearInterval(this.idA);
        clearInterval(this.idU);
        clearTimeout(this.idViderzka);
        clearInterval(this.idSoprovogdenie);
        clearInterval(this.idExstrapolating);
    };

    //behavior
    this.resive = function () {
        if (!this.started || !this.nizkoe || !this.reo)
            return;
        var onlineTargets = this.reo.getOnlineTargets();
        if (onlineTargets.length == 0)
            return;
        for (var i = 0; i < onlineTargets.length; i++) {
            var target = onlineTargets[i];
            if (this.find(target)) {
                this.view.lightSector(target);
                this.view.lightChannel(target);
                if(this.currentRegum=="av"){
                    this.clearTimersAngles();
                    this.startSoprovogdenie(target);
                }
            }
        }
    };
    this.find = function (target) {
        var deltaU = this.currentDiagrams=="w"?config.deltaShirokie:config.deltaUzkie;
        var seeZone = this.currentDiagrams=="w"? 2 : 1;
        return (this.a == target.angle.a
            &&
                Math.abs(this.u-target.angle.u)<=deltaU
            &&
            seeZone === target.zone);
    };
    this.startSoprovogdenie = function (target) {
        var self=this;
        self.soprovogdenie=true;
        if(self.visokoe && self.peredachik){
            self._3kV = true;
            self.avariyaVzs = false;
        }
        self.updateS();
        var vidergkaTime = self.vidergka==0?config.timeSoprovogdeniya:self.vidergka;
        self.idSoprovogdenie = setInterval(function () {
            switch(target.direction){
                case 1:self.right();break;
                case -1:self.left();break;
                case 0:break;
                default:throw new Error("Wrong direction of target!");
            }
            //fact of target suppressing
            if(self._3kV && self.antenna){
                target.supressed = true;
            }
        },2500);
        setTimeout(function () {
            self.stopSoprovogdenie (target);
            self.avtomat();
            if(self.exstrapolation){
                self.startExstrapolation(target);
            }
        },vidergkaTime*1000);
    };
    this.stopSoprovogdenie = function (target) {
        var self=this;
        self.clearTimersAngles();
        self.soprovogdenie=false;
        self._3kV = false;
        if(self.peredachik){
            self.avariyaVzs=true;
        }
        this.view.lightOffSector(target);
        this.view.lightOffChannel(target);
        self.updateS();
        self.currentRegum = "pa";
    };
    //екстраполяция реализованая пока что возможности нахождения цели
    this.startExstrapolation = function (target) {
        var self=this;
        self.clearTimersAngles();
        self.exstrapolating = true;
        self.updateS();
        switch(target.direction){
            case 1:self.right();break;
            case -1:self.left();break;
            case 0:break;
            default:throw new Error("Wrong direction of target!");
        }
        setTimeout(function () {
            self.stopExstrapolation ();
        },10000);
    };
    this.stopExstrapolation = function () {
        var self=this;
        self.clearTimersAngles();
        self.exstrapolating = false;
        self.exstrapolation = false;
        self.updateS();
        self.currentRegum = "pa";
        self.avtomat();
    };

}

function Angle(a, u) {
    this.a = a;
    this.u = u;
}

function Target(channel, type, zone, startTime, liveTime) {

    this.angle = null;
    this.online = false;
    this.liveTime = liveTime;
    this.startTime = startTime;
    this.direction = function () {
        var r = Math.random();
        if(r<0.4)return 1;
        if(r>0.6)return -1;
        return 0;
    }();
    this.supressed = false;

    this.setChannel = function(value){
        if(isNaN(value)|| value<1 || value>64)
            throw new Error('Wrong channel in target.');
        else{
            this.channel=value;
        }
    };
    //angle is depending on zone!
    this.setAngle = function (angle) {
        if(angle instanceof Angle){
            if(angle.a<0 || angle.a>359)
                throw new Error('Wrong angle in target.');
            if(angle.u<0 || angle.u>60)
                throw new Error('Wrong angle in target.');
            this.angle=angle;
        }
        else{
            throw new Error('Wrong angle in target.');
        }
    };
    this.setZone = function (zone) {
        if(zone===1 || zone===2){
            this.zone=zone;
        }
        else throw new Error('Wrong zone in target.');
    };
    this.setType = function (type) {
        if(type==1 || type==2){
            this.type=type;
        }
        else throw new Error('Wrong type in target.');
    };
    this.apear = function () {
        var self=this;
        setTimeout(function(){
            self.online=true;
            setTimeout(function () {
                self.online=false;
            },self.liveTime*1000);
        },self.startTime*1000);
    };


    this.setChannel(channel);
    //1-rls weapon (outer),2-rls bo (inner)
    this.setType(type);
    //1 < more than 100km, 2 - less then 100km
    this.setZone(zone);
    this.apear();
}

function REO() {
    this.targets = [];
    var getChannel = function () {
        return Math.floor(Math.random() * 65);
    };
    var getAngle = function (target) {
        var a = Math.floor(Math.random() * 360);
        var u=null;
        switch(target.zone){
            case 1:
                u=Math.floor(Math.random() * (config.relativeMaxUmZone1+1));
            break;
            case 2:
                u=Math.floor(Math.random() * (config.relativeMaxUmZone2+1));
            break;
            default:throw new Error('Wrong zone in target!');
        }
        return new Angle(a, u);
    };
    var getType = function () {
        return Math.random() > 0.5 ? 1 : 2;
    };
    var getZone = function () {
        return Math.random() > 0.5 ? 1 : 2;
    };

    this.generateTargets = function (amount) {
        if (isNaN(amount))
            return;
        this.targets = [];
        for (var i = 0; i < amount; i++) {
            this.targets[i] = new Target(getChannel(), getType(), getZone(),i*config.frequencyTarget,config.liveTarget);
            //todo:ugly code!!!
            this.targets[i].setAngle(getAngle(this.targets[i]));
        }
    };
    this.getOnlineTargets = function () {
        return this.targets.filter(function (t) {
            return t.online;
        });
    };
    this.getSuppressedTargets = function () {
        return this.targets.filter(function (t) {
            return t.supressed;
        });
    };
    this.printTargets = function () {
        var self = this;
        if (self.targets.length == 0) {
            console.log("There are no targets in reo");
        }
        else {
            for (var i = 0; i < self.targets.length; i++) {
                var info = 'Target ' + i + '>channel:' + self.targets[i].channel +
                    ' azimut:' + self.targets[i].angle.a +
                    ' um:' + self.targets[i].angle.u +
                    ' type:' + self.targets[i].type +
                    ' zone:' + self.targets[i].zone +
                    ' start time:' + self.targets[i].startTime+
                    ' live during:' + self.targets[i].liveTime+
                    ' was suppressed:' + self.targets[i].supressed+
                    ' online: '+self.targets[i].online+
                    ' direction: '+self.targets[i].direction;
                console.log(info);
            }
            console.log('/n');
        }
    };
}