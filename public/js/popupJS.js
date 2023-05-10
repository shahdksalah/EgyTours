

function show(id){
    let signin = document.getElementById(id);
    signin.style.display='block';
}
function hide(id){
    let x = document.getElementById(id);
    x.style.display='none';
}

function proceed()
{
    var myName=document.querySelector('#uname').value;
    var myEmail=document.querySelector('#femail').value;
    var myNumber=document.querySelector('#number').value;
    var mypass=document.querySelector('#password').value;
    var myconfpass=document.querySelector('#password-confirmation').value;
    var obj={
        name:myName,
        email:myEmail,
        number:myNumber,
        password:mypass,
        confirmpass:myconfpass
    };

    fetch('/success',{
        method:"POST",
        headers:{
           "Content-type":"apllication/json"
        },
        body:JSON.stringify(obj)
    });
}
