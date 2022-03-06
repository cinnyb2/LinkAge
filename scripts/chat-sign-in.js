if (
    localStorage.getItem("username") != null &&
    localStorage.getItem("roomNo") != null
) {
    window.location.href = "./chatroom.html";
}

function register() {
    var roomNo = document.getElementById("chatroom-number").value;
    var username = document.getElementById("chatroom-username").value;
    if (roomNo == "" || username == "") {
        console.log("Invalid.");
    } else {
        localStorage.setItem("roomNo", roomNo);
        localStorage.setItem("username", username);
    }
}
