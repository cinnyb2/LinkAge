// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;

            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("Volunteer")
                    .doc(user.uid)
                    .set({
                        name: user.displayName,
                        email: user.email,
                    })
                    .then(function () {
                        window.location.assign("volunteerscreening.html");
                    })
                    .catch(function (error) {
                        console.log("errors is " + error);
                    });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "volunteer-waiting-room.html",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
};
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
