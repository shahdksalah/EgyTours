


function validated(){
  let people = document.getElementById("dropbtn");
  let dat = document.getElementById("days");
  let valid = true;
  if(people.value==""){
    valid = false;
    document.getElementById("msg").innerHTML="Choose number: ";
  }
  else{
    document.getElementById("msg").innerHTML="";
  }
  if(dat.value==""){
    valid = false;
    document.getElementById("date-msg").innerHTML="Choose date";
  }
  else{
    document.getElementById("date-msg").innerHTML="";
  }
  return valid;

}

function isAvail(){
  $(document).ready(function () {
     var name2=document.getElementById("name").value;
     var num=document.getElementsByName("num").value;
     var days=document.getElementsByName("days").value;
    
        $.ajax({
            url: `/activities/${name2}/submit`,
            method: 'POST',
            data: { name2: name2, num: num,days:days},
            success: function (response) {
                   if(response==="Available" && num!=0){
                      $('#num1'),html(num);
                      var sum=$('#price1').html()*num;
                      $('total1').html(sum);
                      $('#participants').val(num);
                      $('#date').val(days);
                      $('#price').val(sum);
                      $('#subForm').css("display","block");
                   }

            },
            error: function (err) {

            }
        });
        
})

}
  

