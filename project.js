//levelOneGrid variable is for drawing the map for level 1
//where numbers inside it are as follown: 1=wall object, 2=Pacman object, 3=coin object, 4=empty object
// check if it's better as 2d array or 1d array
// new line to test git


// ghost // power up 
var levelOneGrid = [  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
                    , 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 3, 1, 3, 3, 3, 3, 3, 1, 1, 3, 1, 1, 3, 3, 3, 3, 3, 1, 3, 1
                    , 1, 3, 1, 1, 1, 1, 3, 1, 1, 3, 3, 3, 1, 1, 3, 1, 1, 1, 1, 3, 1
                    , 1, 3, 1, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 1, 3, 1
                    , 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1
                    , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// maps from 2d to 1d
function MapGridgf(x , y ) {
    // TODO:
    // RENAME the function
    return y * 21 + x ;
    
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
        else if (gridArrIn[i] == 2) document.getElementById("Map").innerHTML += "<div class='pacman'></div>"
        else if (gridArrIn[i] == 3) document.getElementById("Map").innerHTML += "<div class='coin'></div>"
        else if (gridArrIn[i] == 4) document.getElementById("Map").innerHTML += "<div class='coin'></div>"
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
