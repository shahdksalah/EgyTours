function replaceInfoImages(id, value,inp) {
    document.getElementById(id).setAttribute('src', value);
    let del = "\\";
    var finalid = inp.split(del).slice(2);
    console.log(finalid);
    document.getElementById(id).setAttribute('alt', finalid);
  }
  
  function showInput(id, imgid) {
    var inp = document.getElementById(id);
    inp.hidden = false;
    inp.addEventListener('change', (event) => {
      var imgsrc = URL.createObjectURL(event.target.files[0]);
      replaceInfoImages(imgid, imgsrc,inp.value);
      var img = document.getElementById(imgid);
      img.style.border = 'solid 4px red';
      inp.hidden = true;
    })
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
  var editrooms = document.getElementById('editrooms');
  var editcaps = document.getElementById('editcaps');
  function updateType(idli) {
  
    document.getElementById('addtype').style.display="none";
    document.getElementById('errortype').style.display="none";
    document.getElementById('errorrooms').style.display="none";
    document.getElementById('errorcap').style.display="none";
    var item = document.getElementById(idli);
    var oldtype = `${item.innerText.slice(0, item.innerText.indexOf('-') - 1)}`
    var oldprice = `${item.innerText.slice(item.innerText.indexOf('-') + 2, item.innerText.indexOf('L'))}`;
    var oldroom = `${item.innerText.slice(item.innerText.indexOf('|') + 2, item.innerText.indexOf('R')-1)}`;
    var oldcap = `${item.innerText.slice(item.innerText.indexOf(':') + 2, item.innerText.length)}`;
  
    edittype.value = oldtype;
    editprice.value = oldprice;
    editrooms.value = oldroom;
    editcaps.value = oldcap;
  
  
    edittype.addEventListener('change', () => {
      item.innerText = `${edittype.value} - ${editprice.value}LE | ${editrooms.value} Rooms | Max. Capacity: ${editcaps.value}`;
    })
  
    editprice.addEventListener('change', () => {
      item.innerText = `${edittype.value} - ${editprice.value}LE | ${editrooms.value} Rooms | Max. Capacity: ${editcaps.value}`;
    })
  
    editrooms.addEventListener('change', () => {
      item.innerText = `${edittype.value} - ${editprice.value}LE | ${editrooms.value} Rooms | Max. Capacity: ${editcaps.value}`;
    })
    editcaps.addEventListener('change', () => {
      item.innerText = `${edittype.value} - ${editprice.value}LE | ${editrooms.value} Rooms | Max. Capacity: ${editcaps.value}`;
    })
  
    document.getElementById('showedit').style.display = "block";
  }
  
  function removeItem(liid,butid){
    document.getElementById(butid.id).remove();
    document.getElementById(liid).remove();
  }
  
  var newt = 1;
  function donez(newid, list) {
      var price = document.getElementById('price');
      var typein = document.getElementById('addedtype');
      var roomin = document.getElementById('rooms');
      var capin = document.getElementById('cap');
  
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
  
      
  
      
      if (price.value !== "" && capin.value!=="" && roomin.value!=="") {
          newli = document.createElement('li');
          newli.setAttribute('id', newid + newt);
          document.getElementById('errortype').innerHTML = "";
          document.getElementById('errorrooms').innerHTML = "";
          document.getElementById('errorcap').innerHTML = "";
          document.getElementById('errorprice').innerHTML = "";
          document.getElementById('success').innerHTML = "Saved successfully";
          newli.innerHTML = `${typein.value} - ${price.value}LE | ${roomin.value} Rooms | Max. Capacity: ${capin.value}`;
          document.getElementById(list).appendChild(newli);
          document.getElementById(newli.id).parentNode.insertBefore(updbut, newli.nextSibling);
          document.getElementById(newli.id).parentNode.insertBefore(rembut, newli.nextSibling);
          
  
          price.value = "";
          typein.value = "";
          roomin.value = "";
          capin.value = "";
  
  
          newt++;
  
  
  
          document.getElementById('showprice').style.display = "none";
  
  
          typein.addEventListener("keydown", () => {
              document.getElementById('success').innerHTML = "";
              document.getElementById('errortype').innerHTML = "";
              document.getElementById('errorrooms').innerHTML = "";
              document.getElementById('errorcap').innerHTML = "";
          })
      }
      else if(roomin.value===""){
        document.getElementById('errorrooms').innerHTML = "You must enter number of rooms";
      }
      else if(capin.value===""){
        document.getElementById('errorcaps').innerHTML = "You must enter maximum capacity";
      }
      else {
          document.getElementById('errorprice').innerHTML = "You must enter a price";
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
  
  
  document.getElementById('MYFORM').addEventListener('submit', event => {
    var featlist = document.querySelectorAll(`[id^="featli"]`);
    var feattext = document.getElementById('finalfeats');
  
    var amenlist = document.querySelectorAll(`[id^="amenli"]`);
    var amentext = document.getElementById('finalamens');
  
    var typelist = document.querySelectorAll(`[id^="typeli"]`);
    var typetext = document.getElementById('finaltypes');
    var pricetext = document.getElementById('finalprices');
    var roomtext = document.getElementById('finalrooms');
    var captext = document.getElementById('finalcaps');
  
   
    for (var i = 0; i < featlist.length; i++) {
      feattext.value += `${featlist[i].innerHTML},`;
    }
  
    for (var i = 0; i < amenlist.length; i++) {
      amentext.value += `${amenlist[i].innerHTML},`;
    }
  
    for (var i = 0; i < typelist.length; i++) {
      typetext.value += `${typelist[i].innerText.slice(0, typelist[i].innerText.indexOf('-') - 1)},`;
      pricetext.value += `${typelist[i].innerHTML.slice(typelist[i].innerText.indexOf('-') + 2, typelist[i].innerText.indexOf('L'))},`;
      roomtext.value += `${typelist[i].innerText.slice(typelist[i].innerText.indexOf('|') + 2, typelist[i].innerText.indexOf('R')-1)},`;
      captext.value += `${typelist[i].innerText.slice(typelist[i].innerText.indexOf(':') + 2, typelist[i].innerText.length)},`;
    }
  
    
    
  })
  