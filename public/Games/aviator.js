let socket = io();
socket.on("update" ,(data) => {
    // console.log(data.toFixed(2));
})

socket.on("finish", (data) => {
    // console.log("------------------------------");
})

const textarea = document.getElementsByClassName("message")[0];
const live_chat = document.getElementsByClassName("live_chat")[0];

textarea.addEventListener("keyup", (event) => {
    sendMessage();
})

function sendMessage(){
    if(textarea.value == "")return;
    else {
        socket.emit("send message" , player.picture, player.username, textarea.value);
        textarea.value = "";
    }
}

socket.on("delivery message" , (player_image, player_name, text) => {
    let messageBox = document.createElement("div");
    messageBox.className = "message_box";
    live_chat.append(messageBox)

    let header = document.createElement("div");
    header.className = "header";
    messageBox.append(header);

    let image = document.createElement("div");
    image.className = "image";
    header.append(image);

    let sender = document.createElement("div");
    sender.className = "sender";
    sender.innerHTML = player_name;
    header.append(sender);

    const msg_box = document.createElement("div");
    msg_box.className = "message";
    msg_box.innerHTML = text;
    messageBox.append(msg_box);
})