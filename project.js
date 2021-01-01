// objects holds names for various grid objects.
var gridObjects = {
    WALL: 1,
    PACMAN: 2,
    COIN: 3,
    EMPTY: 4,
    BLINKY: 10,
    CLYDE:11,
    INKY:12
};
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
var levelOneGrid = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                    , 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

// maps from 2d to 1d
function MapGrid2dTo1d(x, y) {
    // TODO:
    // RENAME the function
    return y * 21 + x;
}

// maps from 1d to 2d
function MapGrid1dTo2d(index) {
 //   return [index % 21, parseInt(index / 21)];
    return {xPos:index%21 ,yPos:parseInt(index/21)};
}



var PlayerScore = 0; //player scoring tracker
var PacmanPos = 22;
// the drawing function to draw the map
function drawGrid(gridArrIn) {
    // delete old grid from screen
    document.getElementById("Map").innerHTML = "";
    for (var i = 0; i < gridArrIn.length; i++) {
        // draw new grid
        if (gridArrIn[i] == 1) document.getElementById("Map").innerHTML += "<div class='wall'></div>"
        else if (gridArrIn[i] == gridObjects.PACMAN) document.getElementById("Map").innerHTML += "<div class='pacman'></div>"
        else if (gridArrIn[i] == gridObjects.COIN) document.getElementById("Map").innerHTML += "<div class='coin'></div>"
        else if (gridArrIn[i] == gridObjects.EMPTY) document.getElementById("Map").innerHTML += "<div class='empty'></div>"
        else if (gridArrIn[i] == gridObjects.BLINKY) document.getElementById("Map").innerHTML += "<div class='blinkymob'></div>"
        else if (gridArrIn[i] == gridObjects.CLYDE) document.getElementById("Map").innerHTML +=  "<div class='clydemob'></div>"
        else if (gridArrIn[i] == gridObjects.INKY) document.getElementById("Map").innerHTML +=  "<div class='inkymob'></div>"
    }
}

drawGrid(levelOneGrid);
var lastDirection = 0; //1= last direction was right, 2= last direction was left, 3= last direction was up, , 4= last direction was down


// TO DO : add enums for directions // 
function checkKey(e) {
    e = window.event;
    if ((e.keyCode == keyboard.ARROWUP) && (lastDirection != 3)) //key up
    {
        clearTimeout(timer);
        lastDirection = 3;
        MoveUp2();
    } else if ((e.keyCode == keyboard.ARROWDOWN) && (lastDirection != 4)) //key down
    {
        clearTimeout(timer);
        lastDirection = 4;
        MoveDown2();
    } else if ((e.keyCode == keyboard.ARROWLEFT) && (lastDirection != 2)) //key left  
    {
        clearTimeout(timer);
        lastDirection = 2;
        MoveLeft2();
    } else if ((e.keyCode == keyboard.ARROWRIGHT) && (lastDirection != 1)) //key right // 1 : last direction was right
    {
        clearTimeout(timer);
        lastDirection = 1;
        MoveRight2();
    }
}

document.onkeydown = checkKey; //to listen for intial user event
//function for pacman right movement
//function to check pacman movements
/*function CheckPacmanNextPostion() {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    if (levelOneGrid[PacmanPos + 1] == 3) PacmanPos++
}*/

var timer;

