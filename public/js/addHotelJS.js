var newf = 1;

var newa = 1;
var ind = 0;
function addItem(item, finalres, newid, list, errorid) {
    var data = document.getElementById(item).value;
    var it = document.getElementById(item);
    if (data !== "") {
        document.getElementById(finalres).value += data + ',';
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
        rembut.classList.add('plus');
        rembut.style.width = "80px";
        rembut.innerHTML = 'remove';
        rembut.setAttribute('id', "newbut" + newt);
        rembut.addEventListener('click', event => {

            document.getElementById(newli.id).remove();
            document.getElementById(rembut.id).remove();

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

function removeItem(item, mybut) {
    document.getElementById('showprice').style.display = "none";
    document.getElementById(item).remove();
    mybut.remove();
}

function removeItem2(item, mybut, index) {
    document.getElementById('showprice').style.display = "none";
    var p = document.getElementById('finalprices').value;
    var prices = p.split(',');
    console.log(prices);
    prices.splice(ind, 1);
}



var newt = 1;
function addType(newid, list) {
    var newli = document.createElement('li');
    console.log(newt);
    newli.setAttribute('id', newid + newt);
    document.getElementById("showprice").style.display = "block";

    var price = document.getElementById('price');
    var typein = document.getElementById('addedtype');
    
    


    

    var rembut = document.createElement('button');
    rembut.setAttribute('type', "button");
    rembut.classList.add('plus');
    rembut.style.width = "80px";
    rembut.innerHTML = 'remove';
    rembut.setAttribute('id', "newbut" + newt);
    rembut.addEventListener('click', event => {
        document.getElementById('showprice').style.display = "none";
        
        document.getElementById('success').innerHTML = "";
        var newtext = document.getElementById('finalprices').value.replace(`${newli.innerHTML.slice(newli.innerHTML.indexOf('-')+2,newli.innerHTML.indexOf('L'))},`, "");
        document.getElementById('finalprices').value = newtext;

        var newtext2 = document.getElementById('finaltypes').value.replace(`${newli.innerHTML.slice(0,newli.innerHTML.indexOf('-')-1)},`, "");
        document.getElementById('finaltypes').value = newtext2;

        document.getElementById(newli.id).remove();
        document.getElementById(rembut.id).remove();
    })

    
    
    
    var done = document.getElementById('done');
    done.addEventListener('click', (e) => {
        if (price.value !== "") {
            document.getElementById('finalprices').value += `${price.value},`;
            document.getElementById('finaltypes').value += `${typein.value},`;
            document.getElementById('errortype').innerHTML = "";
            document.getElementById('success').innerHTML = "saved successfully";
            newli.innerHTML = `${typein.value} - ${price.value}LE`;
            document.getElementById(list).appendChild(newli);
           
            
            newt++;
            price.value = "";
            typein.value = "";

            document.getElementById(newli.id).parentNode.insertBefore(rembut, newli.nextSibling);
            document.getElementById('showprice').style.display = "none";
            


            typein.addEventListener("keydown", () => {
                document.getElementById('success').innerHTML = "";
            })
        }
        else {
            document.getElementById('errortype').innerHTML = "You must enter a price";
            document.getElementById('success').innerHTML = "";
        }
    })
    

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

    var amen = document.getElementsByName('amen')
    var textamen = document.getElementById('finalamens')
    var rf = document.getElementsByName('feat');
    var textrf = document.getElementById('finalfeats');
    var rt = document.getElementsByName('type');
    var textrt = document.getElementById('finalfeats');

    if (textamen.value !== "") {

        for (var i = 0; i < amen.length; i++) {
            if (amen[i].checked)
                textamen.value += `${amen[i].value}, `;

        }
    }
    else {
        document.getElementById('erroramen').innerHTML = "You must enter atleast 1 amenity";
        error = true;
    }

    if (textrf.value !== "") {

        for (var j = 0; j < rf.length; j++) {
            if (rf[j].checked)
                textrf.value += `${rf[j].value}, `;

        }
    }
    else {
        document.getElementById('errorfeat').innerHTML = "You must enter atleast 1 feature";
        error = true;
    }

    if (textrt.value !== "") {

        for (var k = 0; k < rt.length; k++) {
            if (rt[k].checked)
                textrt.value += `${rt[k].value}, `;

        }
    }
    else {
        document.getElementById('errortype').innerHTML = "You must enter atleast 1 type";
        error = true;
    }


    if (error == true) {
        e.preventDefault();
    }
    else {
        document.getElementById('errortype').innerHTML = "";
        document.getElementById('errorfeat').innerHTML = "";
        document.getElementById('erroramen').innerHTML = "";
        document.getElementById('error-name').innerHTML = "";
        document.getElementById('error-loc').innerHTML = "";
        document.getElementById('error-imgs').innerHTML = "";
        document.getElementById('error-about').innerHTML = "";

    }


})


