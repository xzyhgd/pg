/**
 * Created by Sunio on 2017/3/14.
 */
var stage =new createjs.Stage("gameView");

createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

var gameView = new createjs.Container();
gameView.x=30;
gameView.y=30;
stage.addChild(gameView);

var circleArr=[[],[],[],[],[],[],[],[],[]];
var currentCat ;
var MOVE_NONE=-1,MOVE_LEFT= 0,MOVE_UP_LEFT=1,MOVE_UP_RIGHT=2;MOVE_RIGHT=3;

function getMoveDir(cat){

    var distanceMap=[];
    var can = true;
    for (var x=cat.indexX;x>0;x--){
        if (circleArr[x][cat.indexxY].getCircleType()==Circle.TYPE_SELECTED){
            can=false;
            distanceMap[MOVE_LEFT]=cat.indexX-x;
            break;
        }
    }
    if(can){
        return MOVE_LEFT;
    }
    can =true;
    var x = cat.indexX,y=cat.indexxY;
    while (true){
        if(circleArr[x][y].getCircleType()==Circle.TYPE_SELECTED){
            can =false;
            distanceMap[MOVE_UP_LEFT]=cat.indexxY-y;
            break
        }
        if(can){
            return MOVE_UP_LEFT;
        }}
        can =true;
        var x = cat.indexX,y=cat.indexxY;
        while (true){
            if(circleArr[x][y].getCircleType()==Circle.TYPE_SELECTED){
                can =false;
                distanceMap[MOVE_UP_RIGHT]=cat.indexxY-y;
                break
            }
            if(can){
                return MOVE__UP_LEFT;
            }
    }  can =true;
        var x = cat.indexX,y=cat.indexxY;
        while (true) {
            if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
                can = false;
                distanceMap[MOVE_RIGHT] = cat.indexxY - y;
                break
            }
            if (can) {
                return MOVE_RIGHT;
            }
        }

}

function circleListen(event){
    if(event.target.getCircleType()!=Circle.TYPE_CAT){
        event.target.setCircleType(Circle.TYPE_SELECTED);
    }else {
        return;
    }

    if(currentCat.indexX==0||currentCat.indexX==8||currentCat.indexY==0||currentCat.indexY==8)
    {
        alert("游戏结束咯");
        return;
    }

    var dir = getMoveDir(currentCat);
    switch (dir){
        case MOVE_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexX-1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexX+1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat:indexX][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        default :alert("you");
    }


}



function addCircle(){
    for(var indexY=0;indexY<9;indexY++){
        for (var indexX=0;indexX<9;indexX++){
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY]=c;
            c.indexX=indexX;
            c.indexxY=indexY;

            c.x=indexY%2?indexX*55+25:indexX*55;
            c.y=indexY*55;

            if (indexX==4&&indexY==4){
                c.setCircleType(3);
                currentCat = c;
            }
            //添加一个监听事件  点击圆变色
            c.addEventListener("click",circleListen)
        }
    }
}
addCircle();
