let a=document.getElementById("avail");
function view()
{
  let a=document.getElementById("avail");
  if(validated()){
    a.style.display="block";
    document.querySelector("#time").textContent=document.querySelector('#dat').value;

    document.querySelector("#num1").textContent=document.querySelector("#dropbtn").value;
    document.querySelector("#num2").textContent=document.querySelector("#dropbtn1").value;

    let sum=document.querySelector("#num1").textContent*document.querySelector("#price1").textContent;
    document.querySelector("#total1").textContent=sum;

    let sum1=document.querySelector("#num2").textContent*document.querySelector("#price2").textContent;
    document.querySelector("#total2").textContent=sum1;

    let sum3=sum+sum1;
    document.querySelector("#t").textContent=sum3;
  }
}

let book = document.getElementById("book");
function validated(){
  let adults = document.getElementById("dropbtn");
  let children = document.getElementById("dropbtn1");
  let dat = document.getElementById("dat");
  let valid = true;
  if(adults.value==""){
    valid = false;
    document.getElementById("adult-msg").innerHTML="Choose number of adults";
  }
  else{
    document.getElementById("adult-msg").innerHTML="";
  }
  if(children.value.length==0){
    valid = false;
    document.getElementById("child-msg").innerHTML="Choose number of children";
  }
  else{
    document.getElementById("child-msg").innerHTML="";
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

