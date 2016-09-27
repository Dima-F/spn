function Station(reo) {
    //private members
    var idAvariya = 0;
    var idVisokoe = 0;

    this.view = null;
    this.started = false;
    this.nizkoe = false;
    this.avariyaAk = false;
    this.visokoe = false;
    this._3kV = false;
    this.peredachik = false;
    this.emuAzimut = false;
    this.emuUgolMesta = false;
    this.currentRegum = "pa";
    this.currentVidUpravleniya = "avt";
    this.currentSector = 360;
    this.currentDiagrams = "w";
    this.currentAntenna = "a";
    this.vidergka = 0;//can be 0,5,10,20,30

    this.a = 0;
    this.u = 0;
    this.poiskDirection = "z";



    this.idA = 0;
    this.idU = 0;
    this.idViderzka = 0;
    this.idSoprovogdeniya = 0;
    this.idStopSoprovogdeniya = 0;
    this.reo = reo;
    this.view = null;

    this.start = function () {
        this.started = true;
        this.nizkoe = true;
        this.avariyaAk = true;
        this.prepareVisokoe();
    };

    this.toggleStart = function () {
        if (this.started) {
            this.reset();
        } else {
            this.start();
        }
    };
    this.toggleAntenna = function () {
        this.currentAntenna = this.currentAntenna !== "a" ? "a" : "e";
    };
    this.reset = function () {
        this.started = false;
        this.peredachik = false;
        this._3kV = false;
        this.visokoe = false;
        this.nizkoe = false;
        this.soprovogdenie=false;
        this.emuAzimut = false;
        this.emuUgolMesta = false;
        this.currentRegum = "pa";
        this.currentSector = 360;
        this.currentDiagrams = "w";
        this.clearTimersLamps();
        this.clearTimersAngles();
        //для азимута и угла места сброс не требуется, т. к. антена сохраняет свое положение
    };
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
    //против часовой стрелки
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
    //за часовой стрелкой
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
    self.vniz = function (delay) {
        if (self.currentRegum != "pa") {
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
    //todo:validation
    this.setEmuAz = function (flag) {
        if (!this.started) {
            return null;
        }
        else {
            this.emuAzimut = flag;
        }
    };
    //todo:validation
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
        if (!this.started) {
            return false;
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
    this.prepareVisokoe = function () {
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
    this.obzor = function () {
        if (!this.started || this.currentRegum == "ob" || !this.emuAzimut) {
            return;
        }
        if (this.currentRegum == "av") {
            alert("ПУстановите режим 'Обзор' из режима 'Полуавтомат'");
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
        this.currentRegum = "pa";
        this.poiskDirection = "z";
        this.updateS();
        this.clearTimersAngles();
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

    this.clearTimersLamps = function () {
        clearTimeout(idAvariya);
        clearTimeout(idVisokoe);
    };
    this.clearTimersAngles = function () {
        clearInterval(this.idA);
        clearInterval(this.idU);
        clearTimeout(this.idViderzka);
        clearInterval(this.idSoprovogdeniya);
    };

    //event technology
    this.updateS = function () {
        this.view.refreshStatic();
    };
    this.updateR = function () {
        this.view.refreshRotation();
        if(this.currentRegum!="pa" && !this.soprovogdenie)
            this.resive();
    };
    this.subscribe = function (view) {
        this.view = view;
    };


    this.resive = function () {
        if (!this.started || !this.nizkoe)
            return;
        if (!this.reo || this.reo.targets.length == 0)
            return;
        for (var i = 0; i < this.reo.targets.length; i++) {
            if (this.a == this.reo.targets[i].angle.a) {
                this.view.lightSector(this.reo.targets[i].angle.a, this.reo.targets[i].type);
                this.view.lightKanal(this.reo.targets[i].channel);
                var self = this;

                switch (self.currentRegum) {
                    case "pa":
                        break;
                    case "av":
                        self.clearTimersAngles();
                        self.startSoprovogdenie();
                        break;
                    case "ob":
                        if (self.vidergka != 0) {
                            self.clearTimersAngles();
                            self.idViderzka = setTimeout(function () {
                                self.currentRegum="pa";
                                self.obzor();
                            }, self.vidergka * 1000);
                        }
                        break;
                    default:
                        throw new Error("Wrong regum!");
                }
            }
        }
    };
    this.startSoprovogdenie = function () {
        var self=this;
        self.soprovogdenie=true;
        self.updateS();
        var direction = Math.random();
        self.idSoprovogdeniya = setInterval(function () {
            direction>0.5?self.left():self.right();
        },2500);
        self.idStopSoprovogdeniya = setTimeout(function () {
            self.stopSoprovogdeniya ();
        },config.timeSoprovogdeniya*1000);
    };
    this.stopSoprovogdeniya = function () {
        var self=this;
        clearInterval(self.idSoprovogdeniya);
        self.soprovogdenie=false;
        self.updateS();
        self.currentRegum = "pa";
        self.avtomat();
    };
    this.transmit = function () {
        if(this.visokoe && this.soprovogdenie){
            this.peredachik = true;
            return true;
        }
        return false;
    }
}
function Angle(a, u) {
    this.a = a;
    this.u = u;
}

function Target(channel, angle, type, distance, expiration) {
    this.channel = channel;
    this.angle = angle;
    this.type = type;
    this.distance = distance;
    this.expiration = expiration;
}

function REO() {
    this.targets = [];
    this.generateTargets = function (amount) {
        if (isNaN(amount))
            return;
        this.targets = [];
        for (var i = 0; i < amount; i++) {
            this.targets[i] = new Target(getChannel(), getAngle(), getType(), getDistance(), getExpiration())
        }
    };
    var getChannel = function () {
        return Math.floor(Math.random() * 65);
    };
    var getAngle = function () {
        var a = Math.floor(Math.random() * 360);
        var u = Math.floor(Math.random() * 61);
        return new Angle(a, u);
    };
    var getType = function () {
        return Math.random() > 0.5 ? 'a' : 'b';
    };
    var getDistance = function () {
        if (config)
            return Math.floor(config.minDistance + Math.random() * (config.maxDistance - config.minDistance + 1));
    };
    var getExpiration = function () {
        if (config)
            return config.expirationTime;
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
                    ' distance:' + self.targets[i].distance +
                    ' expiration:' + self.targets[i].expiration;
                console.log(info);
            }
        }
    };


}
