$(document).ready(function () {
    //Denne metode gør det muligt at logge ind.
    $("#btnLogin").on("click", function (e) {
        e.preventDefault();
        //Her tages det indtastede brugernavn og password.
        var username = $("#inputUsername").val();
        var pw = $("#inputPassword").val();
        //Metoden køres - stemmer brugernavn og password overens med databasen logges derind ellers kaldes en error.
        SDK.login(username, pw, function (err, data) {
            //On wrong credentials
            if (err) {
                alert("Forkert brugernavn eller adgangskode")
                return;
            }
            //Hvis login lykkedes skiftes siden til forsiden i applikationen.
            window.location.href = "frontPage.html";

        });
    });
});