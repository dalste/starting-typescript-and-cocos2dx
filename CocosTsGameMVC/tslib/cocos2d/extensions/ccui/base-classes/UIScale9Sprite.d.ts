/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2012 Neofect. All rights reserved.
 Copyright (c) 2016 zilongshanren. All rights reserved.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Created by Jung Sang-Taik on 2012-03-16
 ****************************************************************************/

/**
 * <p>
 * A 9-slice sprite for cocos2d UI.                                                                    <br/>
 *                                                                                                     <br/>
 * 9-slice scaling allows you to specify how scaling is applied                                        <br/>
 * to specific areas of a sprite. With 9-slice scaling (3x3 grid),                                     <br/>
 * you can ensure that the sprite does not become distorted when                                       <br/>
 * scaled.                                                                                             <br/>
 * @see http://yannickloriot.com/library/ios/cccontrolextension/Classes/CCScale9Sprite.html            <br/>
 * </p>
 * @class
 * @extends cc.Node
 *
 * @property {cc.Size}  preferredSize   - The preferred size of the 9-slice sprite
 * @property {cc.Rect}  capInsets       - The cap insets of the 9-slice sprite
 * @property {Number}   insetLeft       - The left inset of the 9-slice sprite
 * @property {Number}   insetTop        - The top inset of the 9-slice sprite
 * @property {Number}   insetRight      - The right inset of the 9-slice sprite
 * @property {Number}   insetBottom     - The bottom inset of the 9-slice sprite
 */
declare namespace ccui{
 export class Scale9Sprite extends cc.Node/** @lends ccui.Scale9Sprite# */{
  

    /**
     * Constructor function.
     * @function
     * @param {string|cc.SpriteFrame} file file name of texture or a SpriteFrame
     * @param {cc.Rect} rectOrCapInsets
     * @param {cc.Rect} capInsets
     * @returns {Scale9Sprite}
     */
    ctor (file:string |cc.SpriteFrame, rectOrCapInsets:cc.Rect, capInsets:cc.Rect):Scale9Sprite;
    getCapInsets ():cc.Rect;

    protected _asyncSetCapInsets ():void;

    setCapInsets (capInsets:cc.Rect):void;

    protected _updateCapInsets (rect:cc.Rect, capInsets:cc.Rect):void;
        
    initWithFile (file, rect:cc.Rect, capInsets:cc.Rect);

    updateWithBatchNode (batchNode, originalRect, rotated, capInsets) {
        if (!batchNode) {
            return false;
        }

        var texture = batchNode.getTexture();
        this._loader.clear();
        if (!texture.isLoaded()) {
            this._loader.once(texture, function () {
                this.updateWithBatchNode(batchNode, originalRect, rotated, capInsets);
                this.dispatchEvent("load");
            }, this);
            return false;
        }

        this.setTexture(texture, originalRect);
        this._updateCapInsets(originalRect, capInsets);

        return true;
    },


    /**
     * Initializes a 9-slice sprite with an sprite frame
     * @param spriteFrameOrSFName The sprite frame object.
     */
    initWithSpriteFrame (spriteFrame, capInsets) {
        this.setSpriteFrame(spriteFrame);

        capInsets = capInsets || cc.rect(0, 0, 0, 0);

        this._updateCapInsets(spriteFrame._rect, capInsets);
    },

    initWithSpriteFrameName (spriteFrameName, capInsets) {
        if(!spriteFrameName)
            throw new Error("ccui.Scale9Sprite.initWithSpriteFrameName(): spriteFrameName should be non-null");
        capInsets = capInsets || cc.rect(0, 0, 0, 0);

        var frame = cc.spriteFrameCache.getSpriteFrame(spriteFrameName);
        if (frame == null) {
            cc.log("ccui.Scale9Sprite.initWithSpriteFrameName(): can't find the sprite frame by spriteFrameName");
            return false;
        }
        this.setSpriteFrame(frame);

        capInsets = capInsets || cc.rect(0, 0, 0, 0);

        this._updateCapInsets(frame._rect, capInsets);
    },

    loaded () {
        if (this._spriteFrame === null) {
            return false;
        } else {
            return this._spriteFrame.textureLoaded();
        }
    },

    /**
     * Change the texture file of 9 slice sprite
     *
     * @param textureOrTextureFile The name of the texture file.
     */
    setTexture (texture, rect) {
        var spriteFrame = new cc.SpriteFrame(texture, rect);
        this.setSpriteFrame(spriteFrame);
    },

    _updateBlendFunc () {
        // it's possible to have an untextured sprite
        var blendFunc = this._blendFunc;
        if (!this._spriteFrame || !this._spriteFrame._texture.hasPremultipliedAlpha()) {
            if (blendFunc.src === cc.ONE && blendFunc.dst === cc.BLEND_DST) {
                blendFunc.src = cc.SRC_ALPHA;
            }
            this._opacityModifyRGB = false;
        } else {
            if (blendFunc.src === cc.SRC_ALPHA && blendFunc.dst === cc.BLEND_DST) {
                blendFunc.src = cc.ONE;
            }
            this._opacityModifyRGB = true;
        }
    },

