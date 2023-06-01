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
function Delete(id) {
  document.getElementById("deleteHotel").style.display = "block";
  document.getElementById('delbut').addEventListener('click', e=>{
    location.href='edithotels/delete/'+id;
  })
}
function del() {
  
  document.getElementById("msg").style.display = "block";
  
}
function cancel() {
  document.getElementById("deleteHotel").style.display = "none";
  
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























