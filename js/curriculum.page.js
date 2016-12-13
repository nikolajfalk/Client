$(document).ready(function () {

    //Funktion for alle pensumliste oplysningerne kaldes.
    SDK.Curriculum.getCurriculum(function (err, data) {
        if (err) {
            return
        }
        //Pensumliste oplysningerne dekrypteres.
        var decrypted = encryptDecrypt(data);
        decrypted = JSON.parse(decrypted);
        //Tabellen som oplysningerne skal indtaste i kaldes, og oplysningerne bliver tastet ind.
        var $curriculumTableBody = $("#curriculumTableBody");
        decrypted.forEach(function (curriculum, i) {
            //Her defineres der hvilken kolonne hvilke data skal stå i. I hver række er der tilføjet en knap, der gør det
            //muligt at se bøgerne på de enkelte pensumlister.
            $curriculumTableBody.append(
                "<tr>" +
                "<td>" + curriculum.curriculumID + "</td>" +
                "<td>" + curriculum.school + "</td>" +
                "<td>" + curriculum.education + "</td>" +
                "<td>" + curriculum.semester + "</td>" +
                "<td><button id='showCBbtn' class='showBooksButton' data-curriculumId=" + curriculum.curriculumID + "> Vis</button></td>" +
                "</tr>");
        });
        //Denne del kode kobler knapperne fra ovenstående kode til den tilhørende pensumlistes id. Dvs at hver knap har
        //det id som den pensumliste den er i række med. Dette er nødvendig, da funktionen til at finde bøger på en
        //pensumliste gøres med et id.
        $(".showBooksButton").on("click", function () {
            var $button = $(this);
            var id = $button.data("curriculumid");
            $("#showBooksModal").modal();
            //Her kaldes metoden til at hente bøgerne på en pensumliste.
            SDK.Curriculum.getCurriculumBook(id, function (err, data) {
                if (err) throw err;
                //Bøgerne bliver her dekrypteret.
                var decrypted = encryptDecrypt(data);
                decrypted = JSON.parse(decrypted);
                //Bøgerne skal indsættes i en tabel. Den kaldes her.
                var $CurriculumBookTableBody = $("#CurriculumBookTableBody");
                decrypted.forEach(function (book, i) {
                    //Igen defineres der hvor hvilke værdier skal stå.
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