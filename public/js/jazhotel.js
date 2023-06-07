let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

if(typeof documents!=='undefined'){
var bookingForm=documents.getElementById("bForm");

bookingForm.addEventListener('submit',Event=>{
  let book = document.getElementById('booking');
  let ci = document.getElementById('checkIn');
  let co = document.getElementById('checkOut');
  let ad = document.getElementById('dropbtn1');
  let chi = document.getElementById('dropbtn2')
  let r = document.getElementById('dropbtn3');
  let t = document.getElementById('dropbtn4');

  if(ci.value.length==0){
    document.getElementById('ci-error').innerHTML="Choose Checkin Date";
  }
  else{
    document.getElementById('ci-error').innerHTML="";
  }

  if(co.value.length==0){
    document.getElementById('co-error').innerHTML="Choose Checkout Date"
  }
  else{
    document.getElementById('co-error').innerHTML="";
  }

  if(ad.value.length==0){
    document.getElementById('ad-error').innerHTML="Choose Number of Adults";
  }
  else{
    document.getElementById('ad-error').innerHTML="";
  }

  if(chi.value.length==0){
    document.getElementById('chi-error').innerHTML="Choose Number of Children";
  }
  else{
    document.getElementById('chi-error').innerHTML="";
  }

  if(r.value.length==0){
    document.getElementById('r-error').innerHTML="Choose Number of Rooms";
  }
  else{
    document.getElementById('r-error').innerHTML="";
  }

  if(t.value.length==0){
    document.getElementById('t-error').innerHTML="Choose Room Type";
  }
  else{
    document.getElementById('t-error').innerHTML="";
  }
})
}


function isAvail(){
  var checkIn=document.getElementById("checkIn").value;
  var checkOut=document.getElementById("checkOut").value;
  var adults=document.getElementById("dropbtn1").value;
  var children=document.getElementById("dropbtn2").value;
  var rooms=document.getElementById("dropbtn3").value;
  var roomType=document.getElementById("dropbtn4").value;
  var name=document.getElementById("name").innerHTML;

  document.getElementById("notavail").style.display="none";
  document.getElementById("subForm").style.display="none";
  document.getElementById("t-error").innerHTML=""

  if(checkIn=="" || checkOut=="" || adults=="" || children=="" || rooms=="" || roomType=="" || name==""){
     document.getElementById("t-error").innerHTML="All fields required"
  }
    
  $.ajax({
      url: `${name}/submit`,
      method: 'POST',
      data: { name:name,adults:adults,children:children,rooms:rooms,roomType:roomType,name:name},
      success: function (response) {
        console.log(response.msg);
            if(response.msg==="Available"){
                $('#checkin').val(checkIn);
                $('#checkout').val(checkOut);
                $('#ad').val(adults);
                $('#ch').val(children);
                $('#ro').val(rooms);
                $('#rt').val(roomType);
                $('#subForm').css("display","block");
            }
            else if(response.msg==="Not Available"){
              if(response.unavail="people"){
                $('#t-error').html(`This room type takes maximum ${response.adults} adult(s) and ${response.children} child(ren)`)
              }
              else if(response.unavail="rooms"){
                $('#t-error').html('Rooms of this type are fully booked');
              }
              $('#t-error').css("display","block")
              $('#notavail').css("display","block");
            }
            else if(response.msg==="found"){
              $('#m').css("display","block")
              $('#add'). css("display","none")
              $('#subForm').css("display","block");
            }

      },
      error: function (err) {

      }
  });
     


}
