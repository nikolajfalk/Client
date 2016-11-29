$(document).ready(function () {

    $("#btnLogin").on("click", function (e) {
        e.preventDefault();

        var username = $("#inputUsername").val();
        var pw = $("#inputPassword").val();

        SDK.login(username, pw, function (err, data) {
            //On wrong credentials
            if (err) {
                alert("Forkert brugernavn eller adgangskode")
                return;
            }

            //Login OK!
            window.location.href = "frontPage.html";

        });
    });
});