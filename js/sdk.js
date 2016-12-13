
/**
 * Klasse der styrer min SDK, altså alle mine metoder. Hver metode er koblet til et endpoint på min server.
 */

//Her oprettes forbindelsen til min server.
var SDK = {
    serverURL: "http://localhost:8080/server2_0_war_exploded",
    request: function (options, cb) {

        //Håndtere headers.
        var headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach(function (h) {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        //Ajax metode der laver HTTP request til serveren.
        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            contentType: "application/json",
            headers: headers,
            dataType: "json",
            data: JSON.stringify(options.data),
            success: function (data, status, xhr) {
                cb(null, data, status, xhr);
            },
            error: function (xhr, status, errorThrown) {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });
    },
    //Metode til at hente alle bøgerne. Henter bøger på url'en /"http://localhost:8080/server2_0_war_exploded/books.
    //Metoden sker med et GET request.
    Book: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/book"}, cb);
        }
    },
    //Metode til oprette en bruger. Metoden sker med et POST request.
    User: {
        create: function (data, cb) {
            SDK.request({method: "POST", url: "/user", data: data}, cb);
        },
        //Denne metode henter den nuværende bruger ud fra det token som er blevet tildelt ved login.
        //Token bliver fundet i vores Storage, der er en funktion der gemmer objekter i din browser indtil browseren lukkes.
        currentUser: function (cb) {
            SDK.request({method: "GET", url: "/user/currentuser", headers: {"authorization" : SDK.Storage.load("token")}}, cb);
        },
        //Metoden her sletter en bruger. Den fungere i sammenspil med currentUser metoden, da den sletter brugeren ud fra
        // den nuværende bruger. Metoden er en PUT metode, da vi soft deleter i stedet for at fjerne data helt.
        delete: function (cb) {
            SDK.User.currentUser(function(err, data) {
                if (err) throw err;
                var decrypted = encryptDecrypt(data);
                decrypted = JSON.parse(decrypted);
                var userid = decrypted.userID;
                SDK.request({
                    method: "PUT",
                    url: "/user/delete/" + userid,
                    headers: {"authorization": SDK.Storage.load("token")}
                }, cb);
            })
        },
        //Denne metode mener meget om deleteUser metoden, men i stedet for at slette så kan vi ændre en bruger.
        //Fremgangsmåden er den samme, da vi også her benytter et PUT request.
        edit: function (useredit, cb) {
            SDK.User.currentUser(function(err, data) {
                if (err) throw err;
                var decrypted = encryptDecrypt(data);
                decrypted = JSON.parse(decrypted);
                var userid = decrypted.userID;
                SDK.request({
                    method: "PUT",
                    url: "/user/" + userid, data: useredit,
                    headers: {"authorization": SDK.Storage.load("token")}
                }, cb);
            })
        }
    },
    //Metoden her er til for at hente informationerne på alle pensumlisterne. Dette gøres med et GET request.
    Curriculum: {
        getCurriculum: function (cb) {
            SDK.request({method: "GET", url: "/curriculum"}, cb);
        },
        //Denne metode henter alle bøger tilknyttet en specifik pensumliste. Dette gøres ved et GET request tilknyttet
        //et bestemt id.
        getCurriculumBook: function (id, cb) {
            SDK.request({method: "GET", url: "/curriculum/" + id + "/books"}, cb);
        }
    },
    //Logud metode, der fjerner tokent fra Storage, altså de gemte værdier i browseren.
    logOut: function () {
        SDK.Storage.remove("token");
    },
    //Login funktion der tjekker username og password, hvis det stemmer overens med databasen tildeles brugeren en token.
    login: function (username, password, cb) {
        this.request({
            data: {
                username: username,
                password: password
            },
            url: "/user/login",
            method: "POST"
        }, function (err, data) {
            //On login-error
            if (err) return cb(err);
            SDK.Storage.persist("token", data);
            cb(null, data);
        });
    },
    //Dette er den tidligere nævnte Storage funktion, der lagre tokens i browseren.
    Storage: {
        prefix: "BookIT ",
        persist: function (key, value) {
            window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: function (key) {
            var val = window.localStorage.getItem(this.prefix + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: function (key) {
            window.localStorage.removeItem(this.prefix + key);
        }
    }
};
//Dette er logud knappen i mit program, som er koblet op på logud funktionen.
$("#btnLogout").on("click", function () {
    SDK.logOut();
    window.location.href = "index.html";
});
// Denne funktion dekryptere data, når det modtages fra serveren.
function encryptDecrypt(input) {
    var key = ['A', 'B', 'C'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}
