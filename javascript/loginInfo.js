$("#loginBtn").on("click", function () {
    // login stuff here
    var email = $("#userNameTerm").val().trim();
    var password = $("#passwordTerm").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.Message;
    });
    $("#userNameTerm").val("");
    $("#passwordTerm").val("");
    console.log("You are logged in");
});

$("#signUpBtn").on("click", function () {
    // login stuff here
    var email = $("#userNameTerm").val().trim();
    var password = $("#passwordTerm").val().trim();
    console.log(email + "  " + password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.Message;
    });
    $("#userNameTerm").val("");
    $("#passwordTerm").val("");
    console.log("You are signed up");
});

$("#signOutBtn").on("click", function () {
    firebase.auth().signOut();
    $("#usernameDisplay").html("Not Logged In");
});

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            $("#usernameDisplay").html(firebaseUser.email);
        } else {
            console.log("not logged in");
        }
    });
});
