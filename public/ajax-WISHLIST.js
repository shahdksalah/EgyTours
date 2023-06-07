$(document).on('click','.fa-regular fa-heart', async function(){
    var hotelID = $(this).data('hotelid');
    document.getElementById('icon-'+hotelID).setAttribute('class',"fa-solid fa-heart");

    fetch('/add-to-wishlist',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({hotelID}),
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log("ajax:",response);
        }
    })
    
})