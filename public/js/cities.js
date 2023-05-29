var form=document.getElementById("form");

form.addEventListener('submit',Event=>{

        var selected=new Array();
        var selected1=new Array();
        var hotels=document.getElementsByName("hot");
        var activities1=document.getElementsByName("act");

        for(var i=0;i<hotels.length;i++)
        {
            if(hotels[i].checked){
                selected.push(hotels[i].value);
            }
        }
        document.getElementById("selectedHotels").innerText=selected;




        for(var j=0;j<activities1.length;j++)
        {
            if(activities1[j].checked){
                selected1.push(activities1[j].value);
            }
        }
        document.getElementById("selectedActivities").innerText=selected1;
    
});

