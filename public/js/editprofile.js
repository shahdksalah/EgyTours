
function editProf(){
    var doc = document.getElementById("editForm");
    doc.style.display='block';
    var rem = document.getElementById("details");
    rem.style.display="none";
    var b = document.getElementById("button");
    b.style.display="none";
    var bu = document.getElementById("saveButtons");
    bu.style.display="block";
    
}

function cancel(){
    var doc = document.getElementById("editForm");
    var bu = document.getElementById("saveButtons");
    var det = document.getElementById("details");
    var b = document.getElementById("button");
    det.style.display="block";
    b.style.display="block";
    doc.style.display='none';
    bu.style.display="none";
}




