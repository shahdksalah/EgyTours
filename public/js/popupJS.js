

function show(id) {
    let signin = document.getElementById(id);
    signin.style.display = 'block';

    document.getElementById('username').value = "";
    document.getElementById('password1').value = "";

    document.getElementById('un').innerHTML = "";
    document.getElementById('pass').innerHTML = "";
}
function hide(id) {
    let x = document.getElementById(id);
    x.style.display = 'none';
}

function hide2(id1, id2) {
    let x = document.getElementById(id1);
    let y = document.getElementById(id2);
    x.style.display = 'none';
    y.style.display = 'none';

    var errors = document.getElementsByClassName('error-message');
    for (let index = 0; index < errors.length; index++) {
        const error = errors[index];
        error.innerHTML = "";
    }

}

function showdrop() {
    document.getElementById("drop").style.display = 'block';

}
function hidedrop() {
    document.getElementById("drop").style.display = "none";
}

function displayDropdown() {
    document.getElementById("dropdown-content").style.display = "block";
}

function hideDropdown() {
    document.getElementById("dropdown-content").style.display = "none";
}



