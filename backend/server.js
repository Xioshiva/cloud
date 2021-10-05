require('dotenv').config()

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { type } = require('os');
var cors = require('cors')
const fetch = require('cross-fetch');

let app = express();

app.use(cors());

app.use(express.static('../frontend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.listen(8080);
console.log('Server started');


app.get('/api', function (request, response) {
    console.log("haha");
    response.setHeader('Content-Type', 'text/plain');
    response.send(`
    Voici l'API REST CRUD de Dorian et Thomas exposée par le backend sur /api/
    
    | Verbe HTTP | Endpoint                           | Données | Description                                                          |
    |:-----------|:-----------------------------------|:--------|:---------------------------------------------------------------------|
    | GET        | classements/*:type*/:limit?        |  type   | Retourne une liste de "limit" éléments (ou 4) en fonction de "type"  |
    | POST       | classements/add                    |         | Ajoute des informations dans la base de données                      |
    | PUT        | classements/update                 |         | Modifie des informations de la base de données                       |
    | DELELTE    | classements/delete/*:type*/:limit? |  type   | Retire les "limit" derniers éléments présents dans le fichier "type" |
    `);
});


var dbLink = "http://localhost:8081";

/* NOTES SUR LE PROJET:
 *   n'ayant pas fait de login pour la partie front, on a improvisé quelque chose en vitesse donc il n'est pas possible d'ajouter des utilisateurs
 *   les parties du frontend qui communiquent avec le backend sont le fichiers classement.js
 *   la base de données est composée de fichiers json (voir backend/db) sur lesquels on peut appliquer toutes les propriétés CRUD
 *   le code qui permet d'interagir avec la base de données se situe dans backend/modules/database.js
 */



/* Route permettant de récuperer les "limit" éléments les plus intéréssant du fichier identifié par "type"
 * "limit" étant optionnel, on le remplace par 4 s'il n'est pas renseigné
 * "type" fait référence au ficher json du dossier backend/db dans lequel on veut aller chercher l'info
 * valeurs de retour: -> 200 (OK)
 *                    -> 400 (Bad Request) 
 */
app.get('/api/classements/:type/:limit?', (request, response) => {
    console.log(request.body);
    if (request.params.type !== undefined) {
        console.log(request.protocol);
        fetch(dbLink + "/api/classements/" + request.params.type + "/" + request.params.limit, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            res.json().then(yo => response.status(200).json(yo))

        });

    } else {
        response.status(400).end();
    }
});

/* Route permettant d'ajouter un élément pour chaque type
 * Pour chaque fichier relatifs aux données des classements (delay, excuses, station, journey), on doit ajouter une info 
 * tous les fichiers (voir au dessus) sont mis à jour par l'appel de cette route
 * valeurs de retour: -> 201 (Created) données créées
 *                    -> 202 (Accpected) valide mais pas de garantie du résultat
 *                    -> 400 (Bad Request) 
 */
app.post('/api/classements/add', (request, response) => {
    if (request.body.content !== undefined && request.body.type) {
        fetch(dbLink + "/api/classements/add", {
            method: 'POST',
            body: JSON.stringify(request.body),
            headers: request.headers
        });
        response.status(202).end();
    } else {
        response.status(400).end();
    }
});



/* Route permettant de mettre à jour un élément pour chaque type
 * Pour chaque fichier relatifs aux données des classements (delay, excuses, station, journey), on doit mettre à jour une info 
 * valeurs de retour: -> 200 (OK)
 *                    -> 202 (Accpected) valide mais pas de garantie du résultat
 *                    -> 400 (Bad Request) 
 */
app.put('/api/classements/update', (request, response) => {
    if (request.body !== undefined) {
        fetch(dbLink + "/api/classements/update", {
            method: 'PUT',
            body: JSON.stringify(request.body),
            headers: request.headers
        });
        response.status(202).end();
    } else {
        response.status(400).end();
    }
});

/* Route permettant de supprimer "limit" éléments les plus intéréssant du fichier identifié par "type"
 * "limit" étant optionnel, on le remplace par 4 s'il n'est pas renseigné
 * "type" fait référence au ficher json du dossier backend/db dans lequel on veut aller chercher l'info
 * valeurs de retour: -> 200 (OK)
 *                    -> 202 (Accpected) valide mais pas de garantie du résultat
 *                    -> 400 (Bad Request) 
 */
app.delete('/api/classements/delete/:type/:limit?', (request, response) => {
    if (request.params.type !== undefined) {
        const limit = request.params.limit ? request.params.limit : 2;
        fetch(dbLink + "/api/classements/delete/" + request.params.type + "/" + limit, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
        response.status(202).send();
    }
    response.status(400).end();
});

let users = {
    content: [
        { username: "Thomas", password: "1234" },
        { username: "Dorian", password: "prout" }
    ]
}

//permet d'avoir plusieurs utilisateur en simultané mais cela n'est pas utilisé
let tokenSave;

/* Lorsque que une route est appellée cette fonction permet de vérifier que 
 * la requête contient un token et que celui est valide 
 * valeurs de retour: -> next() (OK)
 *                    -> 401 (Unauthorized) 
 *                    -> 400 (Bad Request) 
 */

function authJwtToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null || token != tokenSave) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;

        next();
    });
}
