function hideItem(id){
    let item = document.getElementById(id);
    item.style.display="none";

    // var data=id
    // $.ajax({
    //         url: 'cart/removeBooking',
    //         method: 'POST',
    //         data:{sentId:data},
    //         success:function(response){
           
                
    //                 $("body").html(response);
                
    //         }
    // })
     
}

function clr(){
    let items=document.getElementsByClassName('items');
    for(let i=0;i<items.length;i++){
        items[i].style.display="none";
    }
    document.getElementsByClassName('clear')[0].style.display="none";
    document.getElementsByClassName('right')[0].style.display="none";
}