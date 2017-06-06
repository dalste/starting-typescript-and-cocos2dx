/**
 * @description utility class for obtaining information about the the cocos2d-x display
 * 
 */
 export class Display {
        static  BOTTOM_RIGHT = 0;
        static BOTTOM_MIDDLE = 1;
        static BOTTOM_LEFT = 2;
        static MIDDLE_RIGHT = 3;
        static MIDDLE_MIDDLE = 4;
        static MIDDLE_LEFT = 5;
        static TOP_MIDDLE = 6;
        static TOP_RIGHT = 7;
        static TOP_LEFT = 8;


        /**
         * @returns {cc.Point} - the top left of the visible portion of the screen
         */
        topLeft():cc.Point {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x, porigin.y + sz.height);
        }
        /**
         * @returns {cc.Point} - the top right of the visible portion of the screen
         */
        topRight():cc.Point {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x + sz.width, porigin.y + sz.height);
        }
        /**
         * @returns {cc.Point} - the top middle of the visible portion of the screen
         */
        topMiddle():cc.Point {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x + (sz.width / 2), porigin.y + sz.height);
        }
        /**
         * @returns {cc.Point} - the middle left of the visible portion of the screen
         */
        middleLeft():cc.Point {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x, porigin.y + (sz.height / 2));
        }
        /**
         * @returns {cc.Point} - the middle middle of the visible portion of the screen
         */
        middleMiddle():cc.Point {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x + (sz.width / 2), porigin.y + (sz.height / 2));
        }
          /**
         * @returns {cc.Point} - the middle right of the visible portion of the screen
         */
        middleRight() {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x + (sz.width), porigin.y + (sz.height / 2));
        }
        /**
         * @returns {cc.Point} - the bottom left of the visible portion of the screen
         */
        bottomLeft():cc.Point {
            return cc.director.getVisibleOrigin();
        }
        /**
         * @returns {cc.Point} - the bottom middle of the visible portion of the screen
         */
        bottomMiddle() {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x + (sz.width / 2), porigin.y);
        }
        /**
         * @returns {cc.Point} - the bottom right of the visible portion of the screen
         */
        bottomRight():cc.Point {
            var porigin = cc.director.getVisibleOrigin();
            var sz = cc.director.getVisibleSize();

            return cc.p(porigin.x + (sz.width), porigin.y);
        }
        /**
         * @returns {Number} - the height of the visible portion of the screen
         */
        screenHeight() {
            var sz = cc.director.getVisibleSize();

            return sz.height;
        }

         /**
         * @returns {Number} - the width of the visible portion of the screen
         */
        screenWidth():number {
            var sz = cc.director.getVisibleSize();

            return sz.width;
        }
        /**
         * @returns {Number} - the design resolution height
         */
        designResolutionHeight():number {
            var sz = cc.view.getDesignResolutionSize();

            return sz.height;
        }
        /**
         * @returns {Number} - the design resolution width
         */
        designResolutionWidth():number {
            var sz = cc.view.getDesignResolutionSize();

            return sz.width;
        }
        /**
         * @param {Number} id - the constant representing the desired position on screen for example Display.BOTTOM_RIGHT | Display.MIDDLE_LEFT etc.
         * @returns {Number} - the design resolution width
         */
        getPosition(id:number):cc.Point {

            switch (id) {
                case Display.BOTTOM_RIGHT:
                    return this.bottomRight();

                case Display.BOTTOM_MIDDLE:
                    return this.bottomMiddle();

                case Display.BOTTOM_LEFT:
                    return this.bottomLeft();

                case Display.MIDDLE_RIGHT:
                    return this.middleRight();

                case Display.MIDDLE_MIDDLE:
                    return this.middleMiddle();

                case Display.MIDDLE_LEFT:
                    return this.middleLeft();

                case Display.TOP_MIDDLE:
                    return this.topMiddle();

                case Display.TOP_RIGHT:
                    return this.topRight();

                case Display.TOP_LEFT:
                    return this.topLeft();



            }
        }

    }