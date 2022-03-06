var currentUser, username;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = db.collection("Volunteer").doc(user.uid);
        console.log("A volunteer is logged in.");

        currentUser
            .get()
            .then((doc) => {
                if (doc.exists) {
                    username = doc.data().name;
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }
});

function getRoom() {
    var session = db.collection("Session");
    var found = false;

    currentUser
        .get()
        .then((doc) => {
            if (doc.exists) {
                username = doc.data().name;
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        });

    session.get().then((snap) => {
        snap.forEach((doc) => {
            if (doc.exists) {
                var active = doc.data().active;

                if (active == "no" && !found) {
                    session.doc(doc.id).set({
                        active: "yes",
                        senior: "no",
                    });
                    found = true;
                    register(doc.id);
                }
            }
        });
    });

    if (!found) {
        db.collection("Session")
            .add({
                active: "yes",
                senior: "no",
            })
            .then((docRef) => {
                register(docRef.id);
            });
    }
}

function register(roomNo) {
    if (roomNo == "" || username == "") {
        console.log("Invalid.");
    } else {
        localStorage.setItem("roomNo", roomNo);
        localStorage.setItem("username", username);
        window.location.href = "./chatroom.html";
    }
}
