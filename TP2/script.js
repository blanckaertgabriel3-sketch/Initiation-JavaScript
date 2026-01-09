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

// Partie 1 – Etude des valeurs (3 points)
console.log("PARTIE 1 – Etude des valeurs");

console.log("Taille du tableau :", notes.length);
console.log("Tableau initial :", notes);

let copieTab = [];
for (let i = 0; i < notes.length; i++) {
    copieTab.push(notes[i]);
}

let min_value = notes[0];
let max_value = notes[0];

for (let i = 1; i < notes.length; i++) {
    //prendre la valeur min dans min_value
    if (notes[i] < min_value) {
        min_value = notes[i];
    }
    //prendre la valeur min dans min_value
    if (notes[i] > max_value) {
        max_value = notes[i];
    }
}

console.log("Valeur minimale :", min_value);
console.log("Valeur maximale :", max_value);

// Partie 2 – Première étape du tri (3 points)
console.log("PARTIE 2 – Première étape du tri");

let min_indice = 0;

for (let i = 1; i < notes.length; i++) {
    //condition si la note est plus petite que 0 on récupére la valeur de i
    if (notes[i] < notes[min_indice]) {
        min_indice = i;
    }
}

console.log("Plus petite valeur :", notes[min_indice]);
console.log("Indice de la plus petite valeur :", min_indice);

// Partie 3 – Échange de valeurs (3 points)
console.log("PARTIE 3 – Échange de valeurs");
//temp est la variable pour stocker la valeur de le 1er note 
let temp = notes[0];
notes[0] = notes[min_indice];
notes[min_indice] = temp;

console.log("Tableau après échange :", notes);

// Partie 4 – Tri par sélection complet (4 points)
console.log("PARTIE 4 – Tri par sélection complet");

let comptEchange = 0;
for (let i = 0; i < notes.length - 1; i++) {
    let indiceMin = i;

    for (let j = i + 1; j < notes.length; j++) {
        if (notes[j] < notes[indiceMin]) {
            indiceMin = j;
            comptEchange ++;
            console.log("Affichage de chaque échange :",notes);
        }

    }

    let temp = notes[i];
    notes[i] = notes[indiceMin];
    notes[indiceMin] = temp;
}



// Partie 5 – Affichage du résultat (2 points)
console.log("Partie 5 – Affichage du résultat");

console.log("Tableau initial :",copieTab);
console.log("Tableau trié :", notes);



// BONUS
console.log("Affichage de chaque échange :",comptEchange);
