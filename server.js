const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 4000;

app.get('/', (req, res) => {
	res.sendFile('casino.html', {root: __dirname});
})

io.on('connection', function(socket){
    console.log("niakoi se svurza");
  
});

app.use(express.static("public"));

http.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});