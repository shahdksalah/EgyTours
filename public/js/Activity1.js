


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
