function openTab(evt, tabName) {
    if(tabName=='admin'){
      /*if(config.password!==prompt("Введите пароль!")){
        return;
      }*/
      loadSettings();
    }
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}
//at the beggining tab admin is not visible
document.getElementById('admin').style.display = "none";
document.getElementById('reo').style.display = "none";
//for settings tab functionality
function loadSettings(){
  var form = document.forms.formSettings;
  var liveTarget = form.liveTarget;
  liveTarget.value = config.liveTarget;

  var frequencyTarget = form.frequencyTarget;
  frequencyTarget.value = config.frequencyTarget;

  var numTargets = form.numTargets;
  numTargets.value = config.numTargets;

  var delayAvariya = form.delayAvariya;
  delayAvariya.value = config.delayAvariya;

  var delayVisokoe = form.delayVisokoe;
  delayVisokoe.value = config.delayVisokoe;
}
function saveSettings(){
  var form = document.forms.formSettings;
  var liveTarget = form.liveTarget;
  config.liveTarget= liveTarget.value;

  var frequencyTarget = form.frequencyTarget;
  config.frequencyTarget =frequencyTarget.value;

  var numTargets = form.numTargets;
  config.numTargets = numTargets.value;

  var delayAvariya = form.delayAvariya;
  config.delayAvariya = delayAvariya.value;

  var delayVisokoe = form.delayVisokoe;
  config.delayVisokoe = delayVisokoe.value;
}
function addTarget(reo){
  var form = document.forms.addTargetForm;
  var azimut=form.targetAzimut.value;
  var zone=form.targetZone.value;
  var type=form.targetType.value;
  var channel= form.targetChannel.value;
  reo.addTarget(azimut,channel,zone,type);
}
