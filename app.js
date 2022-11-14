const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
	res.sendFile('casino.html', {root: __dirname});
})

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});