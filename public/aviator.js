let socket = io();

socket.on("update" ,(data) => {
    console.log(data);
})

socket.on("finish", (data) => {
    console.log("------------------------------");
})