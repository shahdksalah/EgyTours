const socket=io();



const messageContainer = document.getElementById("message-container");

const nameInput = document.getElementById("name-input");

const messageForm = document.getElementById("message-form");

const messageInput = document.getElementById("message-input");

const senderId=document.getElementById("sender");

var type = document.getElementById("usertype");

var receiver_id;
var sender_id=document.getElementById("senderid").innerHTML;
var url;

if (type.value === "admin") {
    url="chat/saveChat"
    receiver_id=document.getElementById("receiverid").innerHTML;
} else {
    url="chat1/saveChat"
    receiver_id='6473bed00f4f61858f1cc898';
}

messageForm.addEventListener("submit", (e) => {
console.log("submit")
e.preventDefault();
sendMessage();
});

function sendMessage() {
if (messageInput.value === "") return;
console.log(messageInput.value);
var name;


$.ajax({
    url: "chat1/saveChat",
    method: "POST",
    data: {  
    sender_id: sender_id,
    receiver_id:receiver_id,
    name:nameInput.innerHTML,
    message: messageInput.value,
    dateTime: new Date(),  },

    success: function (response) {
    if(response.success){
        console.log(response);
    
        socket.emit("newChat", response.data);
        addMessagetoUI(true, response.data);
        messageInput.value = "";
        
    }
    else{
        alert(response.msg)
    }
    },

});

}

    //for receiving a message
    socket.on('loadNewChat', (data) => {
        console.log()
        if(sender_id==data.receiver_id && receiver_id==data.sender_id){
            console.log(data);
            addMessagetoUI(false, data);
        }
    });



function addMessagetoUI(isOwnMessage, data) {
const element = `
                    <li class="${
                    isOwnMessage ? "message-right" : "message-left"
                    }">
                    <p class="message">
                        ${data.message}
                        <span>
                        ${data.name} ${moment(data.dateTime).fromNow()}
                        </span>
                    </p>
                    </li>
                `;
messageContainer.innerHTML += element;
scrollToBottom();
}

function scrollToBottom() {
messageContainer.scrollTo(0, messageContainer.scrollHeight);
}


function openChat(name,id){
    console.log(name);
    console.log(id);
     nameInput.innerHTML=name;
     document.getElementById("receiverid").innerHTML=id;
     document.getElementById("chat").style.display="block";
}
