var newf = 1;

var newa = 1;
var ind = 0;
function addItem(item, finalres, newid, list, errorid) {
    var data = document.getElementById(item).value;
    var it = document.getElementById(item);
    if (data !== "") {
        var newli = document.createElement('li');
        if (newid.includes('feat')) {
            newli.setAttribute('id', newid + newf);
            newf++;
        }
        else {
            newli.setAttribute('id', newid + newa);
            newa++;
        }

        newli.innerHTML = data;


        var rembut = document.createElement('button');
        rembut.setAttribute('type', "button");
        if (newid.includes('feat')) {
            rembut.setAttribute('id', 'featbut' + newf);
        }
        else {
            rembut.setAttribute('id', 'amenbut' + newa);
        }

        rembut.classList.add('plus');
        rembut.style.width = "80px";
        rembut.innerHTML = 'remove';
        rembut.addEventListener('click', event => {

            document.getElementById(rembut.id).remove();
            document.getElementById(newli.id).remove();

        })

        document.getElementById(list).appendChild(newli);
        document.getElementById(newli.id).parentNode.insertBefore(rembut, document.getElementById(newli.id).nextSibling);
        document.getElementById(item).value = "";

        document.getElementById(errorid).innerHTML = "";

    }
    else {

        document.getElementById(errorid).innerHTML = "Please enter information";
    }
}

var newt = 1;
function donez(newid, list) {
    var price = document.getElementById('price');
    var typein = document.getElementById('addedtype');
    var roomin = document.getElementById('rooms');
    var capin = document.getElementById('cap');

    var newli;

    var rembut = document.createElement('button');
    rembut.setAttribute('type', "button");
    rembut.classList.add('plus');
    rembut.style.width = "80px";
    rembut.innerHTML = 'remove';
    rembut.setAttribute('id', "newbut" + newt);
    rembut.addEventListener('click', () => {
        document.getElementById('showprice').style.display = "none";

        document.getElementById('success').innerHTML = "";
        document.getElementById(newli.id).remove();
        document.getElementById(rembut.id).remove();
    })


    if (price.value !== "" && roomin.value !== "" && capin.value !== "") {
        newli = document.createElement('li');
        newli.setAttribute('id', newid + newt);
        document.getElementById('errorrooms').innerHTML = "";
        document.getElementById('errorcap').innerHTML = "";
        document.getElementById('errorprice').innerHTML = "";
        document.getElementById('success').innerHTML = "Saved successfully";
        newli.innerHTML = `${typein.value} - ${price.value}LE | ${roomin.value} Rooms | Max. Capacity: ${capin.value}`;
        document.getElementById(list).appendChild(newli);
        document.getElementById(newli.id).parentNode.insertBefore(rembut, newli.nextSibling);

        price.value = "";
        typein.value = "";
        roomin.value = "";
        capin.value = "";

        newt++;


        document.getElementById('showprice').style.display = "none";


        typein.addEventListener("keydown", () => {
            document.getElementById('success').innerHTML = "";
            document.getElementById('errorprice').innerHTML = "";
            document.getElementById('errorrooms').innerHTML = "";
        })
    }
    else if (roomin.value !== "") {
        document.getElementById('errorrooms').innerHTML = "You must enter number of rooms";
        document.getElementById('success').innerHTML = "";
    }
    else {
        document.getElementById('errorprice').innerHTML = "You must enter a price";
        document.getElementById('success').innerHTML = "";
    }



}



function addType() {
    var letters = /^[A-Za-z]+$/;

    if (document.getElementById('addedtype').value === "") {
        document.getElementById('errortype').innerHTML = "You must enter a room type";
    }
    else if (!document.getElementById('addedtype').value.match(letters)) {
        document.getElementById('errortype').innerHTML = "Room Type not valid";
    }
    else {
        document.getElementById('errortype').innerHTML = "";
        document.getElementById("showprice").style.display = "block";
    }


}

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
        document.getElementById('error-imgs').innerHTML = "You must upload images";
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


