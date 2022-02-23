const { game, AskNewGame, finish } = require("./BaseballGame.js");

async function mainGamePlay() {
    let runningGame = true;
    while (runningGame) {
        await game();
        runningGame = await AskNewGame();
    }
    console.log("-----게임 종료-----");
    finish();
}

mainGamePlay();