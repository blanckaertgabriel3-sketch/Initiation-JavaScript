//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];


// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let note = Math.floor(Math.random() * (note_maximum + 1));

    // Ajouter la note générée au tableau
    notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////


//FIN TP2
console.log("FIN TP2--------");

let prenomEleves = [
  "Alice",
  "Benoît",
  "Camille",
  "David",
  "Emma",
  "Lucas",
  "Manon",
  "Nathan",
  "Océane",
  "Thomas"
];
let eleves = [];
let moyenne = 0;
//boucle qui parcourt le tableau des élèves
for (let i = 0; i < taille; i++) {
    //prénom aléatoire
	let elevename = Math.floor(Math.random() * 10);
    elevename = prenomEleves[elevename];
    
    //notes aléatoires pour les matières 
    randNoteFrancais = Math.floor(Math.random() * 20);
    randNoteMaths = Math.floor(Math.random() * 20);
    randNoteHistoire = Math.floor(Math.random() * 20);
    //calcul de la moyenne
    moyenne = (randNoteFrancais + randNoteMaths + randNoteHistoire)/3;
    console.log(elevename, " - ",moyenne.toFixed(2));

    //création d'objet avec les notes aléatoires + prénoms aléatoire
    let eleve = {
        prenom : elevename,
        noteFrancais: randNoteFrancais,
        noteMaths: randNoteMaths,
        noteHistoire: randNoteHistoire,
        moy: moyenne.toFixed(2)
    };
    
	eleves.push(eleve);

}
console.log("Tableau élèves :", eleves);

// Partie 2 – Étude des valeurs (2 points)
console.log("Partie 2 – Étude des valeurs");

let nombreEleves = 0;
let min_value = eleves.eleve[0].moy;
let max_value = eleves[0].eleve.moy;
console.log("min_value", min_value);
console.log("max_value", max_value);

for (let i = 0; i < taille; i++) {
    nombreEleves ++;

    //trouver la max et min moy
    for (let i = 1; i < eleves.length; i++) {
        //prendre la valeur min dans min_value
        if (eleves[i] < min_value) {
            min_value = eleves[i];
        }
        //prendre la valeur min dans min_value
        if (eleves[i] > max_value) {
            max_value = eleves[i];
        }
    }

}
console.log("Nombre élèves :",nombreEleves);
console.log("max moy :",max_value);
console.log("min moy :",min_value);


