/**
 * Created by Sunio on 2017/3/15.
 */
function Circle(){
    createjs.Shape.call(this);

    this.setCircleType = function(type){
        this._circleType = type;
        switch (type){
            case Circle.TYPE_UNSELECTED:
                this.setColor("#AAAAAA");
                break;
            case Circle.TYPE_SELECTED:
                this.setColor("#CCCCCC");
                break;
            case Circle.TYPE_CAT:
                this.setColor("#0000ff");
                break;
        }
    };

    this.setColor = function (colorString) {
        this.graphics.beginFill(colorString);
        this.graphics.drawCircle(0,0,25);
        this.graphics.endFill();
    };

    //回调
    this.getCircleType=function(){
        return this._circleType;
    };

    this.setCircleType(1);
}

Circle.prototype = new createjs.Shape();

Circle.TYPE_UNSELECTED =1;
Circle.TYPE_SELECTED=2;
Circle.TYPE_CAT=3;