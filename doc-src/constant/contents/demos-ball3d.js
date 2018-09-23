module.exports = `
        <section class="demo-box">
            <div class="code-2-demo bg-demo">400行代码仿微信《弹一弹》小游戏3D版</div>
            <code>
                <head>
                    <script src="./lib/easycanvas/plugin.physics.standalone.prod.js"></script>
                    <script src="./lib/easycanvas/plugin.webgl.standalone.prod.js"></script>
                    <style>
                        body, html {
                            margin: 0;
                            text-align: center;
                            background: black;
                            overflow: hidden;
                        }
                        canvas {
                            border: 1px solid grey;
                            height: 100%;
                            max-width: 100%;
                            background-color: #222;
                            background-image: url(https://c-zhuo.github.io/tanyitan/bg.jpg);
                            background-size: auto 100%;
                            background-position: 50% 50%;
                        }
                    </style>
                </head>
                <body>
                    <canvas id="app"></canvas>
                </body>

                <script>
                    var width = 400, height = 600, ballSize = 20;
                    // 记录鼠标轨迹
                    var mouse = {x: 300, y: 50};
                    var mouseRecord = function ($e) {
                        mouse.x = $e.canvasX;
                        mouse.y = Math.max(30, $e.canvasY);
                    };
                    // 游戏状态
                    var canShoot = true;
                    var score = 0, ballLeft = 0, ballCount = 5;
                    var blockArray = [];
                    var $app = new Easycanvas.painter();
                    // 图片
                    var BALL = 'https://raw.githubusercontent.com/c-zhuo/tanyitan/master/docs/ball.png';
                    var BLOCK = 'https://raw.githubusercontent.com/c-zhuo/tanyitan/master/docs/block.jpg';
                    var TRIANGLE = 'https://raw.githubusercontent.com/c-zhuo/tanyitan/master/docs/triangle.png';
                    // 用于碰撞检测
                    var BALL_TYPE = 1, BLOCK_TYPE = 2, BORDER_TYPE = 3, BOTTOM_TYPE = 4, BONUS_TYPE = 5;
                    // 初始化easycanvas实例
                    $app.register(document.getElementById('app'), {
                        webgl: {
                            fudgeFactor: 1,
                        },
                        width: width,
                        height: height,
                        events: {
                            mousemove: mouseRecord,
                            touchmove: mouseRecord,
                            mouseup: shoot,
                            touchend: shoot,
                        }
                    });
                    var BLOCK3D = $app.imgLoader('https://c-zhuo.github.io/tanyitan/stone.jpg');
                    var BALL3D = $app.imgLoader('https://c-zhuo.github.io/tanyitan/star.jpg');
                    $app.start();
                    $app.add({
                        name: '得分',
                        content: {
                            text: function () {
                                return '得分:' + score;
                            }
                        },
                        style: {
                            tx: 5, ty: 15, zIndex: 99,
                            textAlign: 'left', textVerticalAlign: 'top',
                            color: 'white'
                        }
                    });
                    $app.add({
                        name: '小球个数',
                        content: {
                            text: function () {
                                return '小球个数:' + ballCount;
                            }
                        },
                        style: {
                            tx: 5, ty: 35, zIndex: 99,
                            textAlign: 'left', textVerticalAlign: 'top',
                            color: 'white'
                        }
                    });
                    // 初始化easycanvas物理引擎
                    var $space = new Easycanvas.class.sprite({
                        name: '物理空间',
                        physics: {
                            gravity: 2,
                            accuracy: 2,
                        },
                    });
                    $app.add($space);
                    $space.launch();
                    // 显示瞄准轨迹
                    var startAim = function () {
                        for (var i = 0; i < 7; i ++) {
                            $app.add({
                                name: '瞄准小球',
                                content: {
                                    // img: BALL,
                                },
                                data: {
                                    gap: i / 6,
                                },
                                webgl: window.Easycanvas.webglShapes.ball({
                                    r: ballSize / 2,
                                    rx: function () {
                                        return mouse.x;
                                    },
                                    ry: function () {
                                        return mouse.x;
                                    },
                                    rz: function () {
                                        return mouse.y;
                                    },
                                    img: BALL3D,
                                }),
                                style: {
                                    tx: function () {
                                        return 200 + (mouse.x - 200) * this.data.gap;
                                    },
                                    ty: function () {
                                        return 20 + (mouse.y - 20) * this.data.gap;
                                    },
                                    tw: 20, th: 20,
                                    opacity: 0.4,
                                },
                                hooks: {
                                    shoot: function () {
                                        this.remove();
                                    }
                                }
                            });
                        }
                    };
                    startAim();
                    function shoot () {
                        if (!canShoot) return;
                        $app.broadcast('shoot');
                        canShoot = false;
                        // 防止过程中鼠标移动引起多个小球方向不同
                        var currentMouse = JSON.parse(JSON.stringify(mouse));
                        // 防止过程中增加了小球数量
                        var currentBallCount = ballCount;
                        for (var i = 0; i < currentBallCount; i++) {
                            setTimeout(function () {
                                addBall(currentMouse);
                            }, i * 100);
                        }
                        mouse = {x: 300, y: 50};
                    };
                    function addBall (mouse) {
                        ballLeft++;
                        var $ball = new Easycanvas.class.sprite({
                            name: '物理小球',
                            content: {
                                // img: BALL,
                            },
                            physics: {
                                shape: [
                                    // 形状是一个以(ballSize / 2, ballSize / 2)为圆心的，半径也是ballSize / 2的圆
                                    [ballSize / 2, ballSize / 2, ballSize / 2],
                                ],
                                mass: 1, // 质量
                                friction: 0.2, // 摩擦（摩擦太大了会损失能量）
                                elasticity: 0.8, // 弹性
                                collisionType: BALL_TYPE,
                            },
                            style: {
                                tw: ballSize, th: ballSize,
                                sx: 0, sy: 0,
                                tx: 200,
                                ty: 20,
                                zIndex: 1,
                            },
                            webgl: window.Easycanvas.webglShapes.ball({
                                r: ballSize / 2,
                                rx: function () {
                                    return -this.style.rotate / 3;
                                },
                                ry: function () {
                                    return -this.style.rotate;
                                },
                                rz: function () {
                                    return -this.style.rotate / 2;
                                },
                                img: BALL3D,
                            }),
                            hooks: {
                                physicsCollisionBegin: function ($other, collisionType) {
                                    switch (collisionType) {
                                        case BALL_TYPE:
                                            return true;
                                        case BOTTOM_TYPE:
                                            var ball = this;
                                            var block = $other;
                                            if (ball.toRemove) {
                                                return;
                                            }
                                            ball.toRemove = true;
                                            ball.style.opacity = Easycanvas.transition.linear(1, 0, 500);
                                            setTimeout(function () {
                                                ball.physicsOff();
                                                ball.remove();
                                                ballLeft--;
                                                if (ballLeft === 0) {
                                                    canShoot = true;
                                                    blockArray.forEach(function (block) {
                                                        block.physicsOff();
                                                        if (block.style.ty < 100) {
                                                            if (block.name === '物理方块') {
                                                                canShoot = false;
                                                            } else {
                                                                if (block.$canvas) {
                                                                    block.remove();
                                                                }
                                                            }
                                                        } else {
                                                            setTimeout(function () {
                                                                block.style.ty = block.style.ty();
                                                                block.physicsOn();
                                                            }, 300)
                                                        }
                                                        block.style.ty = Easycanvas.transition.linear(block.style.ty, block.style.ty - 50, 100 + Math.random() * 200);
                                                    });
                                                    if (!canShoot) {
                                                        alert('You lose');
                                                    } else {
                                                        setTimeout(startAim, 300);
                                                        addBlock(5 + score / 10, true);
                                                        Math.random() < 0.5 && addBlock(5 + score / 10, true);
                                                        Math.random() < 0.3 && addBlock(5 + score / 9, true);
                                                        Math.random() < 0.2 && addBlock(5 + score / 8, true);
                                                        Math.random() < 0.3 && addBonus();
                                                        Math.random() < 0.3 && addBonus();
                                                    }
                                                }
                                            }, 500);
                                            return;
                                    }
                                },
                                physicsCollisionPreSolve: function ($other, collisionType) {
                                    switch (collisionType) {
                                        case BLOCK_TYPE:
                                            if (Math.abs(this.physicsGetVelocity().y) < 1) {
                                                // 防止小球停到方块上
                                                this.physicsSetVelocity({
                                                    x: Math.random() * 10 - 5,
                                                    y: -300,
                                                });
                                            }
                                            return;
                                    }
                                },
                                physicsCollisionSeparate: function ($other, collisionType) {
                                    // 撞过一次就重置作用力（这样只剩下重力了，就开始往下掉）
                                    this.physicsResetForces();
                                    switch (collisionType) {
                                        case BLOCK_TYPE:
                                            var block = $other;
                                            // 碰撞效果
                                            var deltaXScale = Math.random() * 0.6 - 0.3;
                                            block.webgl.scaleX = Easycanvas.transition.pendulum(1 + deltaXScale, 1, 300);
                                            block.webgl.scaleY = Easycanvas.transition.pendulum(1 - deltaXScale, 1, 300);
                                            block.webgl.scaleZ = Easycanvas.transition.pendulum(1.3, 1, 300);
                                            block.webgl.rx = Easycanvas.transition.pendulum(30 + deltaXScale * 50, 20, 300);
                                            // 这里直接通过父对象从子对象拿数据，这种数据的依赖方式不好，但是这么简单个应用，无所谓了
                                            // 更好的是例如通过easycanvas的自定义事件广播下去
                                            block.children[0].content.text--;
                                            score++;
                                            if (!block.children[0].content.text) {
                                                // 把方块撞成0了，先隐藏
                                                block.physicsOff();
                                                block.children[0].style.visible = false;
                                                blockArray.splice(blockArray.indexOf(block), 1);
                                                block.webgl.ty = Easycanvas.transition.linear(this.style.ty + 20, height / 2, Math.random() * 200 + 1000);
                                                block.webgl.tz = Easycanvas.transition.linear(0, 10100, Math.random() * 400 + 200);
                                                block.webgl.rx = Easycanvas.transition.linear(0, 360, 600);
                                                setTimeout(function () {
                                                    block.remove();
                                                }, 600);
                                            }
                                            return;
                                        case BONUS_TYPE:
                                            var bonus = $other;
                                            // 一个球被连续撞，只加一次
                                            if (bonus.used) return false;
                                            bonus.used = 1;
                                            bonus.physicsOff();
                                            bonus.remove();
                                            blockArray.splice(blockArray.indexOf(bonus), 1);
                                            ballCount++;
                                            return;
                                    }
                                }
                            }
                        });
                        $space.add($ball);
                        $ball.physicsOn();
                        // 抵消重力
                        $ball.physicsApplyForce({x: 0, y: -1000}, {x: 0, y: 0});
                        // 初速度
                        var speed = {
                            x: (mouse.x - 200) / (mouse.y - 20),
                            y: 1
                        };
                        // 修正速度，确保从各个角度射出小球的速度差不多
                        var muti = Math.sqrt(Math.pow(speed.x, 2) + Math.pow(speed.y, 2)) / 700;
                        $ball.physicsSetVelocity({
                            x: speed.x / muti,
                            y: speed.y / muti,
                        });
                    }
                    // 防止方块重叠，记录上一次方块的X坐标
                    var lastBlockPositionX = 50;
                    var transitionTime = 500;
                    function addBlock (max, boolAddToBottom) {
                        var deg = Math.floor(Math.random() * 360);
                        var tx = lastBlockPositionX + Math.floor(Math.random() * 20 - 10);
                        var ty = boolAddToBottom ? 500 : height - 100 - Math.floor(Math.random() * 100);
                        var sprite = $space.add(new Easycanvas.class.sprite({
                            name: '物理方块',
                            content: {
                                // img: BLOCK,
                            },
                            physics: {
                                shape: [
                                    [[0, 0], [30, 0], [30, 30], [0, 30], [0, 0]],
                                ],
                                mass: 1,
                                friction: 0.1,
                                elasticity: 0.9,
                                collisionType: BLOCK_TYPE,
                                static: true,
                            },
                            style: {
                                tw: 30, th: 30,
                                tx: tx, ty: ty,
                                locate: 'lt',
                                zIndex: Math.random(),
                                rotate: deg,
                            },
                            children: [{
                                name: '次数',
                                content: {
                                    text: Math.floor(Math.random() * max) + 1,
                                },
                                style: {
                                    visible: false,
                                    color: 'yellow',
                                    textAlign: 'center',
                                    textVerticalAlign: 'middle',
                                    textFont: '16px Arial',
                                    tx: 15, ty: 15,
                                    zIndex: 2,
                                }
                            }],
                            webgl: window.Easycanvas.webglShapes.block({
                                a: 30, b: 30, c: 30,
                                rz: -deg,
                                rx: Easycanvas.transition.linear(Math.random() * 1000, 20, Math.random() * 200 + transitionTime),
                                ry: Easycanvas.transition.linear(Math.random() * 1000, 20, Math.random() * 200 + transitionTime),
                                tx: tx + 20,
                                ty: Easycanvas.transition.linear(Math.random() * 300, ty + 10, Math.random() * 200 + transitionTime),
                                tz: Easycanvas.transition.linear(-10000, 0, Math.random() * 200 + transitionTime),
                                img: BLOCK3D,
                                // colors: [255,255,100,10],
                            }),
                        }));
                        setTimeout(function () {
                            sprite.children[0].style.visible = true;
                            sprite.webgl.ty = function () {
                                return sprite.getStyle('ty') + 10;
                            };
                        }, transitionTime + 200);
                        sprite.physicsOn();
                        blockArray.push(sprite);
                        lastBlockPositionX += 50;
                        if (lastBlockPositionX > 350) {
                            lastBlockPositionX = 50;
                        }
                    }
                    function addBonus () {
                        var sprite = $space.add(new Easycanvas.class.sprite({
                            name: '奖励小球',
                            content: {
                                // img: BALL,
                            },
                            physics: {
                                shape: [
                                    [ballSize / 2, ballSize / 2, ballSize / 2],
                                ],
                                mass: 1,
                                friction: 0.1,
                                elasticity: 0.5,
                                collisionType: BONUS_TYPE,
                                static: true,
                            },
                            webgl: window.Easycanvas.webglShapes.ball({
                                r: ballSize / 1.5,
                                rz: Easycanvas.transition.linear(0, 360, 1800).loop(),
                                ry: Easycanvas.transition.linear(0, 360, 2800).loop(),
                                rz: Easycanvas.transition.linear(0, 360, 3800).loop(),
                                img: BALL3D,
                            }),
                            style: {
                                tw: 30, th: 30,
                                tx: lastBlockPositionX + Math.floor(Math.random() * 20 - 10),
                                ty: 500,
                                locate: 'center',
                                zIndex: 2,
                                fv: Easycanvas.transition.pendulum(0, 0.2, 200).loop(),
                                fh: Easycanvas.transition.pendulum(0.2, 0, 200).loop(),
                            },
                        }));
                        sprite.physicsOn();
                        blockArray.push(sprite);
                        lastBlockPositionX += 50;
                        if (lastBlockPositionX > 350) {
                            lastBlockPositionX = 50;
                        }
                    }
                    // 上半部分的边，摩擦小、弹性大
                    var borderSprite = $space.add(new Easycanvas.class.sprite({
                        name: '边界1',
                        physics: {
                            shape: [
                                [[0, 0], [width, 0]],
                                [[0, 0], [0, height * 0.9]],
                                [[width, 0], [width, height * 0.9]],
                            ],
                            friction: 0.1,
                            elasticity: 0.8,
                            collisionType: BORDER_TYPE,
                            static: true
                        },
                        style: {
                            tx: 0, ty: 0, tw: width, th: height,
                            locate: 'lt',
                        },
                    }));
                    borderSprite.physicsOn();
                    // 下半部分的边，摩擦大、弹性小
                    var bottomSprite = $space.add(new Easycanvas.class.sprite({
                        name: '边界2',
                        physics: {
                            shape: [
                                [[0, height], [width, height]],
                                [[0, height * 0.9], [0, height]],
                                [[width, height * 0.9], [width, height]],
                            ],
                            friction: 5,
                            elasticity: 0,
                            collisionType: BOTTOM_TYPE,
                            static: true
                        },
                        style: {
                            tx: 0, ty: 0, tw: width, th: height,
                            locate: 'lt',
                        },
                    }));
                    bottomSprite.physicsOn();
                    // 第一关7个方块
                    for (var i = 0; i < 7; i++) {
                        addBlock(5);
                    }
                    // 阻止微信浏览器的默认下拉
                    document.body.addEventListener('touchmove' , function (e) {
                        e.preventDefault();
                    });
                </script>
            </code>
        </section>
`;
