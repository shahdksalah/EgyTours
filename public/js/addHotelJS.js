
var form = document.getElementById("hotel");
form.addEventListener('submit',Event=>{
    var amen = document.getElementsByName('amen')
    var textamen= document.getElementById('amenities')
    var rf = document.getElementsByName('feat');
    var textrf = document.getElementById('roomfeat');
    var rt = document.getElementsByName('type');
    var textrt = document.getElementById('roomtypes');
    
    for(var i=0; i<amen.length; i++){
        if(amen[i].checked)
            textamen.value += `${amen[i].value}, `;
            
    }

    for(var j=0; j<rf.length; j++){
        if(rf[j].checked)
            textrf.value += `${rf[j].value}, `;
            
    }

    for(var k=0; k<rt.length; k++){
        if(rt[k].checked)
            textrt.value += `${rt[k].value}, `;
            
    }
 })
         

