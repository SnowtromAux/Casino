let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let columns = 11;
let in_game = false;
let bot_play = false;
const MONEY = 100000;
let monopoly = document.getElementsByClassName("monopoly")[0];
let balance = monopoly.getElementsByClassName("p_money")[0];
let jackpot_bot = 0;
let bot_completed = 0;

class Start{
    constructor(){
        this.type = "start";
        this.num = 0;
        this.x = 0;
        this.y = 0;
        this.color = "green";
        this.ind = 0;
        this.row = 0;
    }
    draw(){
        ctx.beginPath();
        // ctx.strokestyle = "green";
        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        ctx.fill();
    }
}

class Jackpot{
    constructor(win, goBy, direct){
        this.type = "jackpot";
        this.num = 0;
        this.x = 0;
        this.y = 0;
        this.color = "yellow";
        this.ind = 0;
        this.win = win;
        this.goBy = goBy;
        this.direct = direct;
        this.row = 0;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.font = "15px Arial";

        ctx.fillText(`${this.win}` , this.x - (ctx.measureText(`${this.win}`).width)/2, this.y + 5);
    }
}


class Win{
    constructor(win, goBy, direct){
        this.type = "win";
        this.num = 0;
        this.x = 0;
        this.y = 0;
        this.win = win;
        this.goBy = goBy;
        this.direct = direct;
        this.color = "blue";
        this.ind = 0;
        this.row = 0;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "15px Arial";

        if(this.win != 0)
            ctx.fillText(`${this.win}` , this.x - (ctx.measureText(`${this.win}`).width)/2, this.y + 5);
    }
}




class Bomb{
    constructor(){
        this.type = "bomb";
        this.num = 0;
        this.x = 0;
        this.y = 0;
        this.color = "black";
        this.ind = 0;
        this.row = 0;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, 25, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.x + 20, this.y + 20);
        ctx.lineTo(this.x - 20, this.y - 20);

        ctx.moveTo(this.x - 20, this.y + 20);
        ctx.lineTo(this.x + 20, this.y - 20);
        ctx.stroke(); 
    }
}

class Choveche{
    constructor(){
        this.curField = 1;
        this.x = 0;
        this.y = 0;
        this.balance = MONEY;
        this.bet = 1;
        this.winned = 0;
        this.direct = 0;
    }
}

let fields = [
    //--------------- Level 1 ------------------------
    new Start(),
    new Bomb(),
    new Win(0.5, 0, 0),
    new Win(1.2, 0, 0),
    new Bomb(),
    new Win(1.7, 0, 0),
    new Win(2.3, 0, 0),
    new Win(3.5, 0, 0),
    new Bomb(),
    new Win(5.4, 0, 0),
    new Bomb(),
    new Win(0, -4, 1.2),
    new Win(5.9, 0, 0),
    new Win(10.7, 0, 0),
    new Bomb(),
    new Win(16.8, 0, 0),
    new Bomb(),
    new Bomb(),
    new Win(0, -5, 2.9),
    new Win(39.5, 0, 0),
    new Bomb(),
    new Win(0, -2, 13.9),
    new Win(0, -3, 49.8),
    new Bomb(),
    new Bomb(),
    new Win(0, 1, 50),
    //--------------- Level 2 -----------------------
    new Win(50, 0, 0),
    new Bomb(),
    new Win(57.5, 0, 0),
    new Win(66, 0, 0),
    new Win(76, 0, 0),
    new Bomb(),
    new Win(106.2, 0, 0),
    new Bomb(),
    new Win(0, -6, 45),
    new Win(117, 0, 0),
    new Win(136, 0, 0),
    new Bomb(),
    new Win(0, -6, 181.2),
    new Win(0, -3, 50),
    new Bomb(),
    new Win(0, -11, 22.3),
    new Jackpot(250, 0, 0)
]

let chv = new Choveche();
balance.innerHTML = `Balance: ${MONEY}`;
function monopoly_game(){
    redraw();
}

