
function reset()
{
      document.getElementById("ActName").value=null;
      document.getElementById("ActHeader").value=null;
     document.getElementById("ActType").value=null;
     document.getElementById("adv").value=null;
     document.getElementById("Actbrief").value=null;
     document.getElementById("Actdetails").value=null;
     document.getElementById("ActPlan").value=null;
     document.getElementById("ActCancel").value=null;
     document.getElementById("ActTime").value=null;
     document.getElementById("ActPickup").value=null;
     document.getElementById("ActPart").value=null;
     document.getElementById("starttime").value=null;
     document.getElementById("endtime").value=null;
     document.getElementById("price").value=null;
     document.getElementById("form-control date").value=null;
}

var newf = 1;

var ind = 0;
function addDate(date, finalres, newid, list, errorid) {
    var data = document.getElementById(date).value;
    var dt = document.getElementById(date);
    if (data !== "") {
        var newli = document.createElement('li');
        if (newid.includes('date')) {
            newli.setAttribute('id', newid + newf);
            newli.setAttribute('name', newid);
            newf++; 
        }
      

        newli.innerHTML = data;


        var rembut = document.createElement('button');
        rembut.setAttribute('type', "button");
        if (newid.includes('date')) {
            rembut.setAttribute('id', 'datebut' + newf);
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

        document.getElementById(errorid).innerHTML = "Please enter date";
    }
}


document.getElementById('form').addEventListener('submit', e => {
  var error = false;

  var datelist = document.querySelectorAll(`[id^="dateli"]`);
  var datetext = document.getElementById('Dates');

  if (datelist.length == 0) {
    error = true;
}
else {
    for (var i = 0; i < datelist.length; i++) {
        datetext.value += `${datelist[i].innerHTML},`;
    }
}
});