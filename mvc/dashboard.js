/*
http://127.0.0.1:8000	
*/
const serverUrl = localStorage.getItem("serverURL") || "http://127.0.0.1:8000";
const pseudo = localStorage.getItem("pseudo");
console.log("serverUrl:", serverUrl);
console.log("pseudo:", pseudo);


//Récupération asynchrone des données

//récupérer la liste des joueurs
async function loadPlayers() {
	try {
		//requette http (get) vers l'api pour récupérer des info sur la liste des joueurs
		const response = await fetch(`${serverUrl}/api/listPlayers`);
		//on vérifie que la requette à réussi
		if(!response.ok) {
			//throw lance une erreur qui sera capturée par le catch
			throw new Error("Erreur HTTP :", response.status);
		}
		const data = await response.JSON();
		console.log("name", data);

	} catch(error) {
		console.error("Erreur lors du chargement", error);
	}
}

loadPlayers();
console.log("appel de la fonction");


/*

//récupérer les statistiques d’un joueur
async function loadPlayerStats(name) {

}
//afficher le classement général
async function loadRanking() {

}
*/