function draw(){
    let movingR = true;

    for(let i = 0;i < fields.length;i++){
        if(movingR)
            fields[i].x = 100 + (100 * (i % columns)) % (100 * (columns));
        else
            fields[i].x = 100 + (100 * (columns - i % columns - 1)) % (100 * (columns));
        

        fields[i].y = 100 * Math.floor(((100 * i) / (100 * (columns)) + 1));
        fields[i].row = Math.floor(((100 * i) / (100 * (columns)) + 1));
        
        if(i % columns == columns - 1 && i != 0)movingR = !movingR;
        
        fields[i].num = i + 1;

        ctx.beginPath();
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 5;

        if(i == fields.length - 1)break;

        if(fields[i].num % 11 == 0){
            ctx.moveTo(fields[i].x, fields[i].y + 25);
            ctx.lineTo(fields[i].x, fields[i].y + 75);
            ctx.stroke();
        }else if(movingR){
            ctx.moveTo(fields[i].x + 25, fields[i].y);
            ctx.lineTo(fields[i].x + 75, fields[i].y);
            ctx.stroke();
        }else if(!movingR){
            ctx.moveTo(fields[i].x - 25, fields[i].y);
            ctx.lineTo(fields[i].x - 75, fields[i].y);
            ctx.stroke();
        }
    }

    for(let i = 0;i < fields.length;i++){
        if(fields[i].type == "win" && fields[i].goBy != 0){
            for(let j = 0;j < fields.length;j++){
                if(fields[j].num == fields[i].num + fields[i].goBy){
                    if(fields[i].row == fields[j].row)
                        drawCurvedArrow(i, j);
                    else
                        drawArrow(i, j);
                }
            }
        }
    }

    for(let i = 0; i< fields.length;i++){
        fields[i].draw();

        if(fields[i].num == chv.curField){
            // if(in_game){
            //     ctx.fillStyle = "yellow";
            //     ctx.arc(fields[i].x, fields[i].y, 30, 0, 2 * Math.PI);
            //     ctx.fill();
            // }
            ctx.fillStyle = "purple";
            ctx.fillRect(fields[i].x - 10, fields[i].y - 10, 20, 20);        
        }
    }
}


function drawCurvedArrow(from, to) {

    startX = fields[from].x;
    startY = fields[from].y - 25;

    endX = fields[to].x;
    endY = fields[to].y - 25;

    controlOffset = 50;

    var cp1X = startX + (endX - startX) / 3;
    var cp1Y = startY + (endY - startY) / 3 - controlOffset;
    var cp2X = startX + (endX - startX) * 2 / 3;
    var cp2Y = startY + (endY - startY) * 2 / 3 - controlOffset;
  

    ctx.beginPath();
    ctx.fillStyle = "limegreen";
    ctx.strokeStyle = "limegreen";
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
    ctx.stroke();

  
    ctx.beginPath();
    var arrowSize = 10;
    var angle = Math.atan2(endY - cp2Y, endX - cp2X);
    ctx.translate(endX, endY);
    ctx.rotate(angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize);
    ctx.lineTo(-arrowSize, -arrowSize);
    ctx.lineTo(0, 0);
    ctx.fill();

  
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillText(fields[from].direct , fields[from].x - 30, fields[from].y - 40);
}

function drawArrow(from, to){
    
    startX = fields[from].x;
    endX = fields[to].x;

    if(fields[from].row > fields[to].row){
        startY = fields[from].y - 25;
        endY = fields[to].y + 25;
    }else{
        startY = fields[from].y + 25;
        endY = fields[to].y - 25; 
    }


    ctx.beginPath();
    ctx.fillStyle = "limegreen";
    ctx.strokeStyle = "limegreen";
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    

    var arrowSize = 10;
    var angle = Math.atan2(endY - startY, endX - startX);
    ctx.translate(endX, endY);
    ctx.rotate(angle - Math.PI / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrowSize, arrowSize);
    ctx.lineTo(arrowSize, arrowSize);
    ctx.lineTo(0, 0);
    ctx.fill();
    

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if(fields[from].x < fields[to].x)
        ctx.fillText(fields[from].direct , fields[from].x - 35, fields[from].y - 30);
    else
        ctx.fillText(fields[from].direct , fields[from].x + 10, fields[from].y - 30);

}

// let dices = [6, 6, 6, 2, 6, 6, 6], mlp = 0;

let dice = 0;
let diceLabel = monopoly.getElementsByClassName("dice")[0];
let winned = monopoly.getElementsByClassName("p_win")[0];
let turnes = monopoly.getElementsByClassName("turns")[0];
let checkbox = monopoly.getElementsByClassName("checkbox")[0];

