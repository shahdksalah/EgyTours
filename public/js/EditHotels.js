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
  textBox.setAttribute('name', id );
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

function showInput(id,imgid){
  var inp = document.getElementById(id);
  inp.hidden=false;
  inp.addEventListener('change',(event)=>{
    var imgsrc = URL.createObjectURL(event.target.files[0]);
    replaceInfoImages(imgid, imgsrc);
    var img = document.getElementById(imgid);
    img.style.border = 'solid 4px red';
    inp.hidden=true;
  })
}

function displayOptions(query,options,id,delid,delbut){
  var checks = document.querySelectorAll(`[id^=${query}]`);
  var ops = options.split(',');
  checks.forEach((check)=>{
    ops.forEach((op)=>{
      if(check.value==op.trim()){
        check.checked=true;
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
function addItem(item,finalres,newid,list,errorid){
  var data = document.getElementById(item).value;
  var it = document.getElementById(item);
  if(data!==""){
    document.getElementById(finalres).value +=  + ',';

  var newli = document.createElement('li');
  if(newid.includes('type')){
    newli.setAttribute('id',newid+newt);
    newt++;
  }
  else if(newid.includes('feat')){
    newli.setAttribute('id',newid+newf);
    newf++;
  }
  else{
    newli.setAttribute('id',newid+newa);
    newa++;
  }
  
  newli.innerHTML = data;
  

  var rembut = document.createElement('button');
  rembut.setAttribute('type',"button");
  rembut.innerHTML = 'remove';
  rembut.addEventListener('click',event=>{
    removeItem(newli.id,this);
  })

  document.getElementById(list).appendChild(newli);
  document.getElementById(newli.id).parentNode.insertBefore(rembut,document.getElementById(newli.id).nextSibling);
  it.value="";
  document.getElementById(errorid).innerHTML="";
  }
  else{
    document.getElementById(errorid).innerHTML = "Please enter information";
  }
  
}

function removeItem(item, mybut){
  document.getElementById(item).remove();
  var button = mybut;
  button.remove();
}


document.getElementById('form').addEventListener('submit',event=>{
  var featlist = document.getElementById(`[id^="featli"]`);
  var feattext = documentgetElementById('finalfeats');

  var amenlist = document.getElementById(`[id^="amenli"]`);
  var amentext = document.getElementById('finalamens');

  var typelist = document.getElementById(`[id^="typei"]`);
  var typetext = document.getElementById('finaltypes');
  
  for(var i=0; i<featlist.length; i++){
    feattext.value += `${featlist[i].innerHTML},`;
  } 

  for(var i=0; i<amen.length; i++){
    amentext.value += `${amenlist[i].innerHTML},`;
  }

  for(var i=0; i<type.length; i++){
    typetext.value += `${type[i].innerHTML},`;
  }
})
