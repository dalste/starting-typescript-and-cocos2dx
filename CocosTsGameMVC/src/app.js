
var InitScene = cc.Scene.extend({
    _firstEntry:true,
    onEnter:function () {
        this._super();
        if(this._firstEntry)
        {
            this._firstEntry = false;
            CocosTSGame.start();
            //console.log(CocosTSGame);
            //cocostsgame.start();
        }

       /* var layer = new HelloWorldLayer();
        this.addChild(layer);*/
    }
});

