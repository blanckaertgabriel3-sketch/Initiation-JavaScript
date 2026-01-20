class GameController {
    constructor() {
      
        // Server sends updates at 20 ticks per second
        this.SERVER_TICK_RATE = 20;
        // Duration between two server ticks in milliseconds
        this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

        // Permanently bind "this" at the instance of the GameController class
        this.loop = this.loop.bind(this);

        // Regulates framerate to keep 60fps
        requestAnimationFrame(this.loop);

        this.game = false;
        this.player = false;
        this.pseudo = localStorage.getItem("pseudo");
        this.serverUrl = "ws://localhost:8000/ws";
        // serverUrl = localStorage.getItem("serverUrl");
        this.skinPath = localStorage.getItem("skin");
        
        //objet permetant de gérer les événements
        this.inputState = {
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
        };
        
        //URL Serveur
        this.socket = new WebSocket(this.serverUrl);
        
        this.initSocket();
        this.initInput();
        this.startInputSender();
    }

    initSocket(){
        console.log("initSocket");
        //déclaration de l'attribut webSocket
        this.socket.onopen = () => {
            console.log("connecté !");  
            this.socket.send(JSON.stringify({
                name: this.pseudo,
                skinPath: this.skinPath
            }));    
        };     
    
        //réception de message du backend
        this.socket.onmessage = function(event) {
            //--------------------- console.log("message du backend !", event.data);
        }
    }
    //mettre 2 écouteurs keyup et keydown sur les touches
    initInput() {
        this.nomTouche = "";
        //écouteur pour pression de touche 
        document.addEventListener("keydown", (event) => {
            this.nomTouche = event.key;
            //événement haut
            if (this.nomTouche == "z") {
                this.inputState.up = true;
            }
            //événement bas
            else if (this.nomTouche == "s") {
                this.inputState.down = true;
            }
            //événement gauche
            else if (this.nomTouche == "q") {
                this.inputState.left = true;
            }
            //événement droite
            else if (this.nomTouche == "d") {
                this.inputState.right = true;
            }
            //événement attaque
            else if (this.nomTouche == " ") {
                this.inputState.attack = true;
            }
            if (this.nomTouche) {
                console.log("pression",this.inputState);
            }
        });
        
        //écouteur pour relachement de touche 
        document.addEventListener("keyup", (event) => {
            this.nomTouche = event.key;
            //événement haut
            if (this.nomTouche == "z") {
                this.inputState.up = false;
            }
            //événement bas
            else if (this.nomTouche == "s") {
                this.inputState.down = false;
            }
            //événement gauche
            else if (this.nomTouche == "q") {
                this.inputState.left = false;
            }
            //événement droite
            else if (this.nomTouche == "d") {
                this.inputState.right = false;
            }
            //événement attaque
            else if (this.nomTouche == " ") {
                this.inputState.attack = false;
            }
            if (this.nomTouche) {
                console.log("relache",this.inputState);
            }
        })
        
    }
    //Envoi de messages au backend
    startInputSender() {

    }
    //afin d’appeler un callback toutes les this.SERVER_INTERVAL millisecondes.
    setInterval() {

    }
    
    
    // === Main render loop ===
    loop(timestamp) {
        
        // Request the next frame
        requestAnimationFrame(this.loop);
    }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();

