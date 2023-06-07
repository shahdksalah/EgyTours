// function myFunction() {
//   // Declare variables
//   let input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("myUL");
//   li = document.getElementsByName("list");

//   // Loop through all list items, and hide those who don't match the search query
//   for (i = 0; i < li.length; i++) {
//     txtValue = li[i].textContent || li[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }

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

function Delete(id, pic) {
  document.getElementById("deleteCity").style.display = "block";
  document.getElementById("deletebut").addEventListener("click", (e) => {
    location.href = "editcities/delete/" + pic + "/" + id;
  });
}

function cancel() {
  document.getElementById("deleteCity").style.display = "none";
}
function onUpdate(id, name, picture, path) {
  document.getElementById("updateInfo").style.display = "none";
  document.getElementById("u1").value = name;
  document.getElementById("u2").setAttribute("src", picture);
  document.getElementById("img").setAttribute("name", path);
  document.getElementById("currid").value = id;
  document.getElementById("updateInfo").style.display = "block";
}

function save() {
  document.getElementById("updateInfo").style.display = "none";
  return true;
}
function replaceInfoImages(id, value, query) {
  document.getElementById(id).setAttribute("src", value);
}

function showInput(id, imgid) {
  var inp = document.getElementById(id);
  inp.hidden = false;
  inp.addEventListener("change", (event) => {
    var imgsrc = URL.createObjectURL(event.target.files[0]);
    replaceInfoImages(imgid, imgsrc);
    var img = document.getElementById(imgid);
    img.style.border = "solid 4px red";
    inp.hidden = true;
  });
}
