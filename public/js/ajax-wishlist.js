$(document).on('click','.fa-regular fa-heart', async function(){
    var hotelID = $(this).data('hotelid');
    console.log(hotelID);
    document.getElementById('icon-'+hotelID).setAttribute('class',"fa-solid fa-heart");

    $.ajax({
        url: '/add-to-wishlist',
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({hotelID}),
        success: function (response) {
            console.log(response);
        },
        error: function (err) {
            console.log("ajax:",response);
        }
    })
    
})