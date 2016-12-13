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
        if(user.firstName ==="" || user.lastName ===""||user.userName ==="" || user.email ==="" || user.password ==="") {
            alert("Noget gik galt, prøv igen")
            return
        }
        SDK.User.create(user, function (err, data) {
             alert("Bruger oprettet")
             window.location.href = "index.html"
         });
    })
});