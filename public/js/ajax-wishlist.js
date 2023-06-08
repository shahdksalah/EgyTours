$(document).on('click','#hotelwish', async function(){
    var HotelName = $(this).data('hotelid');
    $.ajax({
        url: '/hotels/add-to-wishlist',
        method: 'POST',
        data: { Name: HotelName},
        success: function (response) {
            var html = '';
            if(response==="okay"){
                $("#wishdot").css('display', "block");
                html +=("<i class='fa-solid fa-heart' style='color: #ff0000; font-size: 25px;'></i>");
                console.log(html);
                $("#hotelwish").html(html);
            }
        },
        error: function (err) {
            console.log("ajax:",err);
        }
    })
    
})

$(document).on('click','#actwish', async function(){
    var ActName = $(this).data('actid');
    $.ajax({
        url: '/activities/add/to/wishlist',
        method: 'POST',
        data: { Name: ActName},
        success: function (response) {
            var html = '';
            if(response==="okay"){
                $("#wishdot").css('display', "block");
                html +=("<i class='fa-solid fa-heart' style='color: #ff0000; font-size: 20px;'></i>");
                console.log(html);
                $("#actwish").html(html);
            }
        },
        error: function (err) {
            console.log("ajax:",err);
        }
    })
    
})