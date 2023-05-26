function myFunction() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function updateDeleteButtons(index) {
  let a;
  a = document.getElementById(index);
  a.getElementsByTagName("button")[0].style.display = "flex";
  a.getElementsByTagName("button")[1].style.display = "flex";
}

function exit(index) {
  a = document.getElementById(index);
  a.getElementsByTagName("button")[0].style.display = "none";
  a.getElementsByTagName("button")[1].style.display = "none";
}

function bckText(id, txt) {
  let text = document.createElement("p");
  let repNode = document.getElementById(id);
  text.innerHTML = (txt);
  text.setAttribute("id", id);
  repNode.replaceWith(text);
}


function Update(index) {
  document.getElementById("updateInfo").style.display = "block";
}
function Delete(index) {
  document.getElementById("c").style.display = "block";
}
function del() {
  document.getElementById("msg").style.display = "block";
}
function cancel() {
  document.getElementById("c").style.display = "none";
}

function replaceInfo(id) {
  let textBox = document.createElement("input");
  textBox.setAttribute("type", "text");
  let repNode = document.getElementById(id);
  textBox.setAttribute("value", repNode.innerText);
  textBox.setAttribute("id", id);
  textBox.setAttribute('name', id);
  textBox.style.height = '30px';
  textBox.style.width = '400px';
  repNode.replaceWith(textBox);
  textBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      bckText(id, textBox.value);
    }
  });
}























function replaceInfoImages(id, value, query) {
  document.getElementById(id).setAttribute('src', value);
}

function showInput(id, imgid) {
  var inp = document.getElementById(id);
  inp.hidden = false;
  inp.addEventListener('change', (event) => {
    var imgsrc = URL.createObjectURL(event.target.files[0]);
    replaceInfoImages(imgid, imgsrc);
    var img = document.getElementById(imgid);
    img.style.border = 'solid 4px red';
    inp.hidden = true;
  })
}

function displayOptions(query, options, id, delid, delbut) {
  var checks = document.querySelectorAll(`[id^=${query}]`);
  var ops = options.split(',');
  checks.forEach((check) => {
    ops.forEach((op) => {
      if (check.value == op.trim()) {
        check.checked = true;
      }
    })
  })
  document.getElementById(id).style.display = 'block';
  document.getElementById(delid).style.display = 'none';
  document.getElementById(delbut).style.display = 'none';
}


