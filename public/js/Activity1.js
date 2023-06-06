


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
     var name2=document.getElementById("name").value;
     var num=document.getElementsByClassName("l")[0].value;
     var days=document.getElementsByClassName("l")[1].value;
     console.log(num);
     console.log(days);
  
    $.ajax({
        url: `${name2}/submit`,
        method: 'POST',
        data: { name2:name2,num:num,days:days},
        success: function (response) {
          console.log(response);
          if(response==="Available" && num!=0){
            $('#num1').html(num);
            var price=$('#price1').html();
            var sum=price*num;
            console.log(sum);
            $('total1').html(sum);
            $('#participants').val(num);
            $('#date').val(days);
            $('#total1').html(sum);
            $('#price').val(sum);
            $('#subForm').css("display","block");
          }
          if(response==="Not Available"){
          $('#avail').css("display","block");
          }
          if(response==="found" && num!=0){
            $('#num1').html(num);
            var price=$('#price1').html();
            var sum=price*num;
            console.log(sum);
            $('total1').html(sum);
            $('#participants').val(num);
            $('#date').val(days);
            $('#total1').html(sum);
            $('#price').val(sum);
            $('#m').css("display","block")
            $('#add'). css("display","none")
            $('#subForm').css("display","block");
          }

        },
        error: function (err) {

        }
    });
        


}
  

