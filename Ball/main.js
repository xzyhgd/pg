var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// 随机数

function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

// 球的属性

function Ball() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.velX = random(-7,7);
    this.velY = random(-7,7);
    this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
    this.size = random(10,20);
}

// 创作球的方法

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

// 定义球更新方法

Ball.prototype.update = function() {
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

// 定义球碰撞检测


Ball.prototype.collisionDetect = function() {
    for(j = 0; j < balls.length; j++) {
        if(!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
            }
        }
    }
};

// 球的数组

var balls = [];

// 定义循环

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);

    while(balls.length < 25) {
        var ball = new Ball();
        balls.push(ball);
    }

    for(i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    //
    requestAnimationFrame(loop);
}



loop();