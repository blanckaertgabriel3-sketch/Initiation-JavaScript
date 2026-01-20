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
        this.selectedSkin = localStorage.getItem("skin");

        //objet permetant de gérer les événements
        this.action = {
            up: false,
            down: false,
            left: false,
            right: false,
            attack: false,
        }
        //déclaration de l'attribut webSocket
        this.socket = new WebSocket("ws://localhost:8000/ws");
        this.socket.onopen = () => {
            console.log("connecté !");  
            this.socket.send(JSON.stringify({
                name: this.pseudo,
                skinPath: this.skinPath
            }));    
        };     


        
        this.initSocket();
    }
    initSocket(){
        console.log("initSocket");
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

