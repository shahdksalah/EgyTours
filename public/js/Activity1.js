let a=document.getElementById("avail");
function view()
{
  let a=document.getElementById("avail");
  if(validated()){
    a.style.display="block";
    document.querySelector("#time").textContent=document.querySelector('#dat').value;

    document.querySelector("#num1").textContent=document.querySelector("#dropbtn").value;

    let sum=document.querySelector("#num1").textContent*document.querySelector("#price1").textContent;
    document.querySelector("#total1").textContent=sum;

  }
}

let book = document.getElementById("book");
function validated(){
  let adults = document.getElementById("dropbtn");
  let children = document.getElementById("dropbtn1");
  let dat = document.getElementById("days");
  let valid = true;
  if(adults.value==""){
    valid = false;
    document.getElementById("msg").innerHTML="Choose number: ";
  }
  else{
    document.getElementById("msg").innerHTML="";
  }
  if(dat.value.length==0){
    valid = false;
    document.getElementById("date-msg").innerHTML="Choose date";
  }
  else{
    document.getElementById("date-msg").innerHTML="";
  }
  return valid;

}

