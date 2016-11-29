$(document).ready(function () {

    //Fires on page-load
    SDK.Curriculum.getCurriculum(function (err, data) {
        if (err) throw err;

        var decrypted = encryptDecrypt(data);
        decrypted = JSON.parse(decrypted);


        var $curriculumTableBody = $("#curriculumTableBody");
        decrypted.forEach(function (curriculum, i) {

            $curriculumTableBody.append(
                "<tr>" +
                "<td>" + curriculum.curriculumID + "</td>" +
                "<td>" + curriculum.school + "</td>" +
                "<td>" + curriculum.education + "</td>" +
                "<td>" + curriculum.semester + "</td>" +
                "</tr>");
        });
    });
});