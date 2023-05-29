
const but= document.getElementById('check');
console.log(but);
but.addEventListener("submit", (e) =>
{
  e.preventDefault();
    console.log("heyy");
    document.querySelector("#num1").textContent=document.querySelector("#dropbtn").value;
    let sum=document.querySelector("#num1").textContent*document.querySelector("#price1").textContent;
    document.querySelector("#total1").textContent=sum;


});



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

