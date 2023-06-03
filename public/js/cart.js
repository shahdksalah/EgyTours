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
                else if(response.split(' ')[0]=="success"){
                    
                    console.log(response.split(' ')[1])   
                    var t=$('#total').html();
                    console.log(total);
                    var t1=parseInt(t)-parseInt(response.split(' ')[1]);
                    var count=$('#cnt').html();
                    count--;
                    $('#cnt').html(count);
                    $('#total').html(t1);

                    
                }
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