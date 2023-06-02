

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

      

