//levelOneGrid variable is for drawing the map for level 1
//where numbers inside it are as follown: 1=wall object, 2=Pacman object, 3=coin object, 4=empty object
// check if it's better as 2d array or 1d array
// new line to test git


// ghost // power up 
var levelOneGrid = [  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                    , 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 1, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 3, 3, 3, 3, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 3, 1, 3, 1
                    , 1, 3, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 3, 1
                    , 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// maps from 2d to 1d
function MapGrid2dTo1d(x , y ) {
    // TODO:
    // RENAME the function
    return y * 21 + x ;
    
}

function MapGrid1dTo2d(index) {
    return [parseInt(index/21),index%21];
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
        else if (gridArrIn[i] == 2 ) document.getElementById("Map").innerHTML += "<div class='pacman'></div>"
        else if (gridArrIn[i] == 3 ) document.getElementById("Map").innerHTML += "<div class='coin'></div>"
        else if (gridArrIn[i] == 4 ) document.getElementById("Map").innerHTML += "<div class='empty'></div>"
        else if (gridArrIn[i] == 10) document.getElementById("Map").innerHTML += "<div class='blinkymob'></div>"

    }
}

drawGrid(levelOneGrid);
var lastDirection = 0; //1= last direction was right, 2= last direction was left, 3= last direction was up, , 4= last direction was down

function checkKey(e) {
    e = window.event;
    if ((e.keyCode == '38') && (lastDirection != 3)) //key up
    {
        clearTimeout(timer);
        lastDirection = 3;
        MoveUp2();
    } else if ((e.keyCode == '40') && (lastDirection != 4)) //key down
    {
        clearTimeout(timer);
        lastDirection = 4;
        MoveDown2();
    } else if ((e.keyCode == '37') && (lastDirection != 2)) //key left  
    {
        clearTimeout(timer);
        lastDirection = 2;
        MoveLeft2();
    } else if ((e.keyCode == '39') && (lastDirection != 1)) //key right // 1 : last direction was right
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
        $("div").eq(PacmanPos+1).removeClass('empty').addClass('pacman').css({
            'transform': 'rotate(-90deg)'
        });
        $(".pacman").eq(1).removeClass('pacman').css('background-image', "").addClass('empty');
    }
    timer = setTimeout(MoveUp2, 250)
}

/******************************************************************************************/

function Monster(destinationXIn , destinationYIn , PositinX,PositinY)
{
    this.position= [PositinX,PositinY];
    this.destination = [destinationXIn,destinationYIn];
    this.AttackPos = [0,0];
    this.speed=5;
    this.direction= 2; // up=0 // down=1 // left=2  //right=3
    
    this.scatter=false;
    
}



Object.defineProperty(Monster.prototype,"move",
        {
    
    value: function () {
        var that = this;
        console.log(this);
        setInterval(function(){
            
            levelOneGrid[ MapGrid2dTo1d(that.position[0],that.position[1]) ] = 3; // remove current mob and place a coin

            var dx = [ 0, 0, -1, 1 ], dy = [ -1, 1, 0, 0 ]; // all possible path: down top left right

            // attack mode
            that.AttackPos[0] = MapGrid1dTo2d(PacmanPos)[0] + that.destination[0]; // pos to attack
            that.AttackPos[1] = MapGrid1dTo2d(PacmanPos)[1] + that.destination[1]; // pos to attack
            console.log(that.AttackPos[0],that.AttackPos[1]);

    var allDistance=[0,0,0,0]; // down top left right
	for (var i = 0; i < 4; i++)
	{
        
        if ( levelOneGrid[ MapGrid2dTo1d ( (that.position[0]+dx[i] ),(that.position[1] + dy[i]) ) ] == 1)
			 allDistance[i] = 5000000;
		/*else if (usedmap[gost.y + dy[i]][gost.x + dx[i]] == '_'&&ghost_isLife[ghostNum - 1])
			arr[i] = 4000000;*/
		else
			allDistance[i] = GetDistance ( (that.position[0]+dx[i] ),(that.position[1] + dy[i]) ,
                                         (that.AttackPos[0]      ),(that.AttackPos[1]        )  );
	}
   // console.log("before dirctions");
    //console.log(allDistance[0],allDistance[1],allDistance[2],allDistance[3]);
     if ( that.direction == 0  )
            allDistance[1] = 10000000;
        
     if ( that.direction == 1  )
            allDistance[0] = 10000000;
            
     if ( that.direction == 2  )
            allDistance[3] = 10000000;
            
     if ( that.direction == 3  )
            allDistance[2] = 10000000;
    
    console.log("after dirctions");
    console.log(allDistance[0],allDistance[1],allDistance[2],allDistance[3]);        
    
    var minDistance = Math.min.apply( null, allDistance );
    console.log(minDistance);
    if(allDistance[0] == minDistance){  // move up
            that.direction=0;
            that.position[1]--;
        console.log("UP");

        }
            
     else if(allDistance[1] == minDistance){ // move down
            that.direction=1;
            that.position[1]++;
                 console.log("DOWN");

        }
            
     else if(allDistance[2] == minDistance){ // move left
            that.direction=2;
            that.position[0]--;
                 console.log("LEFT");

        }
            
     else if(allDistance[3] == minDistance){ // move right
            that.direction=3
            that.position[0]++;
                 console.log("RIGHT");

        }
        
        
            levelOneGrid[ MapGrid2dTo1d(that.position[0],that.position[1]) ] = 10;
            drawGrid(levelOneGrid);
            
        },1000)
        
    },
    enumerable:false,
    writable:false,
    configurable:false
}
                     )


function GetDistance (x1,y1,x2,y2){
    
     return ( Math.pow(x1-x2,2) + Math.pow (y1-y2,2) );  
 
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


var blinky=new Monster(0,0,10,5);
levelOneGrid[MapGrid2dTo1d(10,5)] = 10;
//blinky.move();
drawGrid(levelOneGrid);





