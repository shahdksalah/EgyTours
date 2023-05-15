let count=0;
let clone;
let textfield = document.getElementById('msg');
        
function sendMsg(){
    const d = new Date();
    let text = document.getElementById('msg').value;
    textfield.value="";
    if(count%2==0){
        clone=duplicate('left-message', count);
        clone.querySelector('.textmsg').innerHTML = text;
        clone.style.display="flex";
        count++;
    }
    else{
        clone=duplicate('right-message',count);
        clone.querySelector('.textmsg').innerHTML = text;
        clone.style.display="flex";
        count++;
    }
        
}


function duplicate(id, i) {
    let original = document.getElementById(id);
    let clone = original.cloneNode(true); // "deep" clone
    clone.id = "msg" + ++i;
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.appendChild(clone);
    return clone;
        }

let c = 0;
function viewChat(id){
    let chat = document.getElementById(id);
    if(c%2==0){
        chat.classList.add('popup');
        chat.style.display='block';
        c++;
    }
    else{
        chat.classList.remove('popup');
        chat.style.display='none';
        c++;
    }
}

