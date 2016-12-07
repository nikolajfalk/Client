$(document).ready(function () {

    //Fires on page-load
    SDK.User.currentUser(function (err, data) {
        if (err) throw err;

        var decrypted = encryptDecrypt(data);
        decrypted = JSON.parse(decrypted);

        document.getElementById("updateFirstName").value = decrypted.firstName;
        document.getElementById("updateLastName").value = decrypted.lastName;
        document.getElementById("updateUserName").value = decrypted.userName;
        document.getElementById("updateEmail").value = decrypted.email;


        var $userTableBody = $("#userTableBody");

        $userTableBody.append(
            "<tr>" +
            "<td>" + decrypted.firstName + "</td>" +
            "<td>" + decrypted.lastName + "</td>" +
            "<td>" + decrypted.email + "</td>" +
            "<td>" + decrypted.userName + "</td>" +
            "</tr>");


        $('#btnChangeUser').on('click', function () {

            decrypted = {
                firstName: $('#updateFirstName').val(),
                lastName: $('#updateLastName').val(),
                userName: $('#updateUserName').val(),
                email: $('#updateEmail').val(),
                password: $('#updatePassword').val(),
            };


            SDK.User.edit(decrypted, function (err, data) {

                alert("Brugeren blev ændret")
            })
        });
    })
});




