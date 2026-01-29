/*
http://127.0.0.1:8000	
*/
const serverUrl = localStorage.getItem("serverURL") || "http://13.38.137.68:8000";
const pseudo = localStorage.getItem("pseudo");
console.log("serverUrl:", serverUrl);
console.log("pseudo:", pseudo);

const serverInput = document.getElementById("serverInput");
const saveServerBtn = document.getElementById("saveServer");

// Pré-remplir le champ avec l'URL actuelle
serverInput.value = serverUrl;

saveServerBtn.addEventListener("click", () => {
    const newServerUrl = serverInput.value.trim();

    if (newServerUrl) {
        localStorage.setItem("serverURL", newServerUrl);
        location.reload(); // recharge la page avec la nouvelle URL
    }
});

//Récupération asynchrone des données

//récupérer la liste des joueurs
async function loadPlayers() {
	console.log("loadPlayers");
	try {
		//requette http (get) vers l'api pour récupérer des info sur la liste des joueurs
		const response = await fetch(`${serverUrl}/api/listPlayers`);
		//on vérifie que la requette à réussi
		if(!response.ok) {
			//throw lance une erreur qui sera capturée par le catch
			throw new Error("Erreur HTTP :" + response.status);
		}
		const data = await response.json();
		console.log(data);
		
		//Load stats for the first player
        if (data.length > 0) {
			loadPlayerStats(data[0].name);
        }
	} catch(error) {
		console.error("Erreur lors du chargement", error);
	}
}

//récupérer les statistiques d’un joueur
async function loadPlayerStats(name) {
	console.log("loadPlayersStats");
	try {
		const response = await fetch(`${serverUrl}/api/stats?name=${encodeURIComponent(name)}`);
		if(!response.ok) {
			throw new Error("Erreur lors du chargement des stats" + response.status);
		}
		let stats = await response.json();
		console.log("name ",name,stats);		
	}catch (error){
		console.error("Erreur lors du chargement des stats", error)
	}
}
//afficher le classement général
async function loadRanking() {
    console.log("loadRanking");
    try {
        const response = await fetch(`${serverUrl}/api/listPlayers`);
        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }

        const ranking = await response.json();
        console.log("Classement général :", ranking);

    } catch (error) {
        console.error("Erreur lors du chargement du classement", error);
    }
}
loadPlayers();
loadRanking();