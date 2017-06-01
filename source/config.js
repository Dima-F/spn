var config = {
    //время задержки АФС в мс
    slowAz:750,
    slowUm:800,
    fastAz:50,
    fastUm:150,
    obzorAz:50,
    obzorUm:65,
    password:'123ewq',
    //время задержки загорания ламп в с
    delayAvariya:4,
    delayVisokoe:15,
    //растояния до цели, в км
    minDistance:50,
    maxDistance:250,
    //количество целей в РЕО
    numTargets:10,
    //время жизни цели в c.
    liveTarget:300,
    //частота появления новой цели в рео
    frequencyTarget:200,
    //используется при поиске цели
    deltaUzkie:2,
    deltaShirokie:5,
    //время сопровождения в с, если не нажата кнопка "Выдержка АС"
    timeSoprovogdeniya:30,
    //максимально возможный угол места цели относительно станции
    //для возможности осуществления поиска.
    relativeMaxUmZone1:11,
    relativeMaxUmZone2:30,
    //время в с через которое проверяется в РЕО время жизни цели для удаления.
    deletingTargetInterval:10
};
//here i put some usefull global functions
var getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
var getRandomTwo = function () {
  return Math.random()>0.5?1:2;
};
var getRussianBool = function(state){
  if(state){
    return "да";
  } else {
    return "нет";
  }
};
