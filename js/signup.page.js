$(document).ready(function () {

    $("#btnCreateUser").on("click", function () {

        var user = {
            firstName: $("#createFirstName").val(),
            lastName: $("#createLastName").val(),
            userName: $("#createUserName").val(),
            email: $("#createEmail").val(),
            password: $("#createPassword").val()
        };

        SDK.User.create(user, function (err, data) {
            if (err);

        });
    })
});