let ed = 0, dv = 0, tr = 0, ch = 0, pe = 0, sh = 0;
function rollDice(roller){
    let gotbomb = false;
    if(!in_game)turnes.innerHTML = '';

    if(roller == "player" && bot_play)return;

    in_game = true;
    chv.balance -= chv.bet;
    balance.innerHTML = `Balance: ${chv.balance.toFixed(1)}`;

    dice = Math.floor(Math.random() * 6) + 1;
    // if(dice == 1)ed++;
    // if(dice == 2)dv++;
    // if(dice == 3)tr++;
    // if(dice == 4)ch++;
    // if(dice == 5)pe++;
    // if(dice == 6)sh++;
    // console.log(ed + " | " + dv + " | " + tr + " | " + ch + " | " + pe + " | " + sh)

    // dice = dices[mlp];
    // mlp++;
    diceLabel.innerHTML = "You roled: " + dice;
  
    // if(chv.curField + dice > fields.length)return;
  
    chv.curField += dice;

    for(let i = 0;i < fields.length;i++){
        if(fields[i].num == chv.curField){
            if(fields[i].type == "bomb"){
                console.log("on_bomb")
                bot_completed = 0;
                gotbomb = true;
                in_game = false;
                
                if(checkbox.checked)
                    bot_play = false;
                
                chv.curField = 1;
                chv.winned = 0;
            }else if(fields[i].type == "win"){
                chv.curField += fields[i].goBy;
                chv.balance += fields[i].direct * chv.bet;
                chv.winned = fields[i].win * chv.bet;
            }else if(fields[i].type == "jackpot"){
                bot_completed = 0;
                chv.winned = fields[i].win * chv.bet;
                chv.balance += chv.winned;
                chv.curField = 1;
                chv.winned = 0;
                in_game = false;

                if(bot_play){
                    jackpot_bot++;
                    monopoly.getElementsByClassName("jackpots")[0].innerHTML = `Bot Jackpots: ${jackpot_bot}`;
                }

                if(checkbox.checked)
                    bot_play = false;
            }
            break;
        }
    }
    balance.innerHTML = `Balance: ${chv.balance.toFixed(1)}`;
    winned.innerHTML = `Win: ${chv.winned.toFixed(1)}`;

    // let label = document.createElement("label");
    // label.innerHTML = `R: ${dice} | F: ${chv.curField} | W: ${chv.winned} | D: ${fields[i].direct}`;
    // turnes.appendChild(label);

    let label1 = document.createElement("label");
    label1.innerHTML = `Rolled: ${dice}`;
    turnes.appendChild(label1);

    let label2 = document.createElement("label");
    label2.innerHTML = `Field: ${chv.curField}`;
    turnes.appendChild(label2);
    
    let label3 = document.createElement("label");
    label3.innerHTML = `Win: ${chv.winned}`;
    turnes.appendChild(label3);
    
    let label4 = document.createElement("label");
    label4.innerHTML = `Direct: ${fields[i].direct}`;
    turnes.appendChild(label4);

    let label5 = document.createElement("label");
    label5.innerHTML = `-----------------------------`;
    turnes.appendChild(label5);

    if(gotbomb){
        let label6 = document.createElement("label");
        label6.innerHTML = `End Game`;
        label6.style.marginLeft = "50px";
        turnes.appendChild(label6);
    }
}

function cashOut(){
    chv.balance += chv.winned;
    chv.winned = 0;
    chv.curField = 1;

    balance.innerHTML = `Balance: ${chv.balance.toFixed(1)}`;
    winned.innerHTML = `Win: ${chv.winned.toFixed(1)}`;

    in_game = false;
}

let start_bot_btn = monopoly.getElementsByClassName("bot_play")[0];
let bot_turns_num = monopoly.getElementsByClassName("bot_turns_num")[0];
let bot_speed = monopoly.getElementsByClassName("bot_speed")[0];
let turns_left = monopoly.getElementsByClassName("turns_left")[0];
let bot_collects_on = monopoly.getElementsByClassName("bot_collects_num")[0];
function botPlay(){
    bot_play = !bot_play;
    if(bot_play)
        start_bot_btn.innerHTML = "Stop bot";
    else
        start_bot_btn.innerHTML = "Start bot";
    
    let turns = bot_turns_num.value;
    let speed = bot_speed.value;
    let collect_on = bot_collects_on.value;
    let bot_played_turns = 0;
    

    let myInterval = setInterval(() => {
        if(bot_played_turns == turns || !bot_play){
            bot_play = false;
            turns_left.innerHTML = `Turns Left: 0`;
            clearInterval(myInterval);
            cashOut();
            start_bot_btn.innerHTML = "Start bot";
        }
        else
        {
            bot_played_turns++;
            bot_completed++;
            turns_left.innerHTML = `Turns Left: ${turns - bot_played_turns}`;
            console.log("turn " + bot_completed);
            rollDice("bot");
            if(bot_completed == collect_on){
                bot_completed = 0;
                console.log("cashout")
                cashOut();
            }
        }
    }, 1000 / speed);

}

function redraw(){
    ctx.clearRect(0, 0, c.width, c.height);
   
    draw();
    // update();

    requestAnimationFrame(redraw);
}

let betz = [1, 5, 10, 20, 50];

function Bet(ind){
    if(in_game)return;
    chv.bet = betz[ind];
    let bets = monopoly.getElementsByClassName("bet");
    for(let i = 0;i < bets.length;i++){
        if(i != ind)bets[i].style.border = "1px solid black";
        else bets[i].style.border = "2px solid green";
    }
}