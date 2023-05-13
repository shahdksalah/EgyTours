let c1 = 0;
let count2 = 0;
let dropdown = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
function drop(){
        if(c1 % 2 ==0){
            dropdown.style.display="block";
            c1++;
        }
        else{
            dropdown.style.display="none";
            c1++;
        }
   
    
}
function drop2(){
        if(count2 % 2 == 0){
            dropdown2.style.display="block";
            count2++;
        }
        else{
            dropdown2.style.display="none";
            count2++;
        }
   
}