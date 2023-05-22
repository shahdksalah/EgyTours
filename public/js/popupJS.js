

function show(id){
    let signin = document.getElementById(id);
    signin.style.display='block';
}
function hide(id){
    let x = document.getElementById(id);
    x.style.display='none';
}


    

async function handleLogout()  {
    location.href = "http://localhost:8080/signout";

}

 function displayDropdown(){
     document.getElementById("dropdown-content").style.display="block";
 }

 function hideDropdown(){
     document.getElementById("dropdown-content").style.display="none";
 }
      


/*function proceed()
{
    var myName=document.querySelector('#uname').value;
    var myEmail=document.querySelector('#femail').value;
    var myNumber=document.querySelector('#number').value;
    var mypass=document.querySelector('#password').value;
    var myconfpass=document.querySelector('#password-confirmation').value;
    console.log(myName);
    var obj={
        unam:myName,
        email:myEmail,
        number:myNumber,
        psw:mypass,
        confpsw:myconfpass
    };
    fetch('/success',{
        method:"POST",
        headers:{
           "Content-type":"application/json"
        },
     
        body:JSON.stringify(obj)
    });
    console.log(myName);
}*/