    setOpacityModifyRGB (value) {
        if (this._opacityModifyRGB !== value) {
            this._opacityModifyRGB = value;
            this._renderCmd._setColorDirty();
        }
    },

    isOpacityModifyRGB () {
        return this._opacityModifyRGB;
    },

    /**
     * Change the sprite frame of 9 slice sprite
     *
     * @param spriteFrameOrSFFileName The name of the texture file.
     */
    setSpriteFrame (spriteFrame) {
        if (spriteFrame) {
            this._spriteFrame = spriteFrame;
            this._quadsDirty = true;
            this._uvsDirty = true;
            var self = this;
            var onResourceDataLoaded = function () {
                if (cc.sizeEqualToSize(self._contentSize, cc.size(0, 0))) {
                    self.setContentSize(self._spriteFrame._rect);
                }
                self._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
                cc.renderer.childrenOrderDirty = true;
            };
            if (spriteFrame.textureLoaded()) {
                onResourceDataLoaded();
            } else {
                this._loader.clear();
                this._loader.once(spriteFrame, function () {
                    onResourceDataLoaded();
                    this.dispatchEvent("load");
                }, this);
            }
        }
    },

    /**
     * Sets the source blending function.
     *
     * @param blendFunc A structure with source and destination factor to specify pixel arithmetic. e.g. {GL_ONE, GL_ONE}, {GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA}.
     */
    setBlendFunc (blendFunc, dst) {
        if (dst === undefined) {
            this._blendFunc.src = blendFunc.src || cc.BLEND_SRC;
            this._blendFunc.dst = blendFunc.dst || cc.BLEND_DST;
        }
        else {
            this._blendFunc.src = blendFunc || cc.BLEND_SRC;
            this._blendFunc.dst = dst || cc.BLEND_DST;
        }
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
    },

    /**
     * Returns the blending function that is currently being used.
     *
     * @return A BlendFunc structure with source and destination factor which specified pixel arithmetic.
     */
    getBlendFunc () {
        return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst);
    },

    setPreferredSize (preferredSize) {
        if (!preferredSize || cc.sizeEqualToSize(this._contentSize, preferredSize)) return;
        this.setContentSize(preferredSize);
    },

    getPreferredSize () {
        return this.getContentSize();
    },

    // overrides
    setContentSize (width, height) {
        if (height === undefined) {
            height = width.height;
            width = width.width;
        }
        if (width === this._contentSize.width && height === this._contentSize.height) {
            return;
        }

        cc.Node.prototype.setContentSize.call(this, width, height);
        this._quadsDirty = true;
    },

    getContentSize () {
        if(this._renderingType === ccui.Scale9Sprite.RenderingType.SIMPLE) {
            if(this._spriteFrame) {
                return this._spriteFrame._originalSize;
            }
            return cc.size(this._contentSize);
        } else {
            return cc.size(this._contentSize);
        }
    },

    _setWidth (value) {
        cc.Node.prototype._setWidth.call(this, value);
        this._quadsDirty = true;
    },

    _setHeight (value) {
        cc.Node.prototype._setHeight.call(this, value);
        this._quadsDirty = true;
    },

    /**
     * Change the state of 9-slice sprite.
     * @see `State`
     * @param state A enum value in State.
     */
    setState (state) {
        this._brightState = state;
        this._renderCmd.setState(state);
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
    },

    /**
     * Query the current bright state.
     * @return @see `State`
     */
    getState () {
        return this._brightState;
    },

    /**
     * change the rendering type, could be simple or slice
     * @return @see `RenderingType`
     */
    setRenderingType (type) {
        if (this._renderingType === type) return;

        this._renderingType = type;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the rendering type, could be simple or slice
     * @return @see `RenderingType`
     */
    getRenderingType () {
        return this._renderingType;
    },
    /**
     * change the left border of 9 slice sprite, it should be specified before trimmed.
     * @param insetLeft left border.
     */
    setInsetLeft (insetLeft) {
        this._insetLeft = insetLeft;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the left border of 9 slice sprite, the result is specified before trimmed.
     * @return left border.
     */
    getInsetLeft () {
        return this._insetLeft;
    },
    /**
     * change the top border of 9 slice sprite, it should be specified before trimmed.
     * @param insetTop top border.
     */
    setInsetTop (insetTop) {
        this._insetTop = insetTop;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
    },

    /**
     * get the top border of 9 slice sprite, the result is specified before trimmed.
     * @return top border.
     */
    getInsetTop () {
        return this._insetTop;
    },

    /**
     * change the right border of 9 slice sprite, it should be specified before trimmed.
     * @param insetRight right border.
     */
    setInsetRight (insetRight) {
        this._insetRight = insetRight;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
    },

    /**
     * get the right border of 9 slice sprite, the result is specified before trimmed.
     * @return right border.
     */
    getInsetRight () {
        return this._insetRight;
    },

    /**
     * change the bottom border of 9 slice sprite, it should be specified before trimmed.
     * @param insetBottom bottom border.
     */
    setInsetBottom (insetBottom) {
        this._insetBottom = insetBottom;
        this._quadsDirty = true;
        this._uvsDirty = true;
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.contentDirty);
    },
    /**
     * get the bottom border of 9 slice sprite, the result is specified before trimmed.
     * @return bottom border.
     */
    getInsetBottom () {
        return this._insetBottom;
    },

    _rebuildQuads () {
        if (!this._spriteFrame || !this._spriteFrame._textureLoaded) {
            return;
        }

        this._updateBlendFunc();

        this._isTriangle = false;
        switch (this._renderingType) {
          case RenderingType.SIMPLE:
              simpleQuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._isTrimmedContentSize);
              break;
          case RenderingType.SLICED:
              scale9QuadGenerator._rebuildQuads_base(this, this._spriteFrame, this._contentSize, this._insetLeft, this._insetRight, this._insetTop, this._insetBottom);
              break;
          default:
              this._quadsDirty = false;
              this._uvsDirty = false;
              cc.error('Can not generate quad');
              return;
        }


        this._quadsDirty = false;
        this._uvsDirty = false;
    },

