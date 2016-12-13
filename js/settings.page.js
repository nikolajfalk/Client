$(document).ready(function () {

    //Her kaldes funktionen, der skal give mig oplysningerne på den nuværende bruger ud fra den tildelte token.
    SDK.User.currentUser(function (err, data) {
        if (err) throw err;
        // her dekrypteres bruger objektet.
        var decrypted = encryptDecrypt(data);
        decrypted = JSON.parse(decrypted);
        //Her tilføjes informationerne på brugeren til en tabel, så bruger let kan se sine oplysninger, hvis man ønsker
        //at ændre dem.
        document.getElementById("updateFirstName").value = decrypted.firstName;
        document.getElementById("updateLastName").value = decrypted.lastName;
        document.getElementById("updateUserName").value = decrypted.userName;
        document.getElementById("updateEmail").value = decrypted.email;

        //Her kaldes en ny tabel, der er at finde i min modal. Tabellen åbnes når der klikkes på knappen "Opdater bruger"
        var $userTableBody = $("#userTableBody");
        //Igen tilføjes brugerens oplysninger, men denne gang i modal tabellen.
        $userTableBody.append(
            "<tr>" +
            "<td>" + decrypted.firstName + "</td>" +
            "<td>" + decrypted.lastName + "</td>" +
            "<td>" + decrypted.email + "</td>" +
            "<td>" + decrypted.userName + "</td>" +
            "</tr>");
    });
    //Her foretages ændringen. Funktionen tager de nye indtastede værdier i tabellen, og ændre brugeren, hvis det lykkedes
    //kommer der en alert med en bekræftelse. Brugerens nye opslysninger kan nu ses i den første tabel.
    $('#btnChangeUser').on('click', function () {
            var user = {
                firstName: $("#updateFirstName").val(),
                lastName: $("#updateLastName").val(),
                userName: $("#updateUserName").val(),
                email: $("#updateEmail").val(),
                password: $("#updatePassword").val()
            };
            SDK.User.edit(user, function () {
                alert("Brugeren blev ændret")
                window.location.href = "settings.html";
            })
        });
    //Slet bruger funktionen, der sletter den nuværende bruger ved klik på knappen "Slet bruger".
    //Inden brugeren slette kommer der bekræftelse. Slettes brugeren returneres man til startsiden.
    $("#btnDeleteUser").on("click", function (event) {
        event.preventDefault();

        var userDelete = window.confirm("Er du sikker på du vil slette din konto?");

        if (userDelete) {
            SDK.User.delete(function () {
                alert("Slettet");
                window.location.href = "index.html";
            });
        }
    });
});







