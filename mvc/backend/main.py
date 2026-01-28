import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from contextlib import asynccontextmanager
from Game import Game

game = Game(needed_players=1)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    asyncio.create_task(game.game_loop())
    yield
    # Shutdown (optionnel)
    print("Server shutting down")

app = FastAPI(lifespan=lifespan)


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()

    join_data = await ws.receive_json()
    name = join_data.get("name")
    skin_path = join_data.get("skinPath")

    print(name, skin_path)

    player = game.add_player(ws, name, skin_path)
    player_id = player.id

    try:
        while True:
            data = await ws.receive_json()
            game.handle_input(player_id, data)

    except WebSocketDisconnect:
        game.remove_player(player_id)

# ROUTE TEST LIST PLAYERS
@app.get("/api/listPlayers")
def list_players():
    return [p.name for p in game.players.values()]

# ROUTE TEST STATS
@app.get("/api/stats")
def player_stats(name: str):
    player = next((p for p in game.players.values() if p.name == name), None)
    if not player:
        return {"error": "Player not found"}
    return {
        "name": player.name,
        "lvl": player.lvl,
        "hp": player.hp,
        "maxHp": player.maxHp,
        "speed": player.speed,
        "kills": getattr(player, "kills", 0),
        "deaths": getattr(player, "deaths", 0),
        "kd": getattr(player, "kd", 0),
        "rank": getattr(player, "rank", 0),
        "avg_rank": getattr(player, "avg_rank", 0)
    }
