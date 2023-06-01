


function validated(){
  let people = document.getElementById("dropbtn");
  let dat = document.getElementById("days");
  let valid = true;
  if(people.value==""){
    valid = false;
    document.getElementById("msg").innerHTML="Choose number: ";
  }
  else{
    document.getElementById("msg").innerHTML="";
  }
  if(dat.value==""){
    valid = false;
    document.getElementById("date-msg").innerHTML="Choose date";
  }
  else{
    document.getElementById("date-msg").innerHTML="";
  }
  return valid;

}

// document.getElementById("subForm").addEventListener('submit',Event=>{
//   document.getElementById("participants").value=document.getElementsByName("num").value;
//   document.getElementById("date").value=document.getElementsByName("days").value;
//   return true;
// })
  

