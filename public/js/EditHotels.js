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
  
  function updateDeleteButtons(index){
   let a;
   a=document.getElementById(index);
   a.getElementsByTagName("button")[0].style.display="flex";
   a.getElementsByTagName("button")[1].style.display="flex";
  }
  
  function exit(index){
      a=document.getElementById(index);
      a.getElementsByTagName("button")[0].style.display="none";
      a.getElementsByTagName("button")[1].style.display="none";
  }
  
  function bckText(id,txt){
    let text=document.createElement("p");
    let repNode=document.getElementById(id);
    text.innerHTML=(txt);
    text.setAttribute("id",id);
    repNode.replaceWith(text);
  }


function Update(index)
{
    document.getElementById("updateInfo").style.display="block";
}
function Delete(index)
{
    document.getElementById("c").style.display="block";
}
function del()
{
    document.getElementById("msg").style.display="block";
}
function cancel()
{
    document.getElementById("c").style.display="none";
}

function replaceInfo(id){
  let textBox=document.createElement("input");
    textBox.setAttribute("type","text");
    let repNode = document.getElementById(id);
    textBox.setAttribute("value",repNode.innerText);
    textBox.setAttribute("id",id);
    textBox.style.height='30px';
    textBox.style.width = '400px';
    repNode.replaceWith(textBox);
    textBox.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {  
        bckText(id,textBox.value);
      }
    });
}








function onUpdate(id,name,loc,about,pics,amens,feat,types){
    document.getElementById("updateInfo").style.display="none";
    document.getElementById("deleteHotel").style.display="none";
    document.getElementById("i1").innerHTML = name;
    document.getElementById("i2").innerHTML = loc;
    document.getElementById("i3").innerHTML = about;


    var images = document.getElementById('imagess');
    let paths =pics.split(",");
    var i = 1;
    paths.forEach((path)=>{
      var img = document.createElement('img');
      img.setAttribute('id','img' + i );
      img.setAttribute('height', 70);
      img.setAttribute('width', 100);
      img.setAttribute('src','images/Hotels/' + path);
      img.style.margin='5px';
      images.appendChild(img);
      i++;
    })
    i=1;

    var list = document.getElementById('i4');
    var propamens = amens.split(",");
    propamens.forEach((amen)=>{
      var li = document.createElement('li');
      if(amen.length!=0){
      li.setAttribute('id','amen'+i);
      li.innerHTML = amen;
      list.appendChild(li);
      }
    })

    var divv = document.getElementById('item2');
    var divv2 = document.getElementById('item');
    var divv3 = document.getElementById('item3');

    var but = document.createElement('button');
    but.innerHTML = "update";
    but.addEventListener('click', function handleClick(event) {
      replaceInfoFromAmenities('edit3',amens);
    });
    divv3.appendChild(but);

    i=1;

    var list2 = document.getElementById('i5');
    var propfeat = feat.split(",");
    propfeat.forEach((feat)=>{
      var li = document.createElement('li');
      if(feat.length!=0){
      li.innerHTML = feat;
      li.setAttribute('id','feat'+i);
      list2.appendChild(li);  
      }
    })

    var but = document.createElement('button');
    but.innerHTML = "update";
    but.addEventListener('click', function handleClick(event) {
      replaceInfoFromFeatures('edit2',feat);
    });
    divv2.appendChild(but);
    
    i=1;

    var list3 = document.getElementById('i6');
    var proptype = types.split(",");
    proptype.forEach((type)=>{
      var li = document.createElement('li');
      if(type.length!=0){
      li.innerHTML = type;
      li.setAttribute('id','type'+i);
      list3.appendChild(li);
      }
    })
    document.getElementById("updateInfo").style.display="block";

    var but = document.createElement('button');
    but.innerHTML = "update";
    but.addEventListener('click', function handleClick(event) {
      replaceInfoFromTypes('edit',types);
    });
    divv.appendChild(but);
}



function replaceInfoFromTypes(idform,items){
  var it = items.split(',');
  it.forEach((item)=>{
    if(item.length!=0){
      console.log(item.trim());
      if(document.getElementById('single').value===item.trim()){
        document.getElementById('single').setAttribute('checked',true);
      }
      else if(document.getElementById('double').value===item.trim()){
        document.getElementById('double').setAttribute('checked',true);
      }
      else if(document.getElementById('suite').value===item.trim()){
        document.getElementById('suite').setAttribute('checked',true);
      }
      else if(document.getElementById('premsuite').value===item.trim()){
        document.getElementById('premsuite').setAttribute('checked',true);
      }
}})
document.getElementById(idform).style.display='block';
}



function replaceInfoFromFeatures(idform,items){
  var it = items.split(',');
  it.forEach((item)=>{
    if(item.length!=0){
      console.log(item.trim());
      if(document.getElementById('blackcurtains').value===item.trim()){
        document.getElementById('blackcurtains').setAttribute('checked',true);
      }
      else if(document.getElementById('bath').value===item.trim()){
        document.getElementById('bath').setAttribute('checked',true);
      }
      else if(document.getElementById('minifridge').value===item.trim()){
        document.getElementById('minifridge').setAttribute('checked',true);
      }
      else if(document.getElementById('aircond').value===item.trim()){
        document.getElementById('aircond').setAttribute('checked',true);
      }
}})
document.getElementById(idform).style.display='block';
}


function replaceInfoFromAmenities(idform,items){
  var it = items.split(',');
  it.forEach((item)=>{
    if(item.length!=0){
      console.log(item.trim());
      if(document.getElementById('freewifi').value===item.trim()){
        document.getElementById('freewifi').setAttribute('checked',true);
      }
      else if(document.getElementById('spa').value===item.trim()){
        document.getElementById('spa').setAttribute('checked',true);
      }
      else if(document.getElementById('aquapark').value===item.trim()){
        document.getElementById('aquapark').setAttribute('checked',true);
      }
      else if(document.getElementById('greenspaces').value===item.trim()){
        document.getElementById('greenspaces').setAttribute('checked',true);
      }
      else if(document.getElementById('fitness').value===item.trim()){
        document.getElementById('fitness').setAttribute('checked',true);
      }
}})
document.getElementById(idform).style.display='block';
}
