$(document).ready(function () {

    $("#btnCreateUser").on("click", function () {

            var user = {
                firstName: $("#createFirstName").val(),
                lastName: $("#createLastName").val(),
                userName: $("#createUserName").val(),
                email: $("#createEmail").val(),
                password: $("#createPassword").val(),
                userType: true
            };

        SDK.User.create(user, function (err, data) {
            if (err){
                alert("Noget gik galt, prøv igen")
                return
            }
            alert("Bruger oprettet")
            window.location.href ="login.html"
        });
    })
});