var newf = 1;
var newt = 1;
var newa = 1;
function addItem(item, finalres, newid, list, errorid) {
  var data = document.getElementById(item).value;
  var it = document.getElementById(item);
  if (data !== "") {
    document.getElementById(finalres).value += + ',';

    var newli = document.createElement('li');
    if (newid.includes('type')) {
      newli.setAttribute('id', newid + newt);
      newt++;
    }
    else if (newid.includes('feat')) {
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
    rembut.innerHTML = 'remove';
    if (newid.includes('feat')) {
      rembut.setAttribute('id', 'featbut' + newf);
    }
    else {
      rembut.setAttribute('id', 'amenbut' + newa);
    }
    rembut.addEventListener('click', event => {
      document.getElementById(newli.id).remove();
      document.getElementById(rembut.id).remove();
      if (newid.includes('type')) {
        document.getElementById('updatebut' + newt);
      }

    })

    document.getElementById(list).appendChild(newli);
    document.getElementById(newli.id).parentNode.insertBefore(rembut, document.getElementById(newli.id).nextSibling);
    it.value = "";
    document.getElementById(errorid).innerHTML = "";
  }
  else {
    document.getElementById(errorid).innerHTML = "Please enter information";
  }

}


var edittype = document.getElementById('edittype');
var editprice = document.getElementById('editprice');
function updateType(idli) {

  document.getElementById('addtype').style.display="none";
  document.getElementById('errors').style.display="none";
  var item = document.getElementById(idli);
  var oldtype = `${item.innerText.slice(0, item.innerText.indexOf('-') - 1)}`
  var oldprice = `${item.innerText.slice(item.innerText.indexOf('-') + 2, item.innerText.indexOf('L'))}`;

  edittype.value = oldtype;
  editprice.value = oldprice;

  edittype.addEventListener('change', () => {
    item.innerText = `${edittype.value} - ${editprice.value}LE`;
  })

  editprice.addEventListener('change', () => {
    item.innerText = `${edittype.value} - ${editprice.value}LE`;
  })

  document.getElementById('showedit').style.display = "block";
}

function removeItem(butid,liid,upd){
  document.getElementById(butid).remove();
  document.getElementById(liid).remove();
  document.getElementById(upd).remove();
}

var newt = 1;
function donez(newid, list) {
    var price = document.getElementById('price');
    var typein = document.getElementById('addedtype');

    var newli;
    var updbut = document.createElement('button');
    updbut.setAttribute('type', "button");
    updbut.innerHTML = 'update';
    updbut.setAttribute('id', "updnewbut" + newt);
    updbut.addEventListener('click', () => {
        updateType(newli.id);

    })
    var rembut = document.createElement('button');
    rembut.setAttribute('type', "button");
    rembut.innerHTML = 'remove';
    rembut.setAttribute('id', "newbut" + newt);
    rembut.addEventListener('click', () => {
        document.getElementById('showprice').style.display = "none";

        document.getElementById('success').innerHTML = "";
        
        document.getElementById(newli.id).remove();
        document.getElementById(rembut.id).remove();
        document.getElementById(updbut.id).remove();
    })

    

    
    if (price.value !== "") {
        newli = document.createElement('li');
        newli.setAttribute('id', newid + newt);
        document.getElementById('errortype').innerHTML = "";
        document.getElementById('success').innerHTML = "saved successfully";
        newli.innerHTML = `${typein.value} - ${price.value}LE`;
        document.getElementById(list).appendChild(newli);
        document.getElementById(newli.id).parentNode.insertBefore(updbut, newli.nextSibling);
        document.getElementById(newli.id).parentNode.insertBefore(rembut, newli.nextSibling);
        

        price.value = "";
        typein.value = "";


        newt++;



        document.getElementById('showprice').style.display = "none";


        typein.addEventListener("keydown", () => {
            document.getElementById('success').innerHTML = "";
            document.getElementById('errortype').innerHTML = "";
        })
    }
    else {
        document.getElementById('errortype').innerHTML = "You must enter a price";
        document.getElementById('success').innerHTML = "";
    }

    

}

function updateDone(){
  document.getElementById('addtype').style.display="block";
  document.getElementById('errors').style.display="block";
  document.getElementById('showedit').style.display="none";
  document.getElementById('edittype').value = "";
  document.getElementById('editprice').value = "";
}


function addType() {
    var letters = /^[A-Za-z\s]*$/;
    
    if(document.getElementById('addedtype').value===""){
        document.getElementById('errortype').innerHTML = "You must enter a room type";
    }
    else if (!document.getElementById('addedtype').value.match(letters)) {
        document.getElementById('errortype').innerHTML = "Room Type not valid";
    }
    else{
        document.getElementById("showprice").style.display = "block";
    }
    

}




document.getElementById('form').addEventListener('submit', event => {
  var featlist = document.getElementById(`[id^="featli"]`);
  var feattext = documentgetElementById('finalfeats');

  var amenlist = document.getElementById(`[id^="amenli"]`);
  var amentext = document.getElementById('finalamens');

  var typelist = document.getElementById(`[id^="typeli"]`);
  var typetext = document.getElementById('finaltypes');
  var pricetext = document.getElementById('finalprices');

  var images = document.getElementById(`[id^="img"]`);
  var paths = document.getElementById('imgpaths');
  images.forEach((img)=>{
    paths.value += img.alt +',';
  })

  for (var i = 0; i < featlist.length; i++) {
    feattext.value += `${featlist[i].innerHTML},`;
  }

  for (var i = 0; i < amen.length; i++) {
    amentext.value += `${amenlist[i].innerHTML},`;
  }

  for (var i = 0; i < type.length; i++) {
    typetext.value += `${typelist[i].innerText.slice(0, item.innerText.indexOf('-') - 1)},`;
    pricetext.value += `${typelist[i].innerText.slice(item.innerText.indexOf('-') + 2, item.innerText.indexOf('L'))}`;
  }

  
})
