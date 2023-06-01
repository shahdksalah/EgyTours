
function updateDate(showdate, confirmdate) {
  document.getElementById(showdate).style.display = "block";
  document.getElementById(confirmdate).style.display = "block";

}
function confirmDate(currid, dateid, showdate) {
  document.getElementById(dateid).value = document.getElementById(showdate).value;
  document.getElementById(currid).style.display = "none";
  document.getElementById(showdate).style.display = "none";

}
function deleteDate(dateid) {
  document.getElementById(dateid).style.display = "none";
}

function replaceInfoImages(id, value, query) {
  document.getElementById(id).setAttribute('src', value);
}

function myFunction() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = document.getElementsByName('list');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
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

function Delete(id) {
  document.getElementById("deleteActivity").style.display = "block";
  document.getElementById('delbut').addEventListener('click', e=>{
    location.href='editactivities/delete/'+id;
  })
}

function cancel() {
  document.getElementById("deleteActivity").style.display = "none";
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

