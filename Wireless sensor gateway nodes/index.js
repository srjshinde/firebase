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

temp_var= document.getElementById("temp_data")
humi_var= document.getElementById("humi_data")
moist_var= document.getElementById("moist_data")
light_var= document.getElementById("light_data")

 

function logout(){
  firebase.auth().signOut();
}

  var tempRef = firebase.database().ref().child('N1/S1');
  tempRef.on('value', snap => temp_var.innerText = snap.val()+" degrees");

  var humiRef = firebase.database().ref().child('N1/S2');
  humiRef.on('value', snap => humi_var.innerText = snap.val()+" degrees");

  var moistRef = firebase.database().ref().child('N2/S3');
  moistRef.on('value', snap => moist_var.innerText = snap.val()+" degrees");

  var lightRef = firebase.database().ref().child('N2/S4');
  lightRef.on('value', snap => light_var.innerText = snap.val()+" degrees");

  
