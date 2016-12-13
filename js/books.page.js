$(document).ready(function () {

    //Metoden til at hente alle bøgerne.
    SDK.Book.getAll(function (err, data) {
        if (err) throw err;
        //Bøgerne bliver her dekrypteret.
        var decrypted = encryptDecrypt(data);
        decrypted = JSON.parse(decrypted);
        //Tabellen bøgerne skal stå i hentes.
        var $booksTableBody = $("#booksTableBody");
        decrypted.forEach(function (book, i) {
            //Her defineres der hvor hvilke værdier skal stå.
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