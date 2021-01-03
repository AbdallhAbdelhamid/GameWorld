var PlayerScore = 0; //player score tracker
var PacmanStartPosition = 22; //pacman tart index in array

var PacmanPos = 22; //pacman index in array
var mapWidth = 21;
var noOflives = 3;

var homeLIndex= 135;
var homeRIndex= 137;
var homeMIndex= 136;
var gamePaused = false;
//ahmed
var timer2;

var movementDirection = {
    PacManStartMove: 0,
    moveRight: 1,
    moveLeft: 2,
    moveUp: 3,
    moveDown: 4,
};
// objects holds names for various grid objects. // just testing git
var gridObjects = {
    POWERUP: 0,
    WALL: 1,
    PACMAN: 2,
    COIN: 3,
    EMPTY: 4,
    BLINKY: 5,
    CLYDE: 6,
    INKY: 7,
    CHAIN: 8,
    HOMEL: 9,
    HOMER: 10,
    HOMEM: 11
};

var gridObjectsClass = [
    'powerup',
    'wall',
    'pacman',
    'coin',
    'empty',
    'blinkymob',
    'clydemob',
    'inkymob',
    'chain',
    'homel',
    'homer',
    'homem'
];


Object.freeze(gridObjects);

var keyboard = {
    ARROWUP: '38',
    ARROWDOWN: '40',
    ARROWLEFT: '37',
    ARROWRIGHT: '39',
}


