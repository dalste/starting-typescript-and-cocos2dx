
import { IApplication } from "./IApplication";
import { Application1 } from "./Application1";
import { Application2 } from "./Application2";

export const App: IApplication = new Application2();

/**
 * @desc exposed directly to the globally scoped library variable configured in your webpack options 
 * called by the cocos2dx entry scene
 * @see webpackconfig.js  {library:"CocosTSGame"}
 * 
 */
export function start(): void {
  App.startUp();
}

