const fs = require('fs');
var mysql = require('mysql');


function sendQuery(string) {
    
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "lol",
        database: "myDB"
    });

    con.query(string, function (erre, result, fields) {
        if (erre) {
            console.log(erre);
            throw erre;
        }
        console.log("ICI " + JSON.stringify(result) );
        con.end();
        return JSON.stringify(result);
    });
}


function getIndex(type) {
    var tipe = 0;

    if (type == "excuses") {
        tipe = 1;
    } else if (type == "journey") {
        tipe = 2
    } else if (type == "station") {
        tipe = 4;
    }
    return tipe;
}

/* En fonction de "type", on ajoute l'entrée {key:k, value:v}
 * dans un des 4 fichiers relatifs aux classements
 * retourne "true" si tout s'est bien passé pour addapter le code http de retour de la route 
 */
exports.add = function (k, v, type) {
    var req = "INSERT INTO `classments`(`message`, `occurence`, `index`) VALUES (\"" + k + "\"," + v + "," + getIndex(type) + ");"
    sendQuery(req);
    return true;
}

/* En fonction de "type", on ajoute retourne "limit" éléments
 * les éléments sont triés par leur valeur (comme ce sont des retards, des nombre d'excuses utilisés...
 * et que nous faisons des classements, nous ne voulons que les éléments avec la valeur la plus grande)
 * retourne la liste des éléments qui sont retournés ou une erreur 
 */
exports.get = function (limit, type) {
    var req = "SELECT `message`, `occurence` FROM `classements` WHERE `classements`.`index` = " + getIndex(type) + " ORDER BY `occurence` DESC LIMIT 4;";
    console.log(sendQuery(req));
    return sendQuery(req);
}

/* En fonction de "user", on retourne la liste de tous ses succes favoris
 * retourne la liste des succes ou false en cas d'erreur 
 */
exports.getSucces = function (user) {
    var req = "SELECT * FROM `user` WHERE name = \"" + user + "\";";
    return sendQuery(req);
}