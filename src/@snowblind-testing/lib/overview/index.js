const socket = new WebSocket("ws://localhost:7071");
socket.onopen = function () {
    let arrMessages = [];
    // Send command to issue a readout on the client side
    socket.onmessage = function (evt) {
        console.log(evt);
    };
    socket.send(JSON.stringify({
        command: "GET_INFO",
    }));
};
