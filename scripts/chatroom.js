let username = "Anonymous";

if (localStorage.getItem("username") != null) {
    username = localStorage.getItem("username");
    if (username == "") {
        username = "Anonymous";
    }
}

function sendMessage() {
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document.getElementById("messages").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
    });

    // create db collection and send in the data
    rtdb.ref("messages/" + timestamp).set({
        username: username,
        message: message,
    });
}

const fetchChat = rtdb.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
        username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});

function quit() {
    localStorage.removeItem("roomNo");
    localStorage.removeItem("username");
    window.location.href = "./index.html";
}
