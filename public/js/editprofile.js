const users =[
    {"id": "1", "name":"shahd", "email":"shahd@gmail.com", "age": 20,"number":"01023234", "password":"1234"},
    {"id": "2", "name":"menna", "email":"menna@gmail.com", "age": 19,"number":"01029213","password":"123"},
    {"id": "3", "name":"laila", "email":"laila@gmail.com", "age": 19,"number":"01029903","password":"12345"},
    {"id": "4", "name":"jana", "email":"jana@gmail.com", "age": 19,"number":"010234553","password":"123456"},
]
var usN = document.getElementById("uname");
var usE = document.getElementById("femail");
var usNo = document.getElementById("phonum");
var usA = document.getElementById("age");

function displayInfo(email){
    var user = users.find((val,idx,arr) => {return val.email = email});
    if(user){
        usN.value = user.name;
        usE.value = user.email;
        usNo.value= user.number;
        usA.value = user.age;
    }
}

function editProf(){
    var doc = document.getElementById("editForm");
    doc.style.display='block';
    var rem = document.getElementById("details");
    rem.style.display="none";
    var b = document.getElementById("button");
    b.style.display="none";
    var bu = document.getElementById("saveButtons");
    bu.style.display="block";
    
}

function cancel(){
    var doc = document.getElementById("editForm");
    var bu = document.getElementById("saveButtons");
    var det = document.getElementById("details");
    var b = document.getElementById("button");
    det.style.display="block";
    b.style.display="block";
    doc.style.display='none';
    bu.style.display="none";
}



var us = document.getElementById("user");
var usr = document.getElementById("username");
var use = document.getElementById("uemail");
var usp = document.getElementById("uphone");
var usa = document.getElementById("uage");
function displayName(email){
    var user = users.find((val,idx,arr) => {return val.email = email});
    if(user){
        us.innerHTML = user.name;
        usr.innerHTML = user.name;
        use.innerHTML = user.email;
        usp.innerHTML = user.number;
        usa.innerHTML = user.age;
    }
}



window.onload = function(){
   displayName('shahd@gmail.com');
}


function saveInfo(){

}