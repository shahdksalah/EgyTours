

function show(id){
    let signin = document.getElementById(id);
    signin.style.display='block';
}
function hide(id){
    let x = document.getElementById(id);
    x.style.display='none';
}

function signout(){
    this.authenticated=false;

    fetch('http://localhost:8080/logout' + e._id, {
        headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
        },
        method: "DELETE",
        body: e
    })
    .then(res => res.json())
      
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

