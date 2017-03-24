$("#loginBtn").on("click", function () {
    // login stuff here
    var email = $("#userNameTerm").val().trim();
    var password = $("#passwordTerm").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.Message;
        $("#userNameTerm").val(errorCode);
    });
    $("#userNameTerm").val("");
    $("#passwordTerm").val("");
});

$("#signUpBtn").on("click", function () {
    // login stuff here
    var email = $("#userNameTerm").val().trim();
    var password = $("#passwordTerm").val().trim();
    console.log(email + "  " + password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.Message;
        $("#userNameTerm").val(errorCode);
    });
    $("#userNameTerm").val("");
    $("#passwordTerm").val("");
});

$("#signOutBtn").on("click", function () {
    firebase.auth().signOut();
    $("#signOutBtn").addClass("hide");
    $("#usernameDisplay").html("");
});


$("#signUpLogInBtn").on("click", function(){
    $("#signInElements").removeClass("hide");
    $("#signUpLogInBtn").addClass("hide");
})

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log("logged in");
            // hide the forms and buttons
            $("#signInElements").addClass("hide");
            $("#signUpLogInBtn").addClass("hide");
            $("#usernameDisplay").html("You are logged in as " + firebaseUser.email);
            $("#signOutBtn").removeClass("hide");
        } else {
            console.log("not logged in");
            //show the forms to log in
            $("#signUpLogInBtn").removeClass("hide");
        }
    });
});

