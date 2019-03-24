  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("logged_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Logged-in User: "+email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("login_div").style.display = "block";
    document.getElementById("logged_div").style.display = "none";


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

function logout(){
  firebase.auth().signOut();
}


  current_slot='slot1';


  dbref=firebase.database().ref();
  dbref.on('value', function(snap){

  if ((snap.child('slot1').child('occupancy').val()) == 'yes')
    document.getElementById('slot1').style.background="red";
  else
    document.getElementById('slot1').style.background="lightgreen";

  if ((snap.child('slot2').child('occupancy').val()) == 'yes')
    document.getElementById('slot2').style.background="red";
  else
    document.getElementById('slot2').style.background="lightgreen";

  if ((snap.child('slot3').child('occupancy').val()) == 'yes')
    document.getElementById('slot3').style.background="red";
  else
    document.getElementById('slot3').style.background="lightgreen";

  if ((snap.child('slot4').child('occupancy').val()) == 'yes')
    document.getElementById('slot4').style.background="red";
  else
    document.getElementById('slot4').style.background="lightgreen";

  datakey=Object.keys(snap.child('users').val());


  document.getElementById('slot1').innerText= snap.child('slot1').child('status').val()
  document.getElementById('slot2').innerText= snap.child('slot2').child('status').val()
  document.getElementById('slot3').innerText= snap.child('slot3').child('status').val()
  document.getElementById('slot4').innerText= snap.child('slot4').child('status').val()

  });

  function book_slot(number)
    {
      //document.getElementById(number).style.background="red";
      current_slot=number
      document.getElementById("num").innerText="Book "+number;
      if (document.getElementById(number).innerText=='booked')
        alert(number+" is already booked!!!");
      else
        document.getElementById("myForm").style.display = "block";
    }

    function cancel_slot(number)
    {
      document.getElementById(number).style.background="lightgreen";
      document.getElementById(number).innerText="free";
 //     document.getElementById("myForm").style.display = "none";
    }

    function close_form() {
      document.getElementById("myForm").style.display = "none";
    }


    function submit_close_form(slot_num) {
      document.getElementById("myForm").style.display = "none";

      mail_id=document.getElementById('email').value;
      v_num=document.getElementById('vnum').value;

      for(i=0; i < datakey.length ; i++ )
      {
        if( v_num == datakey[i])
         {
          found ="yes";
          break;
         } 
        else
          found = 'no';
      }

      if (found == 'yes')
      {
        document.getElementById(slot_num).style.background="red";
        alert(slot_num+" booked successfully for Vehicle number: "+v_num);
        dbref.child(slot_num).child('status').set('booked');
        dbref.child(slot_num).child('name').set(mail_id);
        dbref.child(slot_num).child('number').set(v_num);

      }
      else
        alert('No user corresponding to Vehicle number:'+ v_num+" found!");
    }
