//$(function(){
    $(`#inputTag`).onchange(function(event){
        console.log(event.target.files[0].name);
        //document.getElementById("chosenfiles").innerHTML=event.target.files[0].name;
       });
    //})
    
    function addItem(){
        document.getElementById("Items").innerHTML+=" menna";
    }

    var array 
    function addItem(input){
        var picked = document.getElementById(input);
        
    }

    function addval(input) {// if button is in form element
        let inputArray = [];
    
        let elements = input.value;
    
        elements = elements.trim(); // remove space from starting and end
        elements = elements.replace(/  +/g, ' '); // remove multiple spaces
        elements = elements.split(','); // split by space
    
        inputArray = elements;
    
        console.log(inputArray); // remove later
        return inputArray;
    }
    