function MoveRight2() {
    // TODO: function get next move for pac-man
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _NextPos = levelOneGrid[PacmanPos + 1]
    if (_NextPos == 1) {
        $(".pacman").css('background-image', "url('./pic/xosfc.png')")
        return 0;
    } else if (_NextPos == 3) {
        PlayerScore++; //increase score
        levelOneGrid[PacmanPos++] = 4; //replace to empty
        levelOneGrid[PacmanPos] = 2;
        $(".pacman").next().removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(0deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_NextPos == 4) {
        levelOneGrid[PacmanPos++] = 4;
        levelOneGrid[PacmanPos] = 2;
        $(".pacman").next().removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(0deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    timer = setTimeout(MoveRight2, 250)
}

function MoveLeft2() {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _PrevPos = levelOneGrid[PacmanPos - 1]
    if (_PrevPos == 1) {
        $(".pacman").css('background-image', "url('./pic/xosfc.png')")
        return 0;
    } else if (_PrevPos == 3) {
        PlayerScore++; //increase score
        levelOneGrid[PacmanPos--] = 4; //replace to empty
        levelOneGrid[PacmanPos] = 2;
        $(".pacman").prev().removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(180deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_PrevPos == 4) {
        levelOneGrid[PacmanPos--] = 4;
        levelOneGrid[PacmanPos] = 2;
        $(".pacman").prev().removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(180deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    timer = setTimeout(MoveLeft2, 250)
}

function MoveDown2() {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _NextDownPos = levelOneGrid[PacmanPos + 21]
    if (_NextDownPos == 1) {
        $(".pacman").css('background-image', "url('./pic/xosfc.png')")
        return 0;
    } else if (_NextDownPos == 3) {
        PlayerScore++; //increase score
        levelOneGrid[PacmanPos] = 4; //replace to empty
        levelOneGrid[PacmanPos + 21] = 2;
        PacmanPos += 21;
        $("div").eq(1 + PacmanPos).removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(90deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_NextDownPos == 4) {
        levelOneGrid[PacmanPos] = 4;
        levelOneGrid[PacmanPos + 21] = 2;
        PacmanPos += 21;
        $("div").eq(1 + PacmanPos).removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(90deg)'
        });
        $(".pacman").eq(0).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    timer = setTimeout(MoveDown2, 250)
}

function MoveUp2() {
    //1=wall object, 2=Pacman object, 3=coin object, 4=empty object
    var _NextUpPos = levelOneGrid[PacmanPos - 21]
    if (_NextUpPos == 1) {
        $(".pacman").css('background-image', "url('./pic/xosfc.png')")
        return 0;
    } else if (_NextUpPos == 3) {
        PlayerScore++; //increase score
        levelOneGrid[PacmanPos] = 4; //replace to empty
        levelOneGrid[PacmanPos - 21] = 2;
        PacmanPos -= 21;
        $("div").eq(PacmanPos + 1).removeClass('coin').addClass('pacman').css({
            'transform': 'rotate(-90deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    } else if (_NextUpPos == 4) {
        levelOneGrid[PacmanPos] = 4; //replace to empty
        levelOneGrid[PacmanPos - 21] = 2;
        PacmanPos -= 21;
        $("div").eq(PacmanPos + 1).removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(-90deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    timer = setTimeout(MoveUp2, 250)
}

/*********************************  Monster Class  ***************************************************/
// enum to save directions
var direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

var mobMode = { // defines monsters hehaviur
    ATTACK:0,
    SCATTER:1,
    AFRAID:2
}

Object.freeze(direction);

// monster class
function Monster(destinationXIn, destinationYIn, PositionX, PositionY , GridObjectTypeIn) {
    this.position = {              // Holds current position of mob
        x: PositionX,
        y: PositionY
    };
    this.destination = {           // msh 3arf asmeh eh bsra7a >_>
        x:destinationXIn,
        y:destinationYIn
    }; 
    
    this.AttackPos = {              // Defines the position which the monster is heading to.
        x:0,
        y:0
    };
    this.speed = 5;                 // not used yet.
    
    this.direction = direction.UP;

    this.scatter = false;
    
    this.GridObjectType = GridObjectTypeIn;
    
    levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] = this.GridObjectType;


}

Monster.mode= mobMode.ATTACK;


// Monster movement
Object.defineProperty(Monster.prototype, "move", {

    value: function () {
        levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] = 3; // remove current mob and place a coin

            var dx = [0, 0, -1, 1],
                dy = [-1, 1, 0, 0]; // all possible path:  up=0  down=1  left=2 right=3

            // attack mode
            this.AttackPos.x = MapGrid1dTo2d(PacmanPos).xPos + this.destination.x; // pos to attack // pac man
            this.AttackPos.y = MapGrid1dTo2d(PacmanPos).yPos + this.destination.y; // pos to attack // pac man

            var allDistance = [0, 0, 0, 0]; // down top left right. Holds eculidian distance between 
            //all 4 possible paths and the target

            for (var i = 0; i < 4; i++) {

                if (levelOneGrid[MapGrid2dTo1d((this.position.x + dx[i]), (this.position.y + dy[i]))] == 1)
                    allDistance[i] = 115000000;
                /*else if (usedmap[gost.y + dy[i]][gost.x + dx[i]] == '_'&&ghost_isLife[ghostNum - 1])
                	arr[i] = 4000000;*/
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

            if (allDistance[0] == minDistance) { // move up
                this.direction = 0;
                this.position.y--;

            } else if (allDistance[1] == minDistance) { // move down
                this.direction = 1;
                this.position.y++;

            } else if (allDistance[2] == minDistance) { // move left
                this.direction = 2;
                this.position.x--;

            } else if (allDistance[3] == minDistance) { // move right
                this.direction = 3
                this.position.x++;

            }

            levelOneGrid[MapGrid2dTo1d(this.position.x, this.position.y)] = this.GridObjectType;
            drawGrid(levelOneGrid);

        },
    enumerable: false,
    writable: false,
    configurable: false

    }
 
);


function GetDistance(x1, y1, x2, y2) { // calculates eculudian distance between two coordinates

    return (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

}


/*
int dx[] = { 0, 0, -1, 1 }, dy[] = { -1, 1, 0, 0 };
void ghostmoving(ghostStruct& gost, Sprite& ghostSprite, double Stepx, double Stepy, int ghostNum, char usedmap[30][32], int mode)
{
	if (ghost_isLife[ghostNum - 1] == 0)
	{
		gost.Xdir = 11;
		gost.Ydir = 9;
		if (gost.x == 11 && gost.y == 9)
			ghost_isLife[ghostNum - 1] = 2;
	}
	else if (mode == attackMode)
	{
		int dirctionx[] = { 0, 7, -5, 0 }, dirctiony[] = { 0, 0, 3, 3 };
		gost.Xdir = pac.x + dirctionx[ghostNum - 1];
		gost.Ydir = pac.y + dirctiony[ghostNum - 1];
	}
	else if (mode == frightMode)
	{
		int scared_x[] = { 1, 19, 1, 19 }, scared_y[] = { 2, 2, 20, 20 };
		gost.Xdir = scared_x[ghostNum - 1];
		gost.Ydir = scared_y[ghostNum - 1];
	}
	else //if (mode == randamMode)
	{
		int dirctionx[] = { 0, 7, -5, -3 }, dirctiony[] = { 0, 7, -2, 3 };
		srand(time(NULL));
		gost.Xdir = rand() % 30 + dirctionx[ghostNum - 1];
		gost.Ydir = rand() % 30 + dirctiony[ghostNum - 1];
	}
	//up=0
	//down=1
	//left=2
	//right=3

	long long arr[5];
	for (int i = 0; i < 4; i++)
	{
		if (usedmap[gost.y + dy[i]][gost.x + dx[i]] == '#')
			arr[i] = 100000000;
		else if (usedmap[gost.y + dy[i]][gost.x + dx[i]] == '*'&&ghost_isLife[ghostNum - 1])
			arr[i] = 5000000;
		else if (usedmap[gost.y + dy[i]][gost.x + dx[i]] == '_'&&ghost_isLife[ghostNum - 1])
			arr[i] = 4000000;
		else
			arr[i] = dist(gost.Xdir, gost.Ydir, gost.x + dx[i], gost.y + dy[i]);
	}

	if (!(mode == frightMode&&currentTime == startSuperPower))
	{
		if (gost.dir == down)
			arr[0] = 10000000;
		else if (gost.dir == up)
			arr[1] = 10000000;
		else if (gost.dir == right)
			arr[2] = 10000000;
		else if (gost.dir == left)
			arr[3] = 10000000;
	}

	if (arr[0] <= arr[1] && arr[0] <= arr[2] && arr[0] <= arr[3])
	{
		gost.dir = up;
		gost.y--;
		ghostSprite.move(0, -Stepy);
	}
	else if (arr[1] <= arr[0] && arr[1] <= arr[2] && arr[1] <= arr[3])
	{
		gost.dir = down;
		gost.y++;
		ghostSprite.move(0, Stepy);

	}
	else if (arr[2] <= arr[1] && arr[2] <= arr[0] && arr[2] <= arr[3])
	{
		gost.dir = left;
		gost.x--;
		ghostSprite.move(-Stepx, 0);
	}
	else
	{

		gost.dir = right;
		gost.x++;
		ghostSprite.move(Stepx, 0);
	}
}


*/

var blinky = new Monster( 2,  2, 10, 4, gridObjects.BLINKY);
var clyde  = new Monster(-2, -2,  9, 6, gridObjects.CLYDE);
var inky   = new Monster( 0,  3, 11, 6, gridObjects.INKY);
var mobArr = [blinky];
drawGrid(levelOneGrid);



setTimeout( function(){mobArr[1]=clyde} ,5000) // release clyde after 5 seconds.
setTimeout( function(){mobArr[2]=inky} ,10000) // release clyde after 10 seconds.




setInterval(function () {       // GAME LOOP 

    mobArr.forEach(mob=>mob.move() );
    drawGrid(levelOneGrid);
},500);














