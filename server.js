const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res) => {
	res.sendFile('casino.html', {root: __dirname});
})

io.on('connection', function(socket){
    // console.log("niakoi se svurza");
    socket.on("send message", (player_image, player_name, text) => {
        io.emit("delivery message", player_image, player_name, text);
    })
});

app.use(express.static(__dirname + "/public"));

http.listen(port, () => {
    console.clear();
    console.log(`Now listening on port ${port}`); 
});





//Online Games
Aviator();


function Aviator(){
    let curMultiplier = 1, endMultiplier = MultiplierCalculation();
    const interval_time = 100;
    io.emit("start");
    let interval = setInterval(() => {
        if(curMultiplier.toFixed(2) >= endMultiplier){
            io.emit("finish")
            setTimeout(Aviator, 5000);
            clearInterval(interval);
        }else{
            curMultiplier += 0.01;
            io.emit("update", curMultiplier);
        }
    }, interval_time);

    function MultiplierCalculation(){
        return (Math.random()*5).toFixed(2);;
    }
}
