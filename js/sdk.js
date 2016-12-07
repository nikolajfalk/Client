var SDK = {
    serverURL: "http://localhost:8080/server2_0_war_exploded",
    request: function (options, cb) {

        //Take care of headers
        var headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach(function (h) {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        //Perform XHR
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
    Book: {
        getAll: function (cb) {
            SDK.request({method: "GET", url: "/book"}, cb);
        }
    },
    User: {
        create: function (data, cb) {
            SDK.request({method: "POST", url: "/user", data: data}, cb);
        },
        currentUser: function (cb) {
            SDK.request({
                method: "GET",
                url: "/user/currentuser",
                headers: {"authorization": SDK.Storage.load("token")}
            }, cb);
        },
        delete: function (cb) {
            SDK.User.currentUser(function (err, data) {
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
        edit: function (userid, cb) {
            SDK.User.currentUser(function (err, data) {
                if (err) throw err;
                var decrypted = encryptDecrypt(data);
                decrypted = JSON.parse(decrypted);
                var userid = decrypted.userID;
                SDK.request({
                    method: "PUT",
                    url: "/user" + userid,
                    headers: {"authorization": SDK.Storage.load("token")}
                }, cb);
            })
        }
    },
    Curriculum: {
        getCurriculum: function (cb) {
            SDK.request({method: "GET", url: "/curriculum"}, cb);
        },
        getCurriculumBook: function (id, cb) {
            SDK.request({method: "GET", url: "/curriculum/" + id + "/books"}, cb);
        }
    },
    logOut: function () {
        SDK.Storage.remove("token");
        SDK.Storage.remove("user");
    },
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
            SDK.Storage.persist("user", data.user);
            cb(null, data);
        });
    },
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

$("#btnLogout").on("click", function () {
    SDK.logOut();
    window.location.href = "index.html";
});


function encryptDecrypt(input) {
    var key = ['A', 'B', 'C'];
    var out = "";
    for (var i = 0; i < input.length; i++) {
        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    }
    return out;
}

function xorConvert(text, key) {
    var kL = key.length;

    return Array.prototype
        .slice.call(text)
        .map(function (c, index) {
            return String.fromCharCode(c.charCodeAt(0) ^ key[index % kL].charCodeAt(0));
        }).join('');
}

var key = "ABC";
var txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@£#$%^&*()[]{};:'\",.<>/\\";
var cipherText = xorConvert(txt, key);

//assert(xorConvert(cipherText, key) === txt);