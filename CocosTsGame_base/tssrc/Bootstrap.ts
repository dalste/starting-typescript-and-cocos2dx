
import {IApplication}  from "./IApplication";
import Application1  from "./Application1";
import Application2  from "./Application2";

export const App: IApplication = new Application2();

export function start(): void {
  App.startUp();
}