    _createRenderCmd () {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS)
            return new ccui.Scale9Sprite.CanvasRenderCmd(this);
        else
            return new ccui.Scale9Sprite.WebGLRenderCmd(this);
    }
});

var _p = ccui.Scale9Sprite.prototype;
cc.EventHelper.prototype.apply(_p);

// Extended properties
/** @expose */
_p.preferredSize;
cc.defineGetterSetter(_p, "preferredSize", _p.getPreferredSize, _p.setPreferredSize);
/** @expose */
_p.capInsets;
cc.defineGetterSetter(_p, "capInsets", _p.getCapInsets, _p.setCapInsets);
/** @expose */
_p.insetLeft;
cc.defineGetterSetter(_p, "insetLeft", _p.getInsetLeft, _p.setInsetLeft);
/** @expose */
_p.insetTop;
cc.defineGetterSetter(_p, "insetTop", _p.getInsetTop, _p.setInsetTop);
/** @expose */
_p.insetRight;
cc.defineGetterSetter(_p, "insetRight", _p.getInsetRight, _p.setInsetRight);
/** @expose */
_p.insetBottom;
cc.defineGetterSetter(_p, "insetBottom", _p.getInsetBottom, _p.setInsetBottom);

_p = null;

/**
 * Creates a 9-slice sprite with a texture file, a delimitation zone and
 * with the specified cap insets.
 * @deprecated since v3.0, please use new ccui.Scale9Sprite(file, rect, capInsets) instead.
 * @param {String|cc.SpriteFrame} file file name of texture or a cc.Sprite object
 * @param {cc.Rect} rect the rect of the texture
 * @param {cc.Rect} capInsets the cap insets of ccui.Scale9Sprite
 * @returns {ccui.Scale9Sprite}
 */
ccui.Scale9Sprite.create = function (file, rect, capInsets) {
    return new ccui.Scale9Sprite(file, rect, capInsets);
};

/**
 * create a ccui.Scale9Sprite with Sprite frame.
 * @deprecated since v3.0, please use "new ccui.Scale9Sprite(spriteFrame, capInsets)" instead.
 * @param {cc.SpriteFrame} spriteFrame
 * @param {cc.Rect} capInsets
 * @returns {ccui.Scale9Sprite}
 */
ccui.Scale9Sprite.createWithSpriteFrame = function (spriteFrame, capInsets) {
    return new ccui.Scale9Sprite(spriteFrame, capInsets);
};

/**
 * create a ccui.Scale9Sprite with a Sprite frame name
 * @deprecated since v3.0, please use "new ccui.Scale9Sprite(spriteFrameName, capInsets)" instead.
 * @param {string} spriteFrameName
 * @param {cc.Rect} capInsets
 * @returns {Scale9Sprite}
 */
ccui.Scale9Sprite.createWithSpriteFrameName = function (spriteFrameName, capInsets) {
    return new ccui.Scale9Sprite(spriteFrameName, capInsets);
};

/**
 * @ignore
 */
ccui.Scale9Sprite.POSITIONS_CENTRE = 0;
ccui.Scale9Sprite.POSITIONS_TOP = 1;
ccui.Scale9Sprite.POSITIONS_LEFT = 2;
ccui.Scale9Sprite.POSITIONS_RIGHT = 3;
ccui.Scale9Sprite.POSITIONS_BOTTOM = 4;
ccui.Scale9Sprite.POSITIONS_TOPRIGHT = 5;
ccui.Scale9Sprite.POSITIONS_TOPLEFT = 6;
ccui.Scale9Sprite.POSITIONS_BOTTOMRIGHT = 7;

ccui.Scale9Sprite.state = {NORMAL: 0, GRAY: 1};

var RenderingType = ccui.Scale9Sprite.RenderingType = {
    /**
     * @property {Number} SIMPLE
     */
    SIMPLE: 0,
    /**
     * @property {Number} SLICED
     */
    SLICED: 1
};
})();
