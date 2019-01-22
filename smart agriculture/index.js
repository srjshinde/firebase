firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("trial_div").style.display = "block";
    document.getElementById("user_div").style.display = "block";
    document.getElementById("page_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "User: "+email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("trial_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("page_div").style.display = "none";


  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

state="false";

fan_var= document.getElementById("fan_sw")
auto_var= document.getElementById("auto_sw")
pump_var= document.getElementById("pump_sw")
bulb_var= document.getElementById("bulb_sw")

temp_var= document.getElementById("temp_data")
humi_var= document.getElementById("humi_data")
moist_var= document.getElementById("moist_data")
light_var= document.getElementById("light_data")

function auto_switch(){
  //var auto_var= document.getElementById("auto_sw")
  if (auto_var.innerText =="Aut")
    {
      auto_var.innerText ="Man";
      autoRef.set("Man");
    }
  else
  {
    auto_var.innerText ="Aut";
    autoRef.set("Aut");
  }
} 

function fan_switch(){
   //var fan_var= document.getElementById("fan_sw")

if (state=="false")
{
  if (fan_var.innerText =="On")
  {
    fan_var.innerText ="Off";
    fanRef.set("Off");
  }
  else
  {
    fan_var.innerText ="On";
    fanRef.set("On");
  }
}
} 

function pump_switch(){
  //var pump_var= document.getElementById("pump_sw")
if (state=="false")
{
  if (pump_var.innerText =="On")
  {
    pump_var.innerText ="Off";
    pumpRef.set("Off");
  }
  else
  {
    pump_var.innerText ="On";
    pumpRef.set("On");
  }
}
} 

function bulb_switch(){
  //var bulb_var= document.getElementById("bulb_sw")
if (state=="false")
{
  if (bulb_var.innerText =="On")
  {
    bulb_var.innerText ="Off";
    bulbRef.set("Off");
  }
  else
  {
    bulb_var.innerText ="On";
    bulbRef.set("On");
  }
}
} 

function logout(){
  firebase.auth().signOut();
}


//var fan_var= document.getElementById("fan_sw")
  var autoRef = firebase.database().ref().child('auto_pos');
  autoRef.on('value', function(snap) {
  auto_var.innerText=snap.val();
  if ( auto_var.innerText=="Aut")
    state="true";
  else
    state="false";
  });
  //autoRef.on('value', snap => auto_var.innerText = snap.val());


  var fanRef = firebase.database().ref().child('fan_pos');
  fanRef.on('value', snap => fan_var.innerText = snap.val());

  var pumpRef = firebase.database().ref().child('pump_pos');
  pumpRef.on('value', snap => pump_var.innerText = snap.val());

  var bulbRef = firebase.database().ref().child('bulb_pos');
  bulbRef.on('value', snap => bulb_var.innerText = snap.val());



  var tempRef = firebase.database().ref().child('temp_data');
  tempRef.on('value', snap => temp_var.innerText = snap.val()+" degrees");

  var humiRef = firebase.database().ref().child('humi_data');
  humiRef.on('value', snap => humi_var.innerText = snap.val()+" Units");

  var moistRef = firebase.database().ref().child('light_data');
  moistRef.on('value', snap => moist_var.innerText = snap.val()+" Units");

  var lightRef = firebase.database().ref().child('moist_data');
  lightRef.on('value', snap => light_var.innerText = snap.val()+" Cd");

  

