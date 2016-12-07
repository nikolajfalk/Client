$(document).ready(function () {

    //Fires on page-load
    SDK.Curriculum.getCurriculum(function (err, data) {
        if (err) {
            return
        }

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
                "<td><button id='showCBbtn' class='showBooksButton' data-curriculumId=" + curriculum.curriculumID + "> Vis</button></td>" +
                "</tr>");
        });

        $(".showBooksButton").on("click", function () {
            var $button = $(this);
            var id = $button.data("curriculumid");
            $("#showBooksModal").modal();

            SDK.Curriculum.getCurriculumBook(id, function (err, data) {
                if (err) throw err;

                var decrypted = encryptDecrypt(data);
                decrypted = JSON.parse(decrypted);

                var $CurriculumBookTableBody = $("#CurriculumBookTableBody");
                decrypted.forEach(function (book, i) {

                    $CurriculumBookTableBody.append(
                        "<tr>" +
                        "<td>" + book.title + "</td>" +
                        "<td>" + book.author + "</td>" +
                        "<td>" + book.publisher + "</td>" +
                        "<td>" + book.version + "</td>" +
                        "<td>" + book.priceAB + "</td>" +
                        "<td>" + book.priceSAXO + "</td>" +
                        "<td>" + book.priceCDON + "</td>" +
                        "</tr>");

                });
                $("#closeModal").on("click", function () {
                    $("#CurriculumBookTableBody").children().remove()
                });
            });
        });
    });
});