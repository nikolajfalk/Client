$(document).ready(function () {
    //Denne funktion opretter en ny bruger. Først tages værdierne, som er indtastet i felterne.
    $("#btnCreateUser").on("click", function () {
            var user = {
                firstName: $("#createFirstName").val(),
                lastName: $("#createLastName").val(),
                userName: $("#createUserName").val(),
                email: $("#createEmail").val(),
                password: $("#createPassword").val(),
                userType: true
            };
        //Denne if sørger for at alle felterne er udfyldt.
        if(user.firstName ==="" || user.lastName ===""||user.userName ==="" || user.email ==="" || user.password ==="") {
            alert("Noget gik galt, prøv igen")
            return
        }
        //Til sidst køres opret bruger metoden og oprettelsen bekræftes med en alert, og et sideskift til login siden.
        SDK.User.create(user, function (err, data) {
             alert("Bruger oprettet")
             window.location.href = "index.html"
         });
    })
});