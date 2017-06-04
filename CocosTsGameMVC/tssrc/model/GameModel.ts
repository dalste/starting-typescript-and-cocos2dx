 import { Model } from "./../../tslib/dalste/mvc/Model";

 export class GameModel extends Model {

        static CURRENT_LEVEL = "level.current";
       
        /*
        current game
        */
        static TIME_REMAINING = "game.timeRemaining";

      
        
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

    }