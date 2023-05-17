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



function bookHotel(){
  let book = document.getElementById('booking');
  let ci = document.getElementById('checkIn');
  let co = document.getElementById('checkOut');
  let ad = document.getElementById('dropbtn1');
  let chi = document.getElementById('dropbtn2')
  let r = document.getElementById('dropbtn3');

  if(ci.value.length==0){
    document.getElementById('ci-error').innerHTML="Choose checkin date";
  }
  else{
    document.getElementById('ci-error').innerHTML="";
  }

  if(co.value.length==0){
    document.getElementById('co-error').innerHTML="Choose checkout date"
  }
  else{
    document.getElementById('co-error').innerHTML="";
  }

  if(ad.value.length==0){
    document.getElementById('ad-error').innerHTML="Enter Number of Adults";
  }
  else{
    document.getElementById('ad-error').innerHTML="";
  }

  if(chi.value.length==0){
    document.getElementById('chi-error').innerHTML="Enter Number of Children";
  }
  else{
    document.getElementById('chi-error').innerHTML="";
  }

  if(r.value.length==0){
    document.getElementById('r-error').innerHTML="Enter Number of Rooms";
  }
  else{
    document.getElementById('r-error').innerHTML="";
  }
}

function addReview()
{
  var review=document.getElementById('addrev').value;
  var rating=document.getElementById('dropbtn3').value;
  var hotelname=document.getElementById('hotelname').value;
  var obj={
    hotel:hotelname,
    review:review,
    rating:rating,
    Date:new Date()
  }

  fetch("http://localhost:8080/hotels",{
    method:"post",
    body:"obj",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(obj)
  })
}