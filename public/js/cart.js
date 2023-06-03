function hideItem(id){
    let item = document.getElementById(id);
    item.style.display="none";

    var data=id
    $.ajax({
            url: 'cart/removeBooking',
            method: 'POST',
            data:{sentId:data},
            success:function(response){
                if(response=="empty"){
                    $('.r').css("display", "none");
                    $('#empty').css("display", "block");
                }
                // if(response=="success"){
                //     var total=0;
                //     var objects = $(".price");
                //     for (var obj of objects) {
                //         total+=obj.html().split(' ')[1];
                //     }
                //     $('#total').html('$ '+total );
                //     $('#cnt').html('Total ('+parseInt($('#cnt').html().split(' ')[1]-1)+'):')
                // }
            }
    })
     
}

function clr(){
    let items=document.getElementsByClassName('items');
    for(let i=0;i<items.length;i++){
        items[i].style.display="none";
    }
    document.getElementsByClassName('clear')[0].style.display="none";
    document.getElementsByClassName('right')[0].style.display="none";
}