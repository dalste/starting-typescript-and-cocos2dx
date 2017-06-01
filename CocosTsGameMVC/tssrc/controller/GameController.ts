import  GameView  from "./../view/GameView";
export default class GameController{

   
   private _system:dijon.System = undefined;
   
   private _gameView:GameView;
   constructor  () {
       
   }
    onAppStartupComplete () {
        console.log("GameController::onAppStartupComplete");
       
        this._gameView = this._system.getObject("GameView") as GameView;
        this._gameView.show();
    }
}