//levelOneGrid variable is for drawing the map for level 1
//where numbers inside it are as follown: 1=wall object, 2=Pacman object, 3=coin object, 4=empty object
// check if it's better as 2d array or 1d array
// ghost // power up 
// grid is 21 x 16
var levelOneGrid = [  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                    , 1, 2, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 4, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 1, 1, 9, 11, 10, 1, 1, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1
                    , 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1
                    , 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1
                    , 1, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 1
                    , 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 1
                    , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

var InitialMap = levelOneGrid.slice();

// maps from 2d to 1d
function MapGrid2dTo1d(x, y) {
    // TODO:
    // RENAME the function
    return y * mapWidth + x;
}

// maps from 1d to 2d
function MapGrid1dTo2d(index) {
    //   return [index % 21, parseInt(index / 21)];
    return {
        xPos: index % mapWidth,
        yPos: parseInt(index / mapWidth)
    };
}



// the drawing function to draw the map
function drawGrid(gridArrIn) {
    // delete old grid from screen
    document.getElementById("Map").innerHTML = "";
    for (var i = 0; i < gridArrIn.length; i++) {
        // draw new grid
        if (gridArrIn[i] == gridObjects.WALL) document.getElementById("Map").innerHTML += "<div class='wall'></div>"
        else if (gridArrIn[i] == gridObjects.PACMAN) document.getElementById("Map").innerHTML += "<div class='pacman'></div>"
        else if (gridArrIn[i] == gridObjects.COIN) document.getElementById("Map").innerHTML += "<div class='coin'></div>"
        else if (gridArrIn[i] == gridObjects.EMPTY ||
            gridArrIn[i] == gridObjects.HOMEL ||
            gridArrIn[i] == gridObjects.HOMER ||
            gridArrIn[i] == gridObjects.HOMEM) document.getElementById("Map").innerHTML += "<div class='empty'></div>"

        else if (gridArrIn[i] == gridObjects.BLINKY) document.getElementById("Map").innerHTML += "<div class='blinkymob'></div>"
        else if (gridArrIn[i] == gridObjects.CLYDE) document.getElementById("Map").innerHTML += "<div class='clydemob'></div>"
        else if (gridArrIn[i] == gridObjects.INKY) document.getElementById("Map").innerHTML += "<div class='inkymob'></div>"
        else if (gridArrIn[i] == gridObjects.CHAIN) document.getElementById("Map").innerHTML += "<div class='chain'></div>"
    }
}


function drawLives(LIVES) {
    document.getElementById("life").innerHTML = "";
    for (var i = 0; i < LIVES; i++) {
        document.getElementById("life").innerHTML += "<div class='livediv'></div>"
    }

}
drawLives(noOflives);

function PacmanLoseLife() {
    var _BlinkyIndex = MapGrid2dTo1d(blinky.position.x, blinky.position.y);
    var _CLYDEIndex = MapGrid2dTo1d(clyde.position.x, clyde.position.y);
    var _INKYIndex = MapGrid2dTo1d(inky.position.x, inky.position.y);

    if (((PacmanPos == _BlinkyIndex) || (PacmanPos == _CLYDEIndex) || (PacmanPos == _INKYIndex)) && (noOflives >= 0)) {
        {
            noOflives--;
            gamePaused = true;
            
                
            levelOneGrid[_BlinkyIndex] = blinky.lastGridObject;
            levelOneGrid[_CLYDEIndex] = blinky.lastGridObject;
            levelOneGrid[_INKYIndex] = blinky.lastGridObject;
            levelOneGrid[MapGrid2dTo1d(10, 5)] = gridObjects.EMPTY;


        }
        if (noOflives >= 0) {
            ResetPacman()
            drawLives(noOflives)
        } else if (noOflives == -1) GameOver();
    }
}

function ResetPacman() { ////////not finished yet
    clearInterval(timer2);
    PacmanPos = PacmanStartPosition;
    levelOneGrid[PacmanPos] = gridObjects.PACMAN;
    clearTimeout(pacmanObj.timer);
    pacmanObj.lastDirection = 0;
    setTimeout(function () {
        $("div").eq(PacmanStartPosition + 1).removeClass().css({
            'transform': 'rotate(0deg)'
        }).addClass('pacman')
        StartGame();
    }, 2000);

}

function ScoringTracker() {
    document.getElementById("score").innerHTML = "Score: " + PlayerScore;
    // if (PlayerScore ==158) { setInterval(GameWon,10); }
    if (PlayerScore == 153) {
        GameWon();
    } //158
}

function GameWon() {
    gamePaused = true;
    clearInterval(timer2);
    clearTimeout(pacmanObj.timer);
    $("#gamewon").show();
    $("#gameover").hide();
    $("#option").hide();
    $(".gamewonClass").animate({
        fontSize: "22pt"
    }, 1000, function () {
        $(".gamewonClass").animate({
            fontSize: "30pt"
        }, 1000).effect("fade");
        GameWon();
    }).effect("fade")

};

function GameOver() { ////////not finished yet
    gamePaused = true;
    clearInterval(timer2);

    $("#gamewon").hide();
    $("#gameover").show();
    $("#option").hide();
    $(".gameoverClass").animate({
        fontSize: "22pt"
    }, 1000, function () {
        $(".gameoverClass").animate({
            fontSize: "30pt"
        }, 1000).effect("fade");
        GameOver();
    }).effect("fade");
};
$("#gamewon").hide();
$("#gameover").hide();

//*****************************************************class pacman*******************************************************************

var PacmanClass = function () {
    this.lastDirection = 0; //1= last direction was right, 2= last direction was left, 3= last direction was up, , 4= last direction was down
    this.timer;
}

function checkKey(e) {
    e = window.event;

    if ((e.keyCode == keyboard.ARROWUP) && (pacmanObj.lastDirection != movementDirection.moveUp) && !gamePaused) //key up
    {
        pacmanObj.PacmanMovementCheck(e)
    } else if ((e.keyCode == keyboard.ARROWDOWN) && (pacmanObj.lastDirection != movementDirection.moveDown) && !gamePaused) //key down
    {
        pacmanObj.PacmanMovementCheck(e)
    } else if ((e.keyCode == keyboard.ARROWLEFT) && (pacmanObj.lastDirection != movementDirection.moveLeft) && !gamePaused) //key left  
    {
        pacmanObj.PacmanMovementCheck(e)
    } else if ((e.keyCode == keyboard.ARROWRIGHT) && (pacmanObj.lastDirection != movementDirection.moveRight) && !gamePaused) //key right 
    {
        pacmanObj.PacmanMovementCheck(e)
    }
}

// TO DO : add enums for directions // 


//function for pacman right movement
//function to check pacman movements
/*function CheckPacmanNextPostion() {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    if (levelOneGrid[PacmanPos + 1] == 3) PacmanPos++
}*/



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This function is to make sure that pacman cannot change direction if the requested direction has a wall
PacmanClass.prototype.PacmanMovementCheck = function (e) {
    //1= last direction was right, 2= last direction was left, 3= last direction was up, , 4= last direction was down
    if ((e.keyCode == keyboard.ARROWUP)) //key up
    {
        if (pacmanObj.lastDirection == movementDirection.PacManStartMove) { //if pacman position is changed in another map
            pacmanObj.lastDirection = movementDirection.moveUp;
            pacmanObj.timer = setTimeout(pacmanObj.MoveUp2, 250)
        } else if (levelOneGrid[PacmanPos - mapWidth] != gridObjects.WALL) {
            pacmanObj.lastDirection = movementDirection.moveUp;
            clearTimeout(pacmanObj.timer);
            pacmanObj.timer = setTimeout(pacmanObj.MoveUp2, 10)
        } //else CallTheLastAction();

    } else if ((e.keyCode == keyboard.ARROWDOWN)) //key down
    {
        if (pacmanObj.lastDirection == movementDirection.PacManStartMove) {
            pacmanObj.lastDirection = movementDirection.moveDown;
            pacmanObj.timer = setTimeout(pacmanObj.MoveDown2, 250)
        } else if ((levelOneGrid[PacmanPos + mapWidth] == gridObjects.COIN) || (levelOneGrid[PacmanPos + mapWidth] == gridObjects.EMPTY)) {
            pacmanObj.lastDirection = movementDirection.moveDown;
            clearTimeout(pacmanObj.timer);
            pacmanObj.timer = setTimeout(pacmanObj.MoveDown2, 10)
        } //else CallTheLastAction();

    } else if ((e.keyCode == keyboard.ARROWLEFT)) //key left  
    {
        if (pacmanObj.lastDirection == movementDirection.PacManStartMove) {
            pacmanObj.lastDirection = movementDirection.moveLeft;
            pacmanObj.timer = setTimeout(pacmanObj.MoveLeft2, 250)
        } else if (levelOneGrid[PacmanPos - 1] != gridObjects.WALL) {
            pacmanObj.lastDirection = movementDirection.moveLeft;
            clearTimeout(pacmanObj.timer);
            pacmanObj.timer = setTimeout(pacmanObj.MoveLeft2, 10)
        } //else CallTheLastAction();

    } else if ((e.keyCode == keyboard.ARROWRIGHT)) //key right // 1 : last direction was right
    {
        if (pacmanObj.lastDirection == movementDirection.PacManStartMove) {
            pacmanObj.lastDirection = movementDirection.moveRight;
            pacmanObj.timer = setTimeout(pacmanObj.MoveRight2, 250)
        } else if (levelOneGrid[PacmanPos + 1] != gridObjects.WALL) {
            pacmanObj.lastDirection = movementDirection.moveRight;

            clearTimeout(pacmanObj.timer);
            pacmanObj.timer = setTimeout(pacmanObj.MoveRight2, 10)
        } //else CallTheLastAction();
    }
}



PacmanClass.prototype.MoveRight2 = function () {
    // TODO: function get next move for pac-man
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _NextPos = levelOneGrid[PacmanPos + 1]
    if (_NextPos == gridObjects.WALL) {
        //$(".pacman").css('background-image', "url('./pic/new2.png')")
        return 0;
    } else if (_NextPos == gridObjects.COIN) {
        PlayerScore++; //increase score
        ScoringTracker(); //call score function
        levelOneGrid[PacmanPos++] = gridObjects.EMPTY; //replace to empty
        levelOneGrid[PacmanPos] = gridObjects.PACMAN;
        $(".pacman").next().removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(0deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_NextPos == gridObjects.EMPTY) {
        levelOneGrid[PacmanPos++] = gridObjects.EMPTY;
        levelOneGrid[PacmanPos] = gridObjects.PACMAN;
        $(".pacman").next().removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(0deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    pacmanObj.timer = setTimeout(pacmanObj.MoveRight2, 250)
}

PacmanClass.prototype.MoveLeft2 = function () {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _PrevPos = levelOneGrid[PacmanPos - 1]
    if (_PrevPos == gridObjects.WALL) {
        //$(".pacman").css('background-image', "url('./pic/new2.png')")
        return 0;
    } else if (_PrevPos == gridObjects.COIN) {
        PlayerScore++; //increase score
        ScoringTracker(); //call score function
        levelOneGrid[PacmanPos--] = gridObjects.EMPTY; //replace to empty
        levelOneGrid[PacmanPos] = gridObjects.PACMAN;
        $(".pacman").prev().removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(180deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_PrevPos == gridObjects.EMPTY) {
        levelOneGrid[PacmanPos--] = gridObjects.EMPTY;
        levelOneGrid[PacmanPos] = gridObjects.PACMAN;
        $(".pacman").prev().removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(180deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    pacmanObj.timer = setTimeout(pacmanObj.MoveLeft2, 250)
}

PacmanClass.prototype.MoveDown2 = function () {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _NextDownPos = levelOneGrid[PacmanPos + mapWidth]
    if ((_NextDownPos == gridObjects.WALL) || (_NextDownPos == gridObjects.CHAIN)) {
        //$(".pacman").css('background-image', "url('./pic/new2.png')")
        return 0;
    } else if (_NextDownPos == gridObjects.COIN) {
        PlayerScore++; //increase score
        ScoringTracker(); //call score function
        levelOneGrid[PacmanPos] = gridObjects.EMPTY; //replace to empty
        levelOneGrid[PacmanPos + mapWidth] = gridObjects.PACMAN;
        PacmanPos += mapWidth;
        $("div").eq(1 + PacmanPos).removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(90deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_NextDownPos == gridObjects.EMPTY) {
        levelOneGrid[PacmanPos] = gridObjects.EMPTY;
        levelOneGrid[PacmanPos + mapWidth] = gridObjects.PACMAN;
        PacmanPos += mapWidth;
        $("div").eq(1 + PacmanPos).removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(90deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    pacmanObj.timer = setTimeout(pacmanObj.MoveDown2, 250)
}

PacmanClass.prototype.MoveUp2 = function () {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _NextUpPos = levelOneGrid[PacmanPos - mapWidth]
    if (_NextUpPos == gridObjects.WALL) {
        //$(".pacman").css('background-image', "url('./pic/new2.png')")
        return 0;
    } else if (_NextUpPos == gridObjects.COIN) {
        PlayerScore++; //increase score
        ScoringTracker(); //call score function
        levelOneGrid[PacmanPos] = gridObjects.EMPTY; //replace to empty
        levelOneGrid[PacmanPos - mapWidth] = gridObjects.PACMAN;
        PacmanPos -= mapWidth;
        $("div").eq(PacmanPos + 1).removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(-90deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_NextUpPos == gridObjects.EMPTY) {
        levelOneGrid[PacmanPos] = gridObjects.EMPTY; //replace to empty
        levelOneGrid[PacmanPos - mapWidth] = gridObjects.PACMAN;
        PacmanPos -= mapWidth;
        $("div").eq(PacmanPos + 1).removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(-90deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').addClass('empty');
        //$(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    pacmanObj.timer = setTimeout(pacmanObj.MoveUp2, 250)
}


var audio = new Audio('./Audio/12.wav'); //stop ez3ag
// onload=function(){

// audio.play();
// }

$('#play').click(function () {
    audio.play();


});
$('#pause').click(function () {

    audio.pause();
});

/*********************************  Monster Class  ***************************************************/
// enum to save directions
var direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

var mobMode = { // defines monsters hehaviur
    ATTACK: 0,
    SCATTER: 1,
    AFRAID: 2
}

Object.freeze(direction);

// monster class
function Monster(destinationXIn, destinationYIn, PositionX, PositionY, GridObjectTypeIn, GridObjectClassIn) {
    this.position = { // Holds current position of mob 
        x: PositionX,
        y: PositionY
    };
    this.destination = { // msh 3arf asmeha eh bsra7a >_>
        x: destinationXIn,
        y: destinationYIn
    };

    this.AttackPos = { // Defines the position which the monster is heading to.
        x: 0,
        y: 0
    };

    this.speed = 5; // not used yet.

    this.direction = direction.UP;

    this.scatter = false;

    this.gridObjectType = GridObjectTypeIn;
    this.gridObjectClass = GridObjectClassIn;

    levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] = this.gridObjectType;

    this.lastGridObject = gridObjects.EMPTY;
}

Monster.mode = mobMode.ATTACK; // default behaviur for mobs.


// Monster movement
Object.defineProperty(Monster.prototype, "move", {
        value: function () {
            if (this.lastGridObject == gridObjects.COIN || this.lastGridObject == gridObjects.EMPTY)
                levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] = this.lastGridObject; // remove current mob and place the old obj

            var dx = [0, 0, -1, 1],
                dy = [-1, 1, 0, 0]; // all possible path:  up=0  down=1  left=2 right=3

            // attack mode
            if (Monster.mode == mobMode.ATTACK) {
                this.AttackPos.x = MapGrid1dTo2d(PacmanPos).xPos + this.destination.x; // pos to attack // pac man
                this.AttackPos.y = MapGrid1dTo2d(PacmanPos).yPos + this.destination.y; // pos to attack // pac man
            }
            // scatter mode
            else if (Monster.mode == mobMode.SCATTER && this.gridObjectType == gridObjects.BLINKY) {
                this.AttackPos.x = 3; //  blinky scatters to this x pos
                this.AttackPos.y = 3; //  blinky scatters to this y pos

            } else if (Monster.mode == mobMode.SCATTER && this.gridObjectType == gridObjects.INKY) {
                this.AttackPos.x = 18; // blinky scatters to this x pos
                this.AttackPos.y = 4; // blinky scatters to this y pos

            } else if (Monster.mode == mobMode.SCATTER && this.gridObjectType == gridObjects.CLYDE) {
                this.AttackPos.x = 18; // blinky scatters to this x pos
                this.AttackPos.y = 8; // blinky scatters to this y pos
            }

            var allDistance = [0, 0, 0, 0]; // down top left right. Holds eculidian distance between 
            //all 4 possible paths and the target

            for (var i = 0; i < 4; i++) {

                if (levelOneGrid[MapGrid2dTo1d((this.position.x + dx[i]), (this.position.y + dy[i]))] == gridObjects.WALL ||
                    levelOneGrid[MapGrid2dTo1d((this.position.x + dx[i]), (this.position.y + dy[i]))] == gridObjects.CHAIN)
                    allDistance[i] = 115000000;
                else if (MapGrid2dTo1d((this.position.x + dx[i]), (this.position.y + dy[i])) == homeLIndex ||
                    MapGrid2dTo1d((this.position.x + dx[i]), (this.position.y + dy[i])) == homeRIndex)
                    allDistance[i] = 5000000;
                else if (MapGrid2dTo1d((this.position.x + dx[i]), (this.position.y + dy[i])) == homeMIndex)
                    allDistance[i] = 100000;

                else
                    allDistance[i] = GetDistance((this.position.x + dx[i]), (this.position.y + dy[i]),
                        (this.AttackPos.x), (this.AttackPos.y));
            }

            if (this.direction == direction.UP)
                allDistance[direction.DOWN] = 10000000;

            if (this.direction == direction.DOWN)
                allDistance[direction.UP] = 10000000;

            if (this.direction == direction.LEFT)
                allDistance[direction.RIGHT] = 10000000;

            if (this.direction == direction.RIGHT)
                allDistance[direction.LEFT] = 10000000;

            var minDistance = Math.min.apply(null, allDistance);

            // save old position in case of needing to revert changes
            var oldPos = {
                x: this.position.x,
                y: this.position.y
            }

            if (allDistance[direction.UP] == minDistance) { // move up
                this.direction = direction.UP;
                this.position.y--;

            } else if (allDistance[direction.DOWN] == minDistance) { // move down
                this.direction = direction.DOWN;
                this.position.y++;

            } else if (allDistance[direction.LEFT] == minDistance) { // move left
                this.direction = direction.LEFT;
                this.position.x--;

            } else if (allDistance[direction.RIGHT] == minDistance) { // move right
                this.direction = direction.RIGHT
                this.position.x++;
            }

            // if current position is a object coin or empty, move normally.
            if (levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] == gridObjects.COIN ||
                levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] == gridObjects.EMPTY) {
                this.lastGridObject = levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)];

                levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] = this.gridObjectType; // Put mob in new pos
            }

            // if current position is another monster, don't move
            // helps in avoiding moving on top of each other
            else if (levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] == gridObjects.BLINKY ||
                levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] == gridObjects.INKY ||
                levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] == gridObjects.CLYDE) {
                this.position.x = oldPos.x;
                this.position.y = oldPos.y;
            }
        },
        enumerable: false,
        writable: false,
        configurable: false

    }

);

//Change bots behaviur between scatter || Attack every 10 seconds.
Object.defineProperty(Monster, "switchMovement", {
    value: function () {
        setInterval(function () {
            if (Monster.mode == mobMode.ATTACK) {
                Monster.mode = mobMode.SCATTER;

            } else if (Monster.mode == mobMode.SCATTER) {
                Monster.mode = mobMode.ATTACK;
            }
        }, 10000);

    },
    enumerable: false,
    writable: false,
    configurable: false
})


function GetDistance(x1, y1, x2, y2) { // calculates eculudian distance between two coordinates

    return (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

}



function DrawObjectOnGrid(xPos, yPos, gridObjectClass) {
    var gridIndex = MapGrid2dTo1d(xPos, yPos);
    $("#Map").children().eq(gridIndex).removeClass().css({
        'transform': 'rotate(0deg)'
    }).addClass(gridObjectClass);
}

Monster.switchMovement();

//TO DO: make enum for mobs initial positions

document.onkeydown = checkKey; //to listen for intial user event

var pacmanObj = new PacmanClass();

var blinky, clyde, inky; // monsters
var clydeTimer, inkyTimer, chainTimer; // monsters timers and chain timer

function StartGame() {
    gamePaused = false;
    
    //levelOneGrid = InitialMap.slice(); // to be removed

    clydeTimer != null ? clearTimeout(clydeTimer) : null;
    inkyTimer != null ? clearTimeout(inkyTimer) : null;
    chainTimer != null ? clearTimeout(chainTimer) : null;
    
    
    blinky = new Monster(2, 2, 10, 4, gridObjects.BLINKY, gridObjectsClass[gridObjects.BLINKY]);
    clyde = new Monster (2, 2,  9, 6, gridObjects.CLYDE, gridObjectsClass[gridObjects.CLYDE]);    //blinky = new Monster(2, 2, 10, 4, gridObjects.BLINKY, gridObjectsClass[gridObjects.BLINKY]);
    inky = new Monster(-5, 3, 11, 6, gridObjects.INKY, gridObjectsClass[gridObjects.INKY]);
    drawGrid(levelOneGrid);

    var mobArr = [blinky];
    mobArr.forEach(mob => DrawObjectOnGrid(mob.position.x, mob.position.y, gridObjectsClass[mob.gridObjectType]))


    timer2 = setInterval(function () { // GAME LOOP 
        mobArr.forEach(mob => DrawObjectOnGrid(mob.position.x, mob.position.y, gridObjectsClass[mob.lastGridObject]));
        mobArr.forEach(mob => mob.move());
        PacmanLoseLife();
        mobArr.forEach(mob => DrawObjectOnGrid(mob.position.x, mob.position.y, gridObjectsClass[mob.gridObjectType]))

    }, 500);

    clydeTimer = setTimeout(function () {
        mobArr[1] = clyde
        inkyTimer = setTimeout(function () {
            mobArr[2] = inky;
            
            chainTimer = setTimeout(function () {
                DrawObjectOnGrid(10, 5, 'chain');
                levelOneGrid[MapGrid2dTo1d(10, 5)] = gridObjects.CHAIN;
            }, 2000)
        }, 5000); // release clyde after 10 seconds.
    }, 5000); // release clyde after 5 seconds.

}


StartGame();
