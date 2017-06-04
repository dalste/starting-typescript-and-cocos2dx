import { ScreenTypes } from "./../types/ScreenTypes"
import { IView } from "./../../tslib/dalste/mvc/IView";
export class GameController {

    //inject
    private _system: dijon.System = undefined;

    private _gameView: IView;
    private _splashScreenView: IView;
    constructor() {

    }

    /**
     *  handler for the ApplicationEvents.APP_STARTUP_COMPLETE event
     */
    onAppStartupComplete() {
        console.log("GameController::onAppStartupComplete");
        this.onDoNavigation(ScreenTypes.SPLASH_SCREEN);

    }
    /**
     *  handler for the ApplicationEvents.APP_GOTO_PLAY_SCENE event
     */
    onAppGoToPlayScene() {
        this.onDoNavigation(ScreenTypes.GAMEPLAY_SCREEN);
    }

/**
     *  handler for the ApplicationEvents.APP_GOTO_SPLASH_SCENE event
     */
     onAppGoToSplashScene() {
        this.onDoNavigation(ScreenTypes.SPLASH_SCREEN);
    }
    

    /**
     *  handler for the app:doNavigation event
     */
    onDoNavigation(gotoScreen: number) {

        switch (gotoScreen) {
            case ScreenTypes.SPLASH_SCREEN:
                if (this._splashScreenView == null)
                    this._splashScreenView = this._system.getObject("SplashScreenView") as IView;
                this._splashScreenView.show();
                break;
            case ScreenTypes.GAMEPLAY_SCREEN:
                if (this._gameView == null)
                    this._gameView = this._system.getObject("GameView") as IView;
                this._gameView.show();
                break;

        }

    }
}