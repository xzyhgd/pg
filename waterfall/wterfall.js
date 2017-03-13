/**
 * Created by Sunio on 2017/3/14.
 */
$(function(){
    //计算列
    var oContainer= $('#container');
    var oLoader = $('#loader');
    var iWidth=200; //列宽
    var iSpace=10;  //间隔宽
    var iOuterWidth=iWidth+iSpace; //列实际宽
    var iCells =0;  //总列
    var iPage=0;
    var iBtn=true;

    //调用wookmark网站的JSON
    var iUrl = 'http://wookmark.com/api/json/popular?callback=?';

    //存储列的宽
    var arrL = [];
    //存储列的高
    var arrT = [];

    function setCells(){
        iCells=Math.floor(window.innerWidth/iOuterWidth);
        oContainer.css('width',iOuterWidth*iCells-iSpace);
    }
    setCells();

    for (var i=0;i<iCells;i++){
        arrT.push(0);
        arrL.push(i*iOuterWidth);
    }

    function getData(){
        if (iBtn){
            iBtn=false;
            oLoader.show();
            $.getJSON(iUrl,'page='+iPage,function(data){
                $.each(data,function(index,obj){
                    var oImg =$('<img>');

                    oImg.attr('src',obj.preview);

                    oContainer.append(oImg);

                    var iHeight = iWidth/obj.width*obj.height;

                    oImg.css({
                        width:iWidth,
                        height:iHeight
                    });

                    //获取arrT最小值所在位置
                    var iMinIndex = getMin();

                    //设置定位
                    oImg.css({
                        left  :  arrL[iMinIndex],
                        top   :  arrT[iMinIndex]
                    });
                    arrT[iMinIndex]+=iHeight +10;

                    oLoader.hide();

                });


            });
            iBtn=true;}
    }
    getData();
    $(window).scroll(function(){

        var iH = $(window).scrollTop() + window.innerHeight;
        console.log(iH);
        var iMinIndex = getMin();

        if (
            arrT[iMinIndex]+oContainer.offset().top<iH
        ){
            iPage++;
            getData();
        }


    });

    function getMin(){
        var iv = arrT[0];
        var _index =0;

        for (var i=1;i<arrT.length;i++){
            if(arrT[i]<iv){
                iv=arrT[i];
                _index=i;
            }
        }
        return _index;
    }

});
