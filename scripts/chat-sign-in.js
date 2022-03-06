if (
    localStorage.getItem("username") != null &&
    localStorage.getItem("roomNo") != null
) {
    window.location.href = "./chatroom.html";
}

var roomNo = "";

var session = db.collection("Session");
var found = false;

session.get().then((snap) => {
    snap.forEach((doc) => {
        if (doc.exists) {
            var active = doc.data().senior;
            if (active == "no" && !found) {
                session.doc(doc.id).set({
                    active: "yes",
                    senior: "yes",
                });
                found = true;
                roomNo = doc.id;
                localStorage.setItem("roomNo", roomNo);
            }
        }
    });
});

function register() {
    var username = document.getElementById("name").value;

    if (username == "") {
        console.log("Invalid.");
    } else {
        localStorage.setItem("username", username);
    }
}
