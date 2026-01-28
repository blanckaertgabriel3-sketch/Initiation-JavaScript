/*
http://127.0.0.1:8000	
*/
// const serverUrl = localStorage.getItem("serverURL"); 
const serverUrl = "http://127.0.0.1:8000"; 
const pseudo = localStorage.getItem("pseudo");
console.log("serverUrl:", serverUrl);
console.log("pseudo:", pseudo);

//récupérer la liste des joueurs
async function loadPlayers() {
	let listPlayer = [];
	let index = 0;
	for(id in this.game.player) {
		listPlayer[index] = this.game.player.name;
		index ++;
	}
}