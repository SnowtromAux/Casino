let socket = io();
let bet = [0.20, 0.20];
let betted = [false, false];
let game_phase, cur_coef = 1;
let round_played = [true, true];


socket.on("start", () => {
    game_phase = "start";
    for(i = 0;i < 2;i++)
        if(!betted[i])round_played[i] = true;
    
});

socket.on("update" ,(data) => {
    game_phase = "middle";
    document.getElementsByClassName("diagram")[0].innerHTML = "" + data.toFixed(2);
    cur_coef = data;
});

socket.on("finish", () => {
    game_phase = "finished";
    document.getElementsByClassName("bet_button")[0].style.backgroundColor = "green";
    document.getElementsByClassName("bet_button")[1].style.backgroundColor = "green";
    betted.fill(false);
    round_played.fill(false);
    addMultiplier(cur_coef);
    
    cur_coef = 1;
});

function addMultiplier(coef){
    
}

const textarea = document.getElementsByClassName("message")[0];
const live_chat = document.getElementsByClassName("live_chat")[0];

textarea.addEventListener("keydown", (event) => {
    if (event.keyCode === 13)sendMessage();
})

function sendMessage(){
    if(textarea.value == "")return;
    else {
        socket.emit("send message" , player.picture, player.username, textarea.value);
    }
    textarea.value = "";
}

socket.on("delivery message" , (player_image, player_name, text) => {
    // var element = document.getElementsByClassName("chat")[0];
    // console.log(element)
    // element.scrollBy(0 , element.scrollHeight);

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

const aviator_p_money = document.getElementsByClassName("aviator_game")[0].getElementsByClassName("money")[0];

function Bet_1(index){

}

function Bet_2(index){
    
}
function Bet_5(index){
    
}
function Bet_10(index){
    
}

function Bet(index){
    betted[index] = !betted[index];
    bet[index] = document.getElementsByClassName("bet_input")[index].value;
    if(bet[index] < 0.20){
        bet[index] = 0.20;
        DisplayErrorMsg("< 0.20");
    }

    if(bet[index] > 200){
        bet[index] = 200;
        DisplayErrorMsg("> 200")
    }


    if(betted[index]){
        player.money -= bet[index];
        document.getElementsByClassName("bet_button")[index].style.backgroundColor = "orange";
    }else{
        if(!round_played[index] && game_phase == "middle"){
            round_played[index] = true;
            player.money += +bet[index] * cur_coef;
        }else player.money += +bet[index];
        
        document.getElementsByClassName("bet_button")[index].style.backgroundColor = "green";
    }
    aviator_p_money.innerHTML = "" + player.money.toFixed(2);
    UpdatePlayerBet();
}

function DisplayErrorMsg(msg){
    //TODO 
    //Make error for too low bet 
    //Make error for too high bet 
}

function UpdatePlayerBet(){
    
}


