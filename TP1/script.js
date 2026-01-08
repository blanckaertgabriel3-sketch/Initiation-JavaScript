// Partie 1 – Informations générales

const nomClasse = "B1";
let nombreEleve = 5;
etatClasse = true;
console.log(nomClasse);
console.log(nombreEleve);
console.log(etatClasse);

// Partie 2 – Représenter un élève

let eleve = {
	prenom: "gabriel",
	noteMath: 18,
	noteFrancais: 2
};
console.log(eleve.prenom);

// Partie 3 – Gérer plusieurs élèves


let eleve1 = {
	prenom: "lilian",
	noteMath: 18,
	noteFrancais: 20
};
let eleve2 = {
	prenom: "thomas",
	noteMath: 1,
	noteFrancais: 20
};
let eleve3 = {
	prenom: "louis",
	noteMath: 8,
	noteFrancais: 10
};
let elevesPrenom = [	
	eleve1.prenom,
	eleve2.prenom,
	eleve3.prenom

];

for (let i = 0; i < elevesPrenom.length; i++ ) {
	console.log(elevesPrenom[i]);
}

// Partie 4 – Calcul des moyennes

let eleves = [
	eleve1,
	eleve2,
	eleve3
];

for (let i = 0; i < eleves.length; i++) {
	let moyenne = (eleves[i].noteMath + eleves[i].noteFrancais)/2;
	console.log(eleves[i].prenom, moyenne);
};

// Partie 5 – Résultat de l’élève

for (let i = 0; i < eleves.length; i++) {
	let moyenne = (eleves[i].noteMath + eleves[i].noteFrancais)/2;
	let admission = "";
	if(moyenne >= 10){
		admission = "admis";
	}
	else{
		admission = "Non admis";
	}
	console.log(eleves[i].prenom, moyenne, admission);

};

// Partie 6 – Mention
for (let i = 0; i < eleves.length; i++) {
	let moyenne = (eleves[i].noteMath + eleves[i].noteFrancais)/2;
	let admission = "";
	let mention = "";
	if(moyenne >= 10){
		admission = "admis";
	}
	else{
		admission = "Non admis";
	}
	if (moyenne >= 16) {
		mention = "Très bien";
	}
	else if (moyenne >= 14) {
		mention = "bien";
	}
	else if (moyenne >= 12) {
		mention = "assez bien";
	}
	else if (moyenne >= 10) {
		mention = "Passable";
	}
	else {
		mention = "Insuffisant";
	}
	console.log(eleves[i].prenom, moyenne, admission, mention);

};

// Partie 7 – Statistiques de la classe

for (let i = 0; i < eleves.length; i++) {
	let moyenne = (eleves[i].noteMath + eleves[i].noteFrancais)/2;
	let admission = "";
	let mention = "";
	if(moyenne >= 10){
		admission = "admis";
	}
	else{
		admission = "Non admis";
	}
	if (moyenne >= 16) {
		mention = "Très bien";
	}
	else if (moyenne >= 14) {
		mention = "bien";
	}
	else if (moyenne >= 12) {
		mention = "assez bien";
	}
	else if (moyenne >= 10) {
		mention = "Passable";
	}
	else {
		mention = "Insuffisant";
	}
	console.log(eleves[i].prenom, moyenne, admission, mention);

	let index = 0;
	while(index < eleves.length) {
		let nombreAdmission = "";
		if (admission === "admis") {
			nombreAdmission ++ ;
		}
		index ++;
		console.log("nombre admission : ", nombreAdmission);	
	}
};

