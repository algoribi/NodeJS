import { baseballGame, askNewGame, finishGame } from './BaseballGame';

async function mainGamePlay() {
    let runningGame : boolean = true;
    while (runningGame) {
        await baseballGame();
        runningGame = await askNewGame();
    }
    console.log("-----게임 종료-----");
    finishGame();
}

mainGamePlay();