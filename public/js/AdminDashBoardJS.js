let count1 = 0;
let count2 = 0;
let count3=0;
let dropdown = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
let dropdown3 = document.getElementById("dropdown3");
function drop(){
        if(count1 % 2 ==0){
            dropdown.style.display="block";
            count1++;
        }
        else{
            dropdown.style.display="none";
            count1++;
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
function drop3(){
    if(count3 % 2 == 0){
        dropdown3.style.display="block";
        count3++;
    }
    else{
        dropdown3.style.display="none";
        count3++;
    }

}