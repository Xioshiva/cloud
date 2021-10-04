let token;
let currentUser;

// Envoie une requete au serveur pour demande rde se connecter
async function connexion(){
    currentUser = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;    
    await fetch('http://localhost:8080/api/succes/login',
    {
        method: 'POST',
        headers : new Headers({
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({username:currentUser, password:pass})
    })
    .then(function(response) {
        if(response.status === 200){
            console.log("LA CONNEXION EST UN SUCCES");
            return response.json()
        } else if (response.status === 403){
            console.log("ECHEC DE LA CONNEXION");
        }
    })
    .then(response => token = response);
    getSucces(currentUser);
    
}
// Permet d'envoyer un succès au serveur
async function postSucces(){
    const success = document.getElementById('addSucces').value;
    console.log(success);
    if(success !== "" && currentUser !== undefined){    
        await fetch('http://localhost:8080/api/succes/add',
        {
            method: 'PUT',
            headers: new Headers({
                'Authorization': 'Bearer ' + token.accessToken,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({'user':currentUser, 'succes':success})
        })
        .then(function(response) { // gèrer les codes de retour correctement
            if(response.status === 200){
                getSucces(currentUser);
            } else {
                alert("error while adding succes");
            }
        });
    }
}

//permet de récupérer les succes de l'utilisateur
async function getSucces(username){
    document.getElementById('mySucces').innerHTML = "";
    await fetch('http://localhost:8080/api/succes/get/' + username,
    {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token.accessToken,
            'Content-Type': 'application/json',
        })
    })
    .then(function(response) {
        if(response.status === 200){
            console.log("LES SUCCES ONT ETE AFFICHE AVEC SUCCES");
            return response.json()
        } else if (response.status === 400){
            console.log("L'UTILISATEUR EST UNDEFINED");
        }
    })
    .then(result => {
        result.forEach(element => {
            // préciser
            var img = (Math.round(Math.random())) ? "../images/check.png" : "../images/no.png"; 
            document.getElementById('mySucces').innerHTML += '<li><div class="ligne"><img id="img1-1" src="'+ img +'"><p>'+ element.value + '</p></div></li>';
        });
    });
}

//permet de se deconnecter
async function deconnexion(){
    token = "";
    await fetch('http://localhost:8080/api/succes/logout' ,
    {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token.accessToken,
            'Content-Type': 'application/json',
        })
    })
    .then(function(response) {
        if(response.status === 204){
            console.log("LA DECONNEXION EST UN SUCCES");
        } else if (response.status === 405){
            console.log("L'UTILISATEUR N'ETAIT PAS CONNECTER");
        }
    });


    document.getElementById('mySucces').innerHTML = "";
}

