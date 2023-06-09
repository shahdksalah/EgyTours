const socket=io();



const messageContainer = document.getElementById("message-container");

const nameInput = document.getElementById("name-input");

const messageForm = document.getElementById("message-form");

const messageInput = document.getElementById("message-input");

const senderId=document.getElementById("sender");

var type = document.getElementById("usertype");

var receiver_id;
var sender_id=document.getElementById("senderid").innerHTML;
var ur;

console.log(type.value);
console.log(sender_id);

if (type.value === "admin") {
    ur="chat/saveChat"
    receiver_id=document.getElementById("receiverid").innerText;
} else {
    ur="chat1/saveChat"
    receiver_id='64826bd80151e2560e7fa4f5';
}



messageForm.addEventListener("submit", (e) => {
console.log("submit")
e.preventDefault();

if (type.value === "admin") {
    ur="chat/save"
    receiver_id=document.getElementById("receiverid").innerText;
} else {
    ur="chat1/save"
    receiver_id='64826bd80151e2560e7fa4f5';
}

console.log(receiver_id);
sendMessage();
});

function sendMessage() {
if (messageInput.value === "") return;
console.log(messageInput.value);

console.log(sender_id);
console.log(receiver_id);


$.ajax({
    url: ur,
    method: "POST",
    data: {  
    sender_id: sender_id,
    receiver_id:receiver_id,
    message: messageInput.value},
    // dateTime: new Date(),  },

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
    error: function(xhr, status, err) {
        switch (status){
        case 'timeout': {}
        case 'parseerror': {}
        case 'abort': {}
        case 'error': {}
        default: {}
        }
      }

});

}

    //for receiving a message
    socket.on('loadNewChat', (data) => {
        console.log("received")

        if (type.value === "admin") {
            receiver_id=document.getElementById("receiverid").innerText;
        } else {
            receiver_id='64826bd80151e2560e7fa4f5';
        }


        if(sender_id==data.receiver_id && receiver_id==data.sender_id){
            console.log(data);
            addMessagetoUI(false, data);
        }
    });


function addMessagetoUI(isOwnMessage, data) {
var element = `
<li class="${
    isOwnMessage ? "message-right": "message-left"
    }" >
    <p class="message">
        ${data.message}
        <span>
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

