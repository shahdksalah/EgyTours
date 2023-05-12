let k=0;
let array=[];

  function addDate()
  {
    var input=document.getElementById("date").value;
    array[k]=input;
    document.getElementById("date").value="";
    k++;
  }