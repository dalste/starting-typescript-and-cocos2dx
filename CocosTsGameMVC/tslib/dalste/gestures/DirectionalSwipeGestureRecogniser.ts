import { SwipeDirections } from "./SwipeDirections";

export class DirectionalSwipeGestureRecogniser {
    beginPt: cc.Point;
    endPt: cc.Point;
    result: number = SwipeDirections.NOT_SUPPORTED;
    startTime: number = null;
    _direction: cc.Point;
    // be called in onTouchBegan

    getDirection() {
        return this._direction;
    }
    beginPoint(x: number, y: number) {
        this.beginPt = cc.p(x, y)
        this.result = SwipeDirections.INIT_RETURN;
        this.startTime = new Date().getTime();

    }

    // be called in onTouchEnded
    endPoint(x: number, y: number) {

        this.endPt = cc.p(x, y);

        var threshold = 100;
        var restraint = 100;
        var newRtn = SwipeDirections.NOT_SUPPORTED;

        this._direction = cc.p(this.endPt.x - this.beginPt.x, this.endPt.y - this.beginPt.y);
        var dist = cc.pLength(this._direction);

        var elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
        if (elapsedTime <= 1000) { // first condition for awipe met
            if (Math.abs(dist) >= threshold) {
                newRtn = SwipeDirections.SWIPE_ANY_DIR;
            } else {
                newRtn = SwipeDirections.TAP;
            }
        }


        return newRtn;
    }


}