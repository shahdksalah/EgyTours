
var form=document.getElementById("form");
form.addEventListener('submit',Event=>{

        var selected=new Array();
        var hotels=document.getElementsByName("hot");
        for(var i=0;i<hotels.length;i++)
        {
            if(hotels[i].checked){
                selected.push(hotels[i].value);
            }
        }
        document.getElementById("selectedHotels").innerText=selected;
    
    
});
