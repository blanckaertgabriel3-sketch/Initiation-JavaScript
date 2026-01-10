// Partie 1 – genererEleves (3 points)
console.log("Partie 1 – genererEleves");

function genererEleves () {
	// Taille aléatoire du tableau d'élèves
	let tailleMin = 7;
	let tailleMax = 10;
	let taille = Math.floor(Math.random() * (tailleMax - tailleMin + 1)) + tailleMin;

	// Tableau des prénoms possibles
	let prenoms = ["Alice", "Bob", "Charlie", "David", "Emma", "Fiona", "Hugo", "Isabelle", "Julien", "Lucas"];
	// Tableau des élèves
	let eleves = [];

	// Génération des élèves
	for (let i = 0; i < taille; i++) {
		// Sélection aléatoire d'un prénom par index
		let indexPrenom = Math.floor(Math.random() * prenoms.length);
		let eleve = {
			// Accès au prénom via l'index aléatoire
			prenom: prenoms[indexPrenom],
			noteFrancais: Math.floor(Math.random() * 21),
			noteMaths: Math.floor(Math.random() * 21),
			noteHistoire: Math.floor(Math.random() * 21)
		};

		// Calcul de la moyenne
		eleve.moyenne = (eleve.noteFrancais + eleve.noteMaths + eleve.noteHistoire) / 3;

		// Ajout de l'élève au tableau
		eleves.push(eleve);
	}

	return eleves;
}
let tableau_eleves = genererEleves();

//Partie 2 – afficherEleves (2 points)
console.log("Partie 2 – afficherEleves");
function afficherEleves (tableau) {
	// Affichage des élèves générés
	console.log("Liste des élèves :");
	for (let i = 0; i < tableau.length; i++) {
		console.log(tableau[i].prenom + " : " + tableau[i].moyenne.toFixed(1));
	}
}
afficherEleves(tableau_eleves);




//Partie 3 – trouverMoyenneMin (3 points)
console.log("Partie 3 – trouverMoyenneMin");

function trouverMoyenneMin(tableau, indexDepart) {
	let minIndice = indexDepart;
	let minMoyenne = tableau[indexDepart].moyenne;
	
	for (let i = indexDepart + 1; i < tableau.length; i++) {
		if (tableau[i].moyenne < minMoyenne) {
			minMoyenne = tableau[i].moyenne;
			minIndice = i;
		}
	}
	
	console.log("Plus petite moyenne :", minMoyenne.toFixed(1));	
	console.log("L'indice min :", minIndice);
	console.log("L'index de départ :", indexDepart);
	return { indice: minIndice, moyenne: minMoyenne };
}
trouverMoyenneMin(tableau_eleves, 6);




//Partie 4 – afficherDonnees (2 points)
console.log("Partie 4 – afficherDonnees");

function afficherDonnees(tableau) {
	console.log("Nombre total d'élèves :", tableau.length);
	
	let minMoyenne = tableau[0].moyenne;
	let maxMoyenne = tableau[0].moyenne;
	
	for (let i = 1; i < tableau.length; i++) {
		if (tableau[i].moyenne < minMoyenne) {
			minMoyenne = tableau[i].moyenne;
		}
		if (tableau[i].moyenne > maxMoyenne) {
			maxMoyenne = tableau[i].moyenne;
		}
	}
	
	console.log("Plus petite moyenne :", minMoyenne.toFixed(1));
	console.log("Plus grande moyenne :", maxMoyenne.toFixed(1));
}
afficherDonnees(tableau_eleves);



//Partie 5 – swap (3 points)
console.log("Partie 5 – swap");

function swap(tableau, indexA, indexB) {
	let temp = tableau[indexA];
	tableau[indexA] = tableau[indexB];
	tableau[indexB] = temp;
}
swap(tableau_eleves, 0, 2);
afficherEleves(tableau_eleves);

//Partie 6 – triParSelection(4 points)
console.log("Partie 6 – triParSelection");

function triParSelection(tableau) {
	let comparaisons = 0;
	let echanges = 0;

	// Sauvegarde du tableau avant tri
	let tableauAvantTri = [];
	for (let i = 0; i < tableau.length; i++) {
		tableauAvantTri.push(tableau[i]);
	}
	
	for (let i = 0; i < tableau.length - 1; i++) {
		let indiceMin = i;

		for (let j = i + 1; j < tableau.length; j++) {
			comparaisons++;
			if (tableau[j].moyenne < tableau[indiceMin].moyenne) {
				indiceMin = j;
			}
		}
		
		if (indiceMin !== i) {
			let temp = tableau[i];
			tableau[i] = tableau[indiceMin];
			tableau[indiceMin] = temp;
			echanges++;
		}
	}
	console.log("Nombre de comparaisons :", comparaisons, "Nombre d'échanges :", echanges);
	console.log("Tableau trié par moyenne :");
	for (const eleve of tableau) {
		console.log(eleve.prenom + " : " + eleve.moyenne.toFixed(1));
	}
	
}
triParSelection(tableau_eleves);

//Partie 7 – Appel des fonctions (2 points)
console.log("Partie 7 – Appel des fonctions");

afficherEleves(tableau_eleves);
afficherDonnees(tableau_eleves);
triParSelection(tableau_eleves);
afficherEleves(tableau_eleves);









