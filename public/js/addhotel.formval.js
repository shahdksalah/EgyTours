var form = document.getElementById("hotel");
form.addEventListener('submit', (e) => {
    var error = false;
    var name = document.getElementById('name');
    var loc = document.getElementById('location');
    var imgs = document.getElementById('imgs');
    var about = document.getElementById('about');

    if (name.value === "") {
        document.getElementById('error-name').innerHTML = "You must enter hotel name";
        error = true;
    }

    if (loc.value === "") {
        document.getElementById('error-loc').innerHTML = "You must enter hotel location";
        error = true;
    }

    if (imgs.value === "") {
        document.getElementById('error-imgs').innerHTML = "You must upload 10 images";
        error = true;
    }
    else if (imgs.files.length < 10) {
        document.getElementById('error-imgs').innerHTML = "You must upload atleast 10 images";
        error = true;
    }

    if (about.value === "") {
        document.getElementById('error-about').innerHTML = "You much enter hotel description";
        error = true;
    }


    var featlist = document.querySelectorAll(`[id^="featli"]`);
    var feattext = document.getElementById('finalfeats');

    var amenlist = document.querySelectorAll(`[id^="amenli"]`);
    var amentext = document.getElementById('finalamens');

    var typelist = document.querySelectorAll(`[id^="typeli"]`);
    var typetext = document.getElementById('finaltypes');
    var pricetext = document.getElementById('finalprices');
    var roomtext = document.getElementById('finalrooms');
    var captext = document.getElementById('finalcaps');

    if (featlist.length == 0) {
        document.getElementById('errorfeat').innerHTML = "You must enter room features";
        error = true;
    }
    else {
        for (var i = 0; i < featlist.length; i++) {
            feattext.value += `${featlist[i].innerHTML},`;
        }
    }

    if (amenlist.length == 0) { 
        document.getElementById('erroramen').innerHTML = "You must enter room features";
        error = true;
    }
    else {
        for (var i = 0; i < amenlist.length; i++) {
            amentext.value += `${amenlist[i].innerHTML},`;
        }
    }

    if (typelist.length == 0) {
        document.getElementById('errortype').innerHTML = "You must enter room features";
        error = true;
    }
    else {
        for (var i = 0; i < typelist.length; i++) {
            typetext.value += `${typelist[i].innerText.slice(0, typelist[i].innerText.indexOf('-') - 1)},`;
            pricetext.value += `${typelist[i].innerHTML.slice(typelist[i].innerText.indexOf('-') + 2, typelist[i].innerText.indexOf('L'))},`;
            roomtext.value += `${typelist[i].innerText.slice(typelist[i].innerText.indexOf('|') + 2, typelist[i].innerText.indexOf('R') - 1)},`;
            captext.value += `${typelist[i].innerText.slice(typelist[i].innerText.indexOf(':') + 2, typelist[i].innerText.length)},`;
        }
    }



    if (error == true) {
        e.preventDefault();
    }
    else {
        document.getElementById('errortype').innerHTML = "";
        document.getElementById('errorrooms').innerHTML = "";
        document.getElementById('errorfeat').innerHTML = "";
        document.getElementById('erroramen').innerHTML = "";
        document.getElementById('error-name').innerHTML = "";
        document.getElementById('error-loc').innerHTML = "";
        document.getElementById('error-imgs').innerHTML = "";
        document.getElementById('error-about').innerHTML = "";

    }


})
