$(document).ready(function () {

    $("#btnCurriculumID").on("click", function (e) {
        e.preventDefault();

        var curriculumID = $("#inputCurriculum").val();

        SDK.Curriculum.getCurriculumBook(curriculumID, function (err, data) {

            var $booksTableBody = $("#curriculumBookTable");
            decrypted.forEach(function (book, i) {

                $booksTableBody.append(
                    "<tr>" +
                    "<td>" + book.title + "</td>" +
                    "<td>" + book.author + "</td>" +
                    "<td>" + book.publisher + "</td>" +
                    "<td>" + book.version + "</td>" +
                    "<td>" + book.priceAB + "</td>" +
                    "<td>" + book.priceSAXO + "</td>" +
                    "<td>" + book.priceCDON + "</td>" +
                    "<td>" + book.ISBN + "</td>" +
                    "<td>" + book.bookID + "</td>" +
                    "</tr>");
            });
        });
    });
});
