import { Model } from "./../../tslib/dalste/mvc/Model";

export class GameModel extends Model {

    static CURRENT_LEVEL = "level.current";

    /*
    current game
    */
    static TIME_REMAINING = "game.timeRemaining";

    static PLAYER_SCORE = "player.score";

    static NPC_SCORE = "npc.score";



    setup() {
        this.set(GameModel.CURRENT_LEVEL, 2);
        this.set(GameModel.TIME_REMAINING, 200);
    }

    getCurrentLevel(): number {
        return this.get(GameModel.CURRENT_LEVEL);
    }

    setCurrentLevel(val: number) {
        this.set(GameModel.CURRENT_LEVEL, val);
    }


    getTimeRemaining(): number {
        return this.get(GameModel.TIME_REMAINING);
    }

    setTimeRemaining(val: number) {
        this.set(GameModel.TIME_REMAINING, val);
    }


    setPlayerScore(val: number) {
        this.set(GameModel.PLAYER_SCORE, val);
    }

    getPlayerScore(): number {
        return this.get(GameModel.PLAYER_SCORE);
    }


    setNpcScore(val: number) {
        this.set(GameModel.NPC_SCORE, val);
    }

    getNpcScore(): number {
        return this.get(GameModel.NPC_SCORE);